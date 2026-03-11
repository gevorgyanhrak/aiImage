import { Link } from 'react-router';
import { Users, Eye, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 400, h = 500) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const AVATAR = (lock: number) =>
  `https://loremflickr.com/80/80/face,person?lock=${lock}`;

const CREATIONS = [
  { id: 1, img: IMG('fantasy,castle,art', 300), title: 'Dream Castle', creator: 'artisan_ai', avatar: AVATAR(300), views: '23.4k', likes: 1892, effect: 'Style Transfer' },
  { id: 2, img: IMG('cyberpunk,portrait,neon', 301), title: 'Neon Runner', creator: 'neoncraft', avatar: AVATAR(301), views: '18.7k', likes: 1534, effect: 'Neon Glow' },
  { id: 3, img: IMG('watercolor,landscape', 302), title: 'Misty Valley', creator: 'brush_fx', avatar: AVATAR(302), views: '14.2k', likes: 1201, effect: 'Watercolor' },
  { id: 4, img: IMG('anime,character,colorful', 303), title: 'Sakura Knight', creator: 'anime_gen', avatar: AVATAR(303), views: '31.5k', likes: 2847, effect: 'AI Generate' },
  { id: 5, img: IMG('portrait,oil,painting', 304), title: 'The Duchess', creator: 'classic_ai', avatar: AVATAR(304), views: '11.8k', likes: 967, effect: 'Oil Painting' },
  { id: 6, img: IMG('surreal,space,dream', 305), title: 'Cosmic Dreams', creator: 'astro_art', avatar: AVATAR(305), views: '27.1k', likes: 2234, effect: 'Text to Image' },
  { id: 7, img: IMG('glitch,digital,abstract', 306), title: 'Data Corrupt', creator: 'glitchwave', avatar: AVATAR(306), views: '9.6k', likes: 743, effect: 'Glitch Art' },
  { id: 8, img: IMG('vintage,retro,film', 307), title: 'Summer \'72', creator: 'retro_lens', avatar: AVATAR(307), views: '15.3k', likes: 1105, effect: 'Vintage Look' },
  { id: 9, img: IMG('pop,art,bold,colorful', 308), title: 'Pop Culture', creator: 'bold_strks', avatar: AVATAR(308), views: '12.9k', likes: 1089, effect: 'Pop Art' },
  { id: 10, img: IMG('pixel,game,retro', 309), title: '8-Bit Hero', creator: 'pixelcraft', avatar: AVATAR(309), views: '20.4k', likes: 1756, effect: 'Pixel Art' },
];

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

const CommunityShowcase = () => {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
            <Users className="h-4.5 w-4.5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--page-text)]">Community Showcase</h2>
            <p className="text-xs text-[var(--page-text-muted)]">Amazing creations by hrakAi users</p>
          </div>
        </div>
        <Link
          to="/ai-effects"
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--neon-pink)] hover:underline"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Gallery grid — masonry-like with varying heights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {CREATIONS.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              'group relative rounded-xl overflow-hidden border border-[var(--surface-border)] bg-[var(--surface)] cursor-pointer',
              // Alternate tall/short for masonry feel
              index % 3 === 0 ? 'row-span-1 aspect-[3/4]' : 'row-span-1 aspect-square',
            )}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Always-visible bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Bottom info — always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              {/* Creator row */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <img src={item.avatar} alt="" className="h-5 w-5 rounded-full object-cover border border-white/20" />
                <span className="text-[10px] font-medium text-white/80 truncate">@{item.creator}</span>
              </div>
              {/* Stats row */}
              <div className="flex items-center gap-2.5 text-[10px] text-white/50">
                <span className="flex items-center gap-0.5">
                  <Eye className="h-2.5 w-2.5" />
                  {item.views}
                </span>
                <span className="flex items-center gap-0.5">
                  <Heart className="h-2.5 w-2.5" />
                  {formatNumber(item.likes)}
                </span>
              </div>
            </div>

            {/* Hover overlay with title + effect */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-center p-3">
              <p className="text-sm font-bold text-white mb-1">{item.title}</p>
              <span className="px-2 py-0.5 rounded-md bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] text-[10px] font-medium backdrop-blur-sm">
                {item.effect}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityShowcase;
