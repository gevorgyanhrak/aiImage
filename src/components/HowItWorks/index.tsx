import { Upload, Wand2, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const STEPS = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your Photo',
    description: 'Drag & drop any image or video. We support JPG, PNG, WebP, and MP4 formats up to 50MB.',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139, 92, 246, 0.3)',
    bgIcon: 'bg-violet-500/10',
    textIcon: 'text-violet-400',
  },
  {
    icon: Wand2,
    step: '02',
    title: 'Choose Effect or Prompt',
    description: 'Pick from 70+ AI filters or write a custom prompt. Mix styles, adjust intensity, and preview in real time.',
    color: 'from-[var(--neon-pink)] to-[var(--neon-pink-light)]',
    glow: 'rgba(244, 64, 151, 0.3)',
    bgIcon: 'bg-[var(--neon-pink)]/10',
    textIcon: 'text-[var(--neon-pink)]',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download & Share',
    description: 'Get your high-resolution result in seconds. Download in full quality or share directly to social media.',
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.3)',
    bgIcon: 'bg-emerald-500/10',
    textIcon: 'text-emerald-400',
  },
];

const HowItWorks = () => {
  return (
    <section>
      {/* Header */}
      <div className="text-center mb-8 md:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--neon-pink)] mb-2">Simple & Fast</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--page-text)] mb-3">How It Works</h2>
        <p className="text-sm text-[var(--page-text-muted)] max-w-md mx-auto">
          Transform your images in three simple steps. No design skills needed.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {STEPS.map(({ icon: Icon, step, title, description, bgIcon, textIcon, glow }, index) => (
          <div
            key={step}
            className="group relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 md:p-7 hover:border-[var(--surface-border-strong)] transition-all duration-300"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            {/* Step number */}
            <span className="absolute top-5 right-5 text-4xl font-black text-[var(--page-text-faint)] select-none">
              {step}
            </span>

            {/* Icon */}
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bgIcon} mb-5 transition-shadow duration-300 group-hover:shadow-[0_0_20px_${glow}]`}>
              <Icon className={`h-6 w-6 ${textIcon}`} />
            </div>

            {/* Content */}
            <h3 className="text-base font-bold text-[var(--page-text)] mb-2">{title}</h3>
            <p className="text-sm text-[var(--page-text-muted)] leading-relaxed">{description}</p>

            {/* Connector arrow (visible on md+, except last) */}
            {index < STEPS.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--header-bg)]">
                <ArrowRight className="h-3 w-3 text-[var(--page-text-muted)]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          to="/ai-effects"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.25)] hover:shadow-[0_0_30px_rgba(244,64,151,0.4)] transition-shadow"
        >
          Try It Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
