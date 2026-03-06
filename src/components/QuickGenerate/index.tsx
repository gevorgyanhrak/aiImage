import { useCallback, useRef, useState } from 'react';
import { Sparkles, Upload, X, ImageIcon, Loader2 } from 'lucide-react';

import postJson from '@/utils/postJson';
import uploadToCDN from '@/utils/uploadToCDN';
import { cn } from '@/lib/utils';

type GenerateState = 'idle' | 'uploading' | 'generating' | 'done';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/heic,image/heif';

const QuickGenerate = () => {
  const [state, setState] = useState<GenerateState>('idle');
  const [prompt, setPrompt] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setResultUrl(null);
    setError(null);

    try {
      setState('uploading');
      const response = await uploadToCDN({ sourceUrl: localUrl });
      setUploadedUrl(response.url);
      setState('idle');
    } catch {
      setError('Upload failed. Try again.');
      setState('idle');
    }
  }, []);

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleFileSelect],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const clearImage = useCallback(() => {
    setPreviewUrl(null);
    setUploadedUrl(null);
    setResultUrl(null);
    setError(null);
  }, []);

  const onGenerate = useCallback(async () => {
    if (!prompt.trim() && !uploadedUrl) return;

    try {
      setState('generating');
      setError(null);

      const payload: Record<string, unknown> = {
        prompt: prompt.trim(),
        ...(uploadedUrl && { media: [{ sourceUrl: uploadedUrl, type: 'image' }] }),
      };

      const { response } = await postJson(payload);
      const url = response?.url || response?.download_url;

      if (!url) throw new Error('No result');

      setResultUrl(url);
      setState('done');
    } catch {
      setError('Generation failed. Try again.');
      setState('idle');
    }
  }, [prompt, uploadedUrl]);

  const onReset = useCallback(() => {
    setResultUrl(null);
    setPrompt('');
    clearImage();
    setState('idle');
  }, [clearImage]);

  const isGenerating = state === 'generating';
  const isUploading = state === 'uploading';
  const isDone = state === 'done';
  const canGenerate = (prompt.trim().length > 0 || uploadedUrl) && !isGenerating && !isUploading;

  return (
    <section className="rounded-2xl bg-[#0F1113] border border-white/[0.06] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0">
        {/* Left — Controls */}
        <div className="flex flex-col gap-5 p-5 md:p-7 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-[-0.01em]">Quick Generate</h2>
            <p className="mt-1 text-sm text-white/35">Upload an image and describe your idea</p>
          </div>

          {/* Image upload area */}
          <div>
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-white/35">
              Reference image
            </span>

            {previewUrl ? (
              <div className="relative h-36 rounded-xl overflow-hidden bg-black/40 border border-white/[0.06]">
                <img
                  src={previewUrl}
                  alt="Uploaded reference"
                  className="h-full w-full object-contain"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <Loader2 className="h-6 w-6 animate-spin text-[#F44097]" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-white/60 hover:text-white transition-colors"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                className="flex h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-[#F44097]/30 hover:bg-[#F44097]/[0.02]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05]">
                  <Upload className="h-4.5 w-4.5 text-white/30" />
                </div>
                <span className="text-xs text-white/30">Drop image or click to upload</span>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              onChange={onFileInputChange}
              className="hidden"
            />
          </div>

          {/* Prompt input */}
          <div>
            <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.08em] text-white/35">
              Prompt
            </span>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              rows={3}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          {/* Generate / Reset button */}
          {isDone ? (
            <button
              type="button"
              onClick={onReset}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.07]"
            >
              Create another
            </button>
          ) : (
            <button
              type="button"
              onClick={onGenerate}
              disabled={!canGenerate}
              className={cn(
                'flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold transition-all',
                'bg-gradient-to-r from-[#F44097] to-[#FC67FA] text-white',
                'shadow-[0_0_20px_rgba(244,64,151,0.25)] hover:shadow-[0_0_32px_rgba(244,64,151,0.4)]',
                'active:translate-y-px',
                (!canGenerate) && 'opacity-30 pointer-events-none',
              )}
            >
              {isGenerating ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4.5 w-4.5" />
                  Generate
                </>
              )}
            </button>
          )}
        </div>

        {/* Right — Preview / Result */}
        <div className="flex items-center justify-center bg-[#0a0b0d] p-5 md:p-7 min-h-[260px] lg:min-h-[420px]">
          {isDone && resultUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={resultUrl}
                alt="Generated result"
                className="max-h-[380px] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
          ) : isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F44097] animate-spin" />
                <Sparkles className="h-6 w-6 text-[#F44097]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white/60">Generating...</p>
                <p className="mt-1 text-xs text-white/25">This won't take long</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <ImageIcon className="h-6 w-6 text-white/15" />
              </div>
              <div>
                <p className="text-sm text-white/25">Your result will appear here</p>
                <p className="mt-0.5 text-xs text-white/15">Upload an image & enter a prompt to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickGenerate;
