import { Link } from 'react-router';
import { Sparkles, Wand2, Layers, Zap, ArrowRight, Upload, ImageIcon, Check } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--page-bg-deep)] border border-[var(--surface-border)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left — Text content (50%) */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <div className="hero-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--surface-border-strong)] bg-[var(--surface)] px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#F44097] hero-icon-pulse" />
            <span className="text-xs font-medium tracking-wide text-[var(--page-text-secondary)]">AI-Powered Creative Studio</span>
          </div>

          <h1 className="hero-fade-up hero-delay-1 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--page-text)] md:text-4xl lg:text-5xl">
            Create stunning visuals{' '}
            <span className="bg-gradient-to-r from-[#F44097] to-[#FC67FA] bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="hero-fade-up hero-delay-2 mt-4 max-w-md text-[15px] leading-relaxed text-[var(--page-text-secondary)]">
            Transform your ideas into images and videos in seconds. Upload a photo, describe your vision, and let AI do the magic.
          </p>

          <Link
            to="/ai-filters"
            className="hero-fade-up hero-delay-3 group mt-6 inline-flex w-fit items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F44097] to-[#FC67FA] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.2)] transition-all hover:shadow-[0_0_32px_rgba(244,64,151,0.35)] active:translate-y-px"
          >
            <Sparkles className="h-4 w-4" />
            Try AI Filters
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <div className="hero-fade-up hero-delay-4 mt-6 flex flex-wrap gap-2">
            {[
              { icon: Wand2, label: 'AI Effects' },
              { icon: Layers, label: 'Style Transfer' },
              { icon: Zap, label: 'Instant Results' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-1.5"
              >
                <Icon className="h-3 w-3 text-[#F44097]/70" />
                <span className="text-[11px] font-medium text-[var(--page-text-secondary)]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Animated demo loop (50%) */}
        <div className="relative overflow-hidden bg-[var(--hero-demo-bg)] min-h-[360px] lg:min-h-[440px] flex items-center justify-center p-6 md:p-10">
          {/* Background effects */}
          <div className="hero-blob-1 pointer-events-none absolute top-1/4 left-1/3 h-48 w-48 rounded-full bg-[#F44097]/12 blur-[90px]" />
          <div className="hero-blob-2 pointer-events-none absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-[#9333ea]/10 blur-[70px]" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.02]" />

          {/* Demo container — loops through 3 steps */}
          <div className="relative z-10 w-full max-w-[300px]">
            {/* Mock app window */}
            <div className="rounded-xl border border-[var(--surface-border-strong)] bg-[var(--hero-card-bg)] shadow-2xl hero-image-glow overflow-hidden">
              {/* Window title bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--surface-border)]">
                <div className="h-2 w-2 rounded-full bg-[var(--page-text-faint)]" />
                <div className="h-2 w-2 rounded-full bg-[var(--page-text-faint)]" />
                <div className="h-2 w-2 rounded-full bg-[var(--page-text-faint)]" />
                <span className="ml-2 text-[9px] font-medium text-[var(--page-text-muted)]">hrakAi Studio</span>
              </div>

              {/* Step content — animated via CSS */}
              <div className="relative h-[300px] md:h-[340px]">

                {/* ── STEP 1: Upload photo ── */}
                <div className="hero-step hero-step-1 absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  {/* Step label */}
                  <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1">
                    <span className="text-[10px] font-semibold text-[#F44097]">Step 1</span>
                    <span className="text-[10px] text-white/30">Upload your photo</span>
                  </div>

                  {/* Upload animation */}
                  <div className="hero-demo-upload relative flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02]">
                    <Upload className="h-8 w-8 text-white/15" />
                    {/* Animated photo dropping in */}
                    <div className="hero-photo-drop absolute inset-3 rounded-xl bg-gradient-to-br from-[#1a1225] to-[#15101f] border border-white/[0.08] flex items-center justify-center overflow-hidden">
                      <ImageIcon className="h-6 w-6 text-[#F44097]/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F44097]/5 to-transparent" />
                    </div>
                  </div>

                  {/* Check mark appears */}
                  <div className="hero-upload-check flex items-center gap-1.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F44097]/20">
                      <Check className="h-2.5 w-2.5 text-[#F44097]" />
                    </div>
                    <span className="text-[10px] text-white/40">photo_uploaded.jpg</span>
                  </div>
                </div>

                {/* ── STEP 2: Write prompt ── */}
                <div className="hero-step hero-step-2 absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1">
                    <span className="text-[10px] font-semibold text-[#F44097]">Step 2</span>
                    <span className="text-[10px] text-white/30">Describe your idea</span>
                  </div>

                  {/* Prompt typing area */}
                  <div className="w-full max-w-[230px] rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
                    <div className="text-[11px] leading-relaxed text-white/50 min-h-[48px]">
                      <span className="hero-demo-type-1">Make it </span>
                      <span className="hero-demo-type-2">look like </span>
                      <span className="hero-demo-type-3">a watercolor </span>
                      <span className="hero-demo-type-4">painting </span>
                      <span className="hero-demo-type-5">with soft </span>
                      <span className="hero-demo-type-6">pastel tones</span>
                      <span className="hero-demo-cursor">|</span>
                    </div>
                  </div>

                  {/* Generate button pulse */}
                  <div className="hero-demo-btn flex h-9 items-center gap-2 rounded-lg bg-gradient-to-r from-[#F44097] to-[#FC67FA] px-5 shadow-[0_0_16px_rgba(244,64,151,0.3)]">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    <span className="text-[12px] font-semibold text-white">Generate</span>
                  </div>
                </div>

                {/* ── STEP 3: See result ── */}
                <div className="hero-step hero-step-3 absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1">
                    <span className="text-[10px] font-semibold text-[#F44097]">Step 3</span>
                    <span className="text-[10px] text-white/30">Your result is ready</span>
                  </div>

                  {/* Result card */}
                  <div className="hero-result-pop relative w-44 md:w-48 rounded-xl border border-white/[0.08] bg-[#16171a] overflow-hidden shadow-lg">
                    <div className="aspect-[4/5] bg-gradient-to-br from-[#1a0a20] via-[#15101f] to-[#0d1520] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#F44097]/10 via-transparent to-[#9333ea]/8" />
                      <div className="hero-result-shimmer absolute inset-0" />
                      <ImageIcon className="h-10 w-10 text-[#F44097]/20" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2">
                      <div className="hero-dot h-1.5 w-1.5 rounded-full bg-[#F44097]" />
                      <span className="text-[10px] font-medium text-white/50">AI Generated</span>
                    </div>
                  </div>

                  {/* Download hint */}
                  <div className="hero-download-hint flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1">
                    <Check className="h-3 w-3 text-green-400/60" />
                    <span className="text-[10px] text-white/35">Ready to download</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step indicators — dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="hero-dot-indicator hero-dot-ind-1 h-1.5 rounded-full bg-white/20" />
              <div className="hero-dot-indicator hero-dot-ind-2 h-1.5 rounded-full bg-white/20" />
              <div className="hero-dot-indicator hero-dot-ind-3 h-1.5 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Particles */}
          <div className="hero-particle pointer-events-none absolute top-[12%] right-[10%] h-1 w-1 rounded-full bg-[#F44097]/40" />
          <div className="hero-particle-delay pointer-events-none absolute bottom-[18%] left-[12%] h-1.5 w-1.5 rounded-full bg-[#FC67FA]/30" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
