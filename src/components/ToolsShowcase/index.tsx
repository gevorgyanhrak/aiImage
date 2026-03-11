import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';

const IMG = (keyword: string, lock: number, w = 400, h = 500) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const TOOLS = [
  { name: 'Create Image', href: '/ai-generate/text-to-image', img: IMG('white,horse,animal', 90), isNew: false },
  { name: 'Create Video', href: '/video-effects/cinemagraph', img: IMG('woman,artist,studio', 91), isNew: false },
  { name: 'Soul Cinema', href: '/video-effects/scene-transition', img: IMG('cinema,crowd,stage', 92), isNew: true },
  { name: 'Soul 2.0', href: '/ai-effects/style-transfer', img: IMG('fashion,twin,model', 93), isNew: true },
  { name: 'Moodboard', href: '/design-tools/collage-maker', img: IMG('fashion,collage,pink', 94), isNew: true },
  { name: 'Soul ID', href: '/ai-effects/ai-portrait', img: IMG('portrait,fashion,blue', 95), isNew: false },
  { name: 'Face Swap', href: '/face-body/face-swap', img: IMG('face,portrait,studio', 96), isNew: false },
  { name: 'AI Sketch', href: '/ai-effects/sketch-effect', img: IMG('sketch,pencil,art', 97), isNew: true },
];

const ToolsShowcase = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[var(--hero-card-bg)] border border-[var(--surface-border)]">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Left — headline */}
        <div className="shrink-0 flex flex-col justify-center px-6 md:px-10 py-7 md:py-10 md:w-[280px] lg:w-[320px]">
          <h2 className="text-2xl md:text-[1.75rem] lg:text-[2rem] font-black italic uppercase leading-[1.1] text-[var(--page-text)] mb-3 tracking-tight">
            What will you<br />
            <span className="text-[var(--neon-pink)] neon-text">create today?</span>
          </h2>
          <p className="text-sm text-[var(--page-text-muted)] mb-6 leading-relaxed">
            Create authentic images and videos with natural texture and easy style
          </p>
          <Link
            to="/ai-effects"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] text-white px-5 py-2.5 text-sm font-bold shadow-[0_0_20px_rgba(244,64,151,0.25)] hover:shadow-[0_0_30px_rgba(244,64,151,0.4)] transition-shadow"
          >
            Explore all tools
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>

        {/* Right — scrollable tool cards */}
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 px-4 md:px-0 md:pr-6 py-5 md:py-6">
            {TOOLS.map((tool) => (
              <Link
                key={tool.name}
                to={tool.href}
                className="group shrink-0 flex flex-col w-[140px] md:w-[160px]"
              >
                {/* Card image */}
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/5] mb-2.5 border border-[var(--surface-border)] bg-[var(--surface)]">
                  <img
                    src={tool.img}
                    alt={tool.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* NEW badge */}
                  {tool.isNew && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[var(--neon-pink)] text-white text-[9px] font-extrabold uppercase tracking-wider shadow-[0_2px_12px_rgba(244,64,151,0.4)]">
                      New
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Label + arrow */}
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-xs md:text-sm font-medium text-[var(--page-text-secondary)] group-hover:text-[var(--page-text)] transition-colors truncate">
                    {tool.name}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--page-text-muted)] group-hover:text-[var(--page-text-secondary)] shrink-0 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
