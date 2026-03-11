import { useState } from 'react';
import { Link } from 'react-router';
import { Flame, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 400, h = 500) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

interface TrendItem {
  name: string;
  href: string;
  img: string;
  category: string;
}

const CATEGORIES: Record<string, TrendItem[]> = {
  'Social Virals': [
    { name: 'Taki Taki Dance', href: '/trending/ai-dance-animation', img: IMG('dance,viral,tiktok', 400), category: 'social' },
    { name: 'Face Zoom Trend', href: '/face-body/expression-change', img: IMG('face,zoom,closeup', 401), category: 'social' },
    { name: 'Glow Up Check', href: '/face-body/makeup-try-on', img: IMG('glow,beauty,makeup', 402), category: 'social' },
    { name: 'Time Warp', href: '/face-body/age-transform', img: IMG('aging,time,portrait', 403), category: 'social' },
    { name: 'Twin Effect', href: '/face-body/face-swap', img: IMG('twins,mirror,effect', 404), category: 'social' },
    { name: 'Hair Switch', href: '/face-body/hair-color', img: IMG('hair,color,change', 405), category: 'social' },
  ],
  'TrendFX': [
    { name: 'Fisheye Warp', href: '/ai-effects/cartoon-filter', img: IMG('fisheye,lens,distort', 406), category: 'trendfx' },
    { name: 'Color Splash', href: '/photo-editor/selective-color', img: IMG('color,splash,bw', 407), category: 'trendfx' },
    { name: 'Cinematic Bars', href: '/photo-editor/color-grading', img: IMG('cinema,letterbox,movie', 408), category: 'trendfx' },
    { name: 'Neon Outline', href: '/ai-effects/neon-glow', img: IMG('neon,outline,glow', 409), category: 'trendfx' },
    { name: 'Mirror Split', href: '/ai-effects/double-exposure', img: IMG('mirror,split,reflection', 410), category: 'trendfx' },
    { name: 'VHS Retro', href: '/ai-effects/vintage-look', img: IMG('vhs,retro,noise', 411), category: 'trendfx' },
  ],
  'Art Styles': [
    { name: 'Anime Portrait', href: '/ai-effects/cartoon-filter', img: IMG('anime,portrait,style', 412), category: 'art' },
    { name: 'Comic Book', href: '/ai-effects/pop-art', img: IMG('comic,book,halftone', 413), category: 'art' },
    { name: 'Impressionist', href: '/ai-effects/oil-painting', img: IMG('impressionist,monet', 414), category: 'art' },
    { name: 'Pencil Sketch', href: '/ai-effects/sketch-effect', img: IMG('pencil,sketch,draw', 415), category: 'art' },
    { name: 'Stained Glass', href: '/ai-effects/stained-glass', img: IMG('stained,glass,light', 416), category: 'art' },
    { name: 'Mosaic Tiles', href: '/ai-effects/mosaic-tiles', img: IMG('mosaic,roman,tiles', 417), category: 'art' },
  ],
  'Photo Pro': [
    { name: 'Portrait Light', href: '/photo-editor/auto-retouch', img: IMG('portrait,lighting,studio', 418), category: 'photo' },
    { name: 'Sky Drama', href: '/photo-editor/sky-replacement', img: IMG('dramatic,sky,storm', 419), category: 'photo' },
    { name: 'Tilt Shift', href: '/photo-editor/lens-blur', img: IMG('miniature,tiltshift', 420), category: 'photo' },
    { name: 'Film Grain', href: '/photo-editor/light-leak', img: IMG('film,grain,analog', 421), category: 'photo' },
    { name: 'HDR Max', href: '/photo-editor/hdr-boost', img: IMG('hdr,vivid,landscape', 422), category: 'photo' },
    { name: 'Upscale 4K', href: '/photo-editor/super-resolution', img: IMG('sharp,4k,detail', 423), category: 'photo' },
  ],
};

const CATEGORY_KEYS = Object.keys(CATEGORIES);

const TrendingEffects = () => {
  const [activeTab, setActiveTab] = useState(CATEGORY_KEYS[0]);
  const items = CATEGORIES[activeTab];

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10">
            <Flame className="h-4.5 w-4.5 text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--page-text)]">Trending Effects</h2>
            <p className="text-xs text-[var(--page-text-muted)]">Most popular effects right now</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-hide pb-0.5">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={cn(
              'shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap border',
              activeTab === key
                ? 'bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border-[var(--neon-pink)]/20'
                : 'bg-[var(--surface)] text-[var(--page-text-muted)] border-[var(--surface-border)] hover:text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)]',
            )}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Effects grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="group relative rounded-xl overflow-hidden aspect-[4/5] border border-[var(--surface-border)] bg-[var(--surface)]"
          >
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Bottom gradient + title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-xs font-semibold text-white truncate">{item.name}</p>
            </div>
            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="flex items-center gap-1.5 rounded-lg bg-[var(--neon-pink)] px-3 py-1.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(244,64,151,0.4)]">
                Try Now
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingEffects;
