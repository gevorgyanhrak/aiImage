import { Link } from 'react-router';
import { Sparkles, Wand2, Layers, Zap, ArrowRight, Upload, Type, Image, Film, ArrowDown } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0F1113] border border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left — Text content (50%) */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
          <div className="hero-fade-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#F44097] hero-icon-pulse" />
            <span className="text-xs font-medium tracking-wide text-white/50">AI-Powered Creative Studio</span>
          </div>

          <h1 className="hero-fade-up hero-delay-1 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl">
            Create stunning visuals{' '}
            <span className="bg-gradient-to-r from-[#F44097] to-[#FC67FA] bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="hero-fade-up hero-delay-2 mt-4 max-w-md text-[15px] leading-relaxed text-white/35">
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
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5"
              >
                <Icon className="h-3 w-3 text-[#F44097]/70" />
                <span className="text-[11px] font-medium text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — AI generation flow visualization (50%) */}
        <div className="relative overflow-hidden bg-[#0a0b0d] min-h-[340px] lg:min-h-0 flex items-center justify-center p-6 md:p-10">
          {/* Animated glow blobs */}
          <div className="hero-blob-1 pointer-events-none absolute top-1/4 left-1/3 h-48 w-48 rounded-full bg-[#F44097]/12 blur-[90px]" />
          <div className="hero-blob-2 pointer-events-none absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-[#9333ea]/10 blur-[70px]" />
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.02]" />

          {/* Generation flow — the full visual */}
          <div className="hero-card-enter relative z-10 flex flex-col items-center gap-4 w-full max-w-xs">

            {/* Step 1: Input card — photo + prompt */}
            <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
              {/* Mock upload area */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/[0.03]">
                  <Upload className="h-4.5 w-4.5 text-white/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-2 w-20 rounded-full bg-white/10" />
                  <div className="mt-1.5 h-2 w-14 rounded-full bg-white/[0.05]" />
                </div>
                <div className="flex h-7 items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 gap-1">
                  <Image className="h-3 w-3 text-white/25" />
                  <Film className="h-3 w-3 text-white/25" />
                </div>
              </div>

              {/* Mock prompt textarea */}
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <Type className="mt-0.5 h-3 w-3 shrink-0 text-white/15" />
                  <div className="flex-1">
                    <span className="hero-typing text-[11px] leading-relaxed text-white/40">
                      Turn my photo into anime style with cherry blossoms...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow connector with processing animation */}
            <div className="flex flex-col items-center gap-1">
              <div className="hero-processing-ring relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
                <div className="hero-process-spin absolute inset-0 rounded-full border border-transparent border-t-[#F44097]/60" />
                <Sparkles className="h-3.5 w-3.5 text-[#F44097] hero-icon-pulse" />
              </div>
              <ArrowDown className="h-3 w-3 text-white/15 hero-arrow-bounce" />
            </div>

            {/* Step 2: Result — generated output */}
            <div className="hero-result-reveal w-full rounded-xl border border-white/[0.08] bg-[#111214] overflow-hidden shadow-2xl hero-image-glow">
              {/* Fake generated image grid — 2 results */}
              <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a0a1e] via-[#15101f] to-[#0d1520] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F44097]/8 to-[#9333ea]/6" />
                  <div className="hero-shimmer absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image className="h-8 w-8 text-[#F44097]/15" />
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <div className="hero-dot h-1 w-1 rounded-full bg-[#F44097]" />
                    <span className="text-[8px] text-white/40">Style 1</span>
                  </div>
                </div>
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#0d1520] via-[#12101a] to-[#1a0a14] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#FC67FA]/6 to-[#F44097]/4" />
                  <div className="hero-shimmer hero-shimmer-delay absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Film className="h-8 w-8 text-[#FC67FA]/12" />
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center gap-1">
                    <div className="hero-dot h-1 w-1 rounded-full bg-[#FC67FA]" />
                    <span className="text-[8px] text-white/40">Style 2</span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#111214]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#F44097]" />
                  <span className="text-[10px] font-medium text-white/50">AI Generated</span>
                </div>
                <div className="flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5">
                  <span className="text-[9px] text-white/30">2 results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corner particles */}
          <div className="hero-particle pointer-events-none absolute top-[12%] right-[10%] h-1 w-1 rounded-full bg-[#F44097]/40" />
          <div className="hero-particle-delay pointer-events-none absolute bottom-[18%] left-[12%] h-1.5 w-1.5 rounded-full bg-[#FC67FA]/30" />
          <div className="hero-particle pointer-events-none absolute top-[65%] right-[15%] h-1 w-1 rounded-full bg-[#9333ea]/30" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
