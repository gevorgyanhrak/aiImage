import { useCallback, useRef, useState } from 'react';
import { Sparkles, Upload, X, ChevronDown, ChevronUp, Loader2, ImageIcon } from 'lucide-react';

import postJson from '@/utils/postJson';
import uploadToCDN from '@/utils/uploadToCDN';
import { cn } from '@/lib/utils';

type GenerateState = 'idle' | 'uploading' | 'generating' | 'done';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/heic,image/heif';

const QuickGenerate = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const onToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const isGenerating = state === 'generating';
  const isUploading = state === 'uploading';
  const isDone = state === 'done';
  const canGenerate = (prompt.trim().length > 0 || uploadedUrl) && !isGenerating && !isUploading;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 quick-gen-enter">
      {/* Panel */}
      <div
        className={cn(
          'w-full bg-[#0F1113] border-t border-white/[0.06] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'quick-gen-shadow' : '',
        )}
      >
        {/* Toggle bar */}
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'flex w-full items-center justify-between px-4 md:px-6 h-11 transition-colors',
            isOpen ? 'hover:bg-white/[0.02]' : 'quick-gen-bar-glow hover:bg-white/[0.02]',
          )}
        >
          <div className="flex items-center gap-2">
            <Sparkles className={cn('h-3.5 w-3.5 text-[#F44097]', !isOpen && 'quick-gen-sparkle-attract')} />
            <span className={cn('text-sm font-medium', isOpen ? 'text-white/70' : 'text-white/80')}>
              Quick Generate
            </span>
            {isGenerating && (
              <Loader2 className="h-3 w-3 animate-spin text-[#F44097]" />
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-white/30" />
          ) : (
            <ChevronUp className="h-4 w-4 text-white/30 quick-gen-bounce" />
          )}
        </button>

        {/* Expandable content */}
        <div
          className={cn(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            isOpen ? 'max-h-[150px] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="h-[150px] flex items-stretch border-t border-white/[0.04] px-4 md:px-6 gap-3 py-3">
            {/* Upload area */}
            <div className="shrink-0 w-[120px]">
              {previewUrl ? (
                <div className="relative h-full rounded-lg overflow-hidden bg-black/40 border border-white/[0.06]">
                  <img src={previewUrl} alt="Uploaded" className="h-full w-full object-cover" />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <Loader2 className="h-5 w-5 animate-spin text-[#F44097]" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded bg-black/70 text-white/60 hover:text-white transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={onDrop}
                  className="flex h-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-[#F44097]/30 hover:bg-[#F44097]/[0.02]"
                >
                  <Upload className="h-4 w-4 text-white/25" />
                  <span className="text-[10px] text-white/25 text-center leading-tight px-1">Upload image</span>
                </div>
              )}
              <input ref={inputRef} type="file" accept={ACCEPT} onChange={onFileInputChange} className="hidden" />
            </div>

            {/* Prompt + Generate */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                rows={2}
                className="flex-1 w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-white/15 transition-colors"
              />
              <div className="flex items-center gap-2">
                {error && <p className="text-[10px] text-red-400 truncate flex-1">{error}</p>}
                <div className="ml-auto flex gap-2">
                  {isDone && (
                    <button
                      type="button"
                      onClick={onReset}
                      className="flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-xs font-medium text-white/60 hover:bg-white/[0.07] transition-colors"
                    >
                      New
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onGenerate}
                    disabled={!canGenerate}
                    className={cn(
                      'flex h-8 items-center gap-1.5 rounded-lg px-4 text-xs font-semibold transition-all',
                      'bg-gradient-to-r from-[#F44097] to-[#FC67FA] text-white',
                      'shadow-[0_0_12px_rgba(244,64,151,0.2)] hover:shadow-[0_0_20px_rgba(244,64,151,0.35)]',
                      'active:translate-y-px',
                      !canGenerate && 'opacity-30 pointer-events-none',
                    )}
                  >
                    {isGenerating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Result preview */}
            <div className="shrink-0 w-[120px] flex items-center justify-center rounded-lg bg-[#0a0b0d] border border-white/[0.04] overflow-hidden">
              {isDone && resultUrl ? (
                <img src={resultUrl} alt="Generated result" className="h-full w-full object-cover" />
              ) : isGenerating ? (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
                    <div className="absolute inset-0 rounded-full border border-transparent border-t-[#F44097] animate-spin" />
                    <Sparkles className="h-3 w-3 text-[#F44097]" />
                  </div>
                  <span className="text-[9px] text-white/30">Generating</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <ImageIcon className="h-5 w-5 text-white/10" />
                  <span className="text-[9px] text-white/15 text-center px-1">Result</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickGenerate;
