import { useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 600, h = 400) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const NEW_ITEMS = [
  { name: 'AI Dance Animation', slug: 'ai-dance-animation', category: 'trending', img: IMG('dance,motion', 70), tag: 'Video' },
  { name: 'Text to Video', slug: 'text-to-video', category: 'trending', img: IMG('video,generation', 73), tag: 'Video' },
  { name: 'Character Design', slug: 'character-design', category: 'ai-generate', img: IMG('character,illustration', 52), tag: 'AI Generate' },
  { name: 'QR Art', slug: 'qr-art', category: 'design-tools', img: IMG('qr,code', 58), tag: 'Design' },
  { name: 'Tattoo Preview', slug: 'tattoo-preview', category: 'face-body', img: IMG('tattoo,arm', 68), tag: 'Face & Body' },
  { name: 'Scene Generator', slug: 'scene-generator', category: 'ai-generate', img: IMG('fantasy,landscape', 51), tag: 'AI Generate' },
  { name: 'GIF Generator', slug: 'gif-generator', category: 'trending', img: IMG('gif,animated', 75), tag: 'Video' },
  { name: 'Poster Design', slug: 'poster-design', category: 'design-tools', img: IMG('poster,graphic', 60), tag: 'Design' },
];

const NewFeatures = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--neon-pink)]/10">
            <Sparkles className="h-4.5 w-4.5 text-[var(--neon-pink)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--page-text)]">What's New</h2>
            <p className="text-xs text-[var(--page-text-muted)]">Latest additions to the studio</p>
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
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
      >
        {NEW_ITEMS.map((item) => (
          <Link
            key={item.slug}
            to={`/${item.category}/${item.slug}`}
            className="group shrink-0 w-[220px] sm:w-[260px] rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--neon-pink)]/20 hover:shadow-[0_0_30px_rgba(244,64,151,0.08)] transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* NEW badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--neon-pink)] text-white shadow-[0_0_12px_rgba(244,64,151,0.4)]">
                New
              </span>
              {/* Category tag */}
              <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-medium rounded-md bg-black/50 text-white/80 backdrop-blur-sm">
                {item.tag}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Content */}
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--page-text)] group-hover:text-[var(--neon-pink)] transition-colors">
                {item.name}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--page-text-muted)] group-hover:text-[var(--neon-pink)] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewFeatures;
