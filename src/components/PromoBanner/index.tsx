import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const IMG = (keyword: string, lock: number, w = 320, h = 420) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const PHOTOS = [
  { src: IMG('portrait,fashion,woman', 80), rotate: -18, x: '48%', y: '8%', z: 1, w: 130 },
  { src: IMG('portrait,studio,model', 81), rotate: -6, x: '55%', y: '-4%', z: 3, w: 170 },
  { src: IMG('portrait,woman,elegant', 82), rotate: 4, x: '62%', y: '2%', z: 5, w: 190 },
  { src: IMG('portrait,fashion,girl', 83), rotate: 14, x: '74%', y: '-2%', z: 4, w: 160 },
  { src: IMG('portrait,woman,casual', 84), rotate: 24, x: '84%', y: '6%', z: 2, w: 140 },
];

const PromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[var(--hero-card-bg)] border border-[var(--surface-border)] min-h-[220px] md:min-h-[280px]">
      {/* Left fade overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--hero-card-bg)] via-[var(--hero-card-bg)]/60 to-transparent z-[2]" />

      {/* Subtle neon glow accent at bottom-left */}
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[var(--neon-pink)]/5 blur-3xl z-[1]" />

      {/* Scattered photos — right side */}
      <div className="absolute inset-0 z-[1]">
        {PHOTOS.map((photo, i) => (
          <div
            key={i}
            className="absolute rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-[var(--surface-border)]"
            style={{
              width: `${photo.w}px`,
              aspectRatio: '3/4',
              left: photo.x,
              top: photo.y,
              transform: `rotate(${photo.rotate}deg)`,
              zIndex: photo.z,
            }}
          >
            <img
              src={photo.src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content — left side */}
      <div className="relative z-[3] flex flex-col justify-center px-6 md:px-10 py-8 md:py-10 max-w-[55%] md:max-w-[45%] min-h-[220px] md:min-h-[280px]">
        {/* Badge */}
        <span className="inline-flex w-fit px-3 py-1 rounded-md bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] text-white text-[10px] md:text-xs font-extrabold uppercase tracking-wider mb-4 md:mb-5 shadow-[0_0_12px_rgba(244,64,151,0.3)]">
          AI Character
        </span>

        {/* Headline */}
        <h2 className="text-xl sm:text-2xl md:text-[2rem] lg:text-4xl font-black italic uppercase leading-[1.1] text-[var(--page-text)] mb-3 md:mb-4 tracking-tight">
          Different Scenes<br />Same Star
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[var(--page-text-muted)] mb-5 md:mb-7 leading-relaxed max-w-xs">
          Build your character. One click does the rest
        </p>

        {/* CTA */}
        <Link
          to="/ai-generate/character-design"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text)] px-5 md:px-6 py-2.5 md:py-3 text-sm font-bold hover:bg-[var(--surface-hover)] transition-colors"
        >
          Try AI Character
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;
