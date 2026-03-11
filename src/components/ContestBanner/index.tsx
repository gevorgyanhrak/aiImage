import { Link } from 'react-router';
import { Trophy, Eye, ArrowRight } from 'lucide-react';

const IMG = (keyword: string, lock: number, w = 300, h = 400) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const ENTRIES = [
  { id: 1, img: IMG('fantasy,portrait', 200), creator: 'alex_art', views: '12.4k' },
  { id: 2, img: IMG('neon,cyberpunk', 201), creator: 'neonwave', views: '8.7k' },
  { id: 3, img: IMG('surreal,dream', 202), creator: 'dreamcrft', views: '15.1k' },
  { id: 4, img: IMG('anime,style', 203), creator: 'otaku_gen', views: '9.3k' },
  { id: 5, img: IMG('abstract,colorful', 204), creator: 'color_lab', views: '6.8k' },
  { id: 6, img: IMG('portrait,artistic', 205), creator: 'pixelina', views: '11.2k' },
  { id: 7, img: IMG('landscape,fantasy', 206), creator: 'worldbldr', views: '7.5k' },
  { id: 8, img: IMG('dark,gothic', 207), creator: 'shadowfx', views: '10.9k' },
];

const ContestBanner = () => {
  return (
    <section className="rounded-2xl md:rounded-3xl border border-[var(--surface-border)] bg-[var(--hero-card-bg)] overflow-hidden">
      {/* Top — contest info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 md:px-8 pt-6 md:pt-8 pb-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10">
            <Trophy className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-lg md:text-xl font-bold text-[var(--page-text)]">AI Art Challenge</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Active
              </span>
            </div>
            <p className="text-sm text-[var(--page-text-muted)]">
              Create the most stunning AI-generated artwork. Top entries win credits and features.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-black text-[var(--neon-pink)] leading-none">500</p>
            <p className="text-[10px] text-[var(--page-text-muted)] uppercase tracking-wider mt-0.5">Credits Prize</p>
          </div>
          <Link
            to="/ai-effects"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(244,64,151,0.2)] hover:shadow-[0_0_24px_rgba(244,64,151,0.35)] transition-shadow whitespace-nowrap"
          >
            Enter Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Bottom — submissions grid */}
      <div className="px-5 md:px-8 pb-6 md:pb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-[var(--page-text-secondary)]">Recent Entries</p>
          <button type="button" className="text-xs text-[var(--neon-pink)] hover:underline">See all entries</button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {ENTRIES.map((entry) => (
            <div key={entry.id} className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-[var(--surface)] cursor-pointer">
              <img
                src={entry.img}
                alt={`Entry by ${entry.creator}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2">
                <p className="text-[10px] font-semibold text-white truncate">@{entry.creator}</p>
                <p className="text-[9px] text-white/60 flex items-center gap-0.5">
                  <Eye className="h-2.5 w-2.5" />
                  {entry.views}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestBanner;
