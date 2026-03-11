import { useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const IMG = (keyword: string, lock: number, w = 400, h = 500) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const APPS = [
  { name: 'Nano Portrait Pro', href: '/ai-effects/ai-portrait', img: IMG('portrait,professional', 110), isPro: true, category: 'Portrait' },
  { name: 'Skin Enhancer', href: '/face-body/face-enhance', img: IMG('beauty,skin,face', 111), isPro: true, category: 'Beauty' },
  { name: 'BG Remover', href: '/ai-effects/background-remove', img: IMG('person,cutout', 112), isPro: false, category: 'Editing' },
  { name: 'Recast Style', href: '/ai-effects/style-transfer', img: IMG('artistic,painting', 113), isPro: false, category: 'Style' },
  { name: 'Upscale 4K', href: '/photo-editor/super-resolution', img: IMG('sharp,detail,macro', 114), isPro: true, category: 'Enhance' },
  { name: 'Face Morph', href: '/face-body/face-swap', img: IMG('face,morph,people', 115), isPro: false, category: 'Face' },
  { name: 'Lipsync AI', href: '/video-effects/video-portrait', img: IMG('speaking,video,person', 116), isPro: true, category: 'Video' },
  { name: 'Object Remove', href: '/photo-editor/object-eraser', img: IMG('clean,minimal,photo', 117), isPro: false, category: 'Editing' },
  { name: 'Color Match', href: '/video-effects/color-match', img: IMG('color,grading,cinema', 118), isPro: false, category: 'Color' },
  { name: 'Tattoo Studio', href: '/face-body/tattoo-preview', img: IMG('tattoo,arm,design', 119), isPro: true, category: 'Body' },
];

const CreatorApps = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10">
            <Zap className="h-4.5 w-4.5 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--page-text)]">Creator Recommended Apps</h2>
            <p className="text-xs text-[var(--page-text-muted)]">Curated AI tools loved by top creators</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-muted)] hover:text-[var(--page-text)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-muted)] hover:text-[var(--page-text)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
      >
        {APPS.map((app) => (
          <Link
            key={app.name}
            to={app.href}
            className="group shrink-0 w-[150px] md:w-[170px]"
          >
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/5] mb-2.5 border border-[var(--surface-border)] bg-[var(--surface)]">
              <img
                src={app.img}
                alt={app.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Pro badge */}
              {app.isPro && (
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-extrabold uppercase tracking-wider shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
                  Pro
                </span>
              )}
              {/* Category tag */}
              <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/50 text-white/80 text-[9px] font-medium backdrop-blur-sm">
                {app.category}
              </span>
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-xs md:text-sm font-medium text-[var(--page-text-secondary)] group-hover:text-[var(--page-text)] transition-colors truncate">
              {app.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CreatorApps;
