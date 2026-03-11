import { Link } from 'react-router';
import { Heart, TrendingUp, Eye, Star } from 'lucide-react';
import { useAppStore } from '@/store/store';

const IMG = (keyword: string, lock: number, w = 600, h = 400) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const POPULAR_ITEMS = [
  { name: 'AI Portrait', slug: 'ai-portrait', category: 'ai-effects', img: IMG('portrait,woman', 1), rating: 4.9, views: '89k' },
  { name: 'Background Remove', slug: 'background-remove', category: 'ai-effects', img: IMG('person,standing', 2), rating: 4.8, views: '120k' },
  { name: 'Text to Image', slug: 'text-to-image', category: 'ai-generate', img: IMG('digital,art', 43), rating: 4.9, views: '95k' },
  { name: 'Style Transfer', slug: 'style-transfer', category: 'ai-effects', img: IMG('painting,art', 3), rating: 4.7, views: '67k' },
  { name: 'Face Swap', slug: 'face-swap', category: 'face-body', img: IMG('two,people,face', 65), rating: 4.6, views: '110k' },
  { name: 'Neon Glow', slug: 'neon-glow', category: 'ai-effects', img: IMG('neon,night', 9), rating: 4.8, views: '54k' },
  { name: 'Super Resolution', slug: 'super-resolution', category: 'photo-editor', img: IMG('macro,detail', 25), rating: 4.7, views: '78k' },
  { name: 'Cartoon Filter', slug: 'cartoon-filter', category: 'ai-effects', img: IMG('cartoon,illustration', 7), rating: 4.5, views: '62k' },
];

function formatLikes(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

const PopularFilters = () => {
  const likes = useAppStore(s => s.likes);

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10">
          <TrendingUp className="h-4.5 w-4.5 text-orange-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--page-text)]">Popular This Week</h2>
          <p className="text-xs text-[var(--page-text-muted)]">Most-used filters by the community</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {POPULAR_ITEMS.map((item, index) => (
          <Link
            key={item.slug}
            to={`/${item.category}/${item.slug}`}
            className="group relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--surface-border-strong)] transition-all duration-300"
          >
            {/* Rank badge */}
            <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm text-xs font-bold text-white">
              #{index + 1}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-3.5">
              <h3 className="text-sm font-semibold text-[var(--page-text)] mb-2 group-hover:text-[var(--neon-pink)] transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-[var(--page-text-muted)]">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-[var(--neon-pink)]" />
                  {formatLikes(likes[item.slug] ?? 0)}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
                  {item.rating}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularFilters;
