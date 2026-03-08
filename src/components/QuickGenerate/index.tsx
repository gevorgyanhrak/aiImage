import { useCallback, useRef, useState } from 'react';
import { Sparkles, Upload, X, ChevronDown, ChevronUp, Loader2, Download, RotateCcw } from 'lucide-react';

import postJson from '@/utils/postJson';
import uploadToCDN from '@/utils/uploadToCDN';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/store';
import LoginModal from '@/components/LoginModal';

type GenerateState = 'idle' | 'uploading' | 'generating' | 'done';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/heic,image/heif';

const QuickGenerate = () => {
  const addGeneration = useAppStore(s => s.addGeneration);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

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

      if (isAuthenticated) {
        addGeneration({
          prompt: prompt.trim(),
          resultUrl: url,
          sourceUrl: uploadedUrl,
        });
      }
    } catch {
      setError('Generation failed. Try again.');
      setState('idle');
    }
  }, [prompt, uploadedUrl, isAuthenticated, addGeneration]);

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
      <div
        className={cn(
          'w-full bg-[var(--page-bg-deep)] border-t border-[var(--surface-border)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
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
            <span className={cn('text-sm font-medium', isOpen ? 'text-[var(--page-text-secondary)]' : 'text-[var(--page-text)]')}>
              Quick Generate
            </span>
            {isGenerating && (
              <Loader2 className="h-3 w-3 animate-spin text-[#F44097]" />
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-[var(--page-text-muted)]" />
          ) : (
            <ChevronUp className="h-4 w-4 text-[var(--page-text-muted)] quick-gen-bounce" />
          )}
        </button>

        {/* Expandable content */}
        <div
          className={cn(
            'overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            isOpen ? 'max-h-[90vh] md:max-h-[50vh] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="h-[calc(90vh-44px)] md:h-[calc(50vh-44px)] border-t border-[var(--surface-border)] flex flex-col md:flex-row">

            {/* ── Image area (upload → generating → result) ── */}
            <div className="flex-1 flex flex-col gap-1.5 p-3 md:p-4 min-h-0">
              <span className="text-[10px] font-medium tracking-[0.08em] uppercase text-[var(--label-color)] px-0.5">
                {isDone ? 'Result' : isGenerating ? 'Generating...' : previewUrl ? 'Source' : 'Upload'}
              </span>
              <div className="flex-1 min-h-0 relative">
                {isDone && resultUrl ? (
                  /* ── Result ── */
                  <div className="relative h-full w-full rounded-xl overflow-hidden bg-[var(--page-bg-inset)] border border-[var(--surface-border)]">
                    <img src={resultUrl} alt="Generated result" className="h-full w-full object-contain" />
                    <a
                      href={resultUrl}
                      download="hrakai-generated.png"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                ) : isGenerating ? (
                  /* ── Generating spinner ── */
                  <div className="h-full w-full rounded-xl overflow-hidden bg-[var(--page-bg-inset)] border border-[var(--surface-border)] flex flex-col items-center justify-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F44097] animate-spin" />
                      <Sparkles className="h-6 w-6 text-[#F44097]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-[var(--page-text)]">Generating your image</p>
                      <p className="text-xs text-[var(--page-text-muted)] mt-1">This may take a few seconds...</p>
                    </div>
                  </div>
                ) : previewUrl ? (
                  /* ── Uploaded image preview ── */
                  <div className="relative h-full w-full rounded-xl overflow-hidden bg-[var(--page-bg-inset)] border border-[var(--surface-border)]">
                    <img src={previewUrl} alt="Uploaded" className="h-full w-full object-contain" />
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <Loader2 className="h-8 w-8 animate-spin text-[#F44097]" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/80 transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  /* ── Empty upload zone ── */
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={onDrop}
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-[var(--surface-border-strong)] bg-[var(--input-bg)] transition-all hover:border-[#F44097]/40 hover:bg-[#F44097]/[0.03]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--surface-border)]">
                      <Upload className="h-6 w-6 text-[var(--page-text-muted)]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-[var(--page-text-secondary)]">Upload an image</p>
                      <p className="text-xs text-[var(--page-text-muted)] mt-1">or drag & drop here</p>
                    </div>
                  </div>
                )}
                <input ref={inputRef} type="file" accept={ACCEPT} onChange={onFileInputChange} className="hidden" />
              </div>
            </div>

            {/* ── Controls column ── */}
            <div className="md:w-[320px] lg:w-[380px] shrink-0 flex flex-col gap-3 p-3 md:p-4 md:pl-0 md:border-l-0 border-t md:border-t-0">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe what you want to create..."
                className="flex-1 w-full min-h-[60px] resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] outline-none focus:border-[#F44097]/30 transition-colors"
              />

              {error && (
                <p className="text-[11px] text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-1.5">{error}</p>
              )}

              <div className="flex gap-2">
                {isDone && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--surface-border-strong)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    New
                  </button>
                )}
                <button
                  type="button"
                  onClick={onGenerate}
                  disabled={!canGenerate}
                  className={cn(
                    'flex-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all',
                    'bg-gradient-to-r from-[#F44097] to-[#FC67FA] text-white',
                    'shadow-[0_0_20px_rgba(244,64,151,0.2)] hover:shadow-[0_0_32px_rgba(244,64,151,0.35)]',
                    'active:translate-y-px',
                    !canGenerate && 'opacity-30 pointer-events-none',
                  )}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default QuickGenerate;
