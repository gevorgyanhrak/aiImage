import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Volume2, VolumeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 800, h = 450) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

const CDN = 'https://cdn.higgsfield.ai/card';
const SAMPLE = (name: string) =>
  `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${name}.mp4`;

interface Slide {
  title: string;
  description: string;
  href: string;
  poster: string;
  video: string;
  badge: string | null;
}

const SLIDES: Slide[] = [
  {
    title: 'AI Dance Animation',
    description: 'Bring any character to life with AI-powered dance animation and realistic body motion.',
    href: '/trending/ai-dance-animation',
    poster: IMG('dance,motion', 70),
    video: `${CDN}/ba0200b1-8356-4511-a952-f01a19e0bbf2.mp4`,
    badge: 'Hot',
  },
  {
    title: 'Style Transfer Video',
    description: 'Transform ordinary footage into living paintings with Van Gogh, Monet, and abstract styles.',
    href: '/trending/style-transfer-video',
    poster: IMG('artistic,video', 71),
    video: SAMPLE('ForBiggerEscapes'),
    badge: null,
  },
  {
    title: 'AI Portrait Animation',
    description: 'Turn any portrait into a realistic talking-head animation with natural facial movements.',
    href: '/trending/ai-portrait-animation',
    poster: IMG('portrait,animated', 72),
    video: SAMPLE('ForBiggerFun'),
    badge: 'New',
  },
  {
    title: 'Text to Video',
    description: 'Generate short video clips from text descriptions. Cinematic 5-second clips with motion.',
    href: '/trending/text-to-video',
    poster: IMG('video,generation', 73),
    video: SAMPLE('ForBiggerJoyrides'),
    badge: 'Popular',
  },
  {
    title: 'Video Filter Magic',
    description: 'Apply AI-powered cinematic filters — cyberpunk neon, vintage film, and more.',
    href: '/trending/video-filter-magic',
    poster: IMG('filter,cinematic', 74),
    video: SAMPLE('ForBiggerMeltdowns'),
    badge: null,
  },
  {
    title: 'GIF Generator',
    description: 'Create eye-catching animated GIFs from any image. Perfect for social media.',
    href: '/trending/gif-generator',
    poster: IMG('gif,animated', 75),
    video: SAMPLE('ForBiggerBlazes'),
    badge: 'New',
  },
];

/** Limits video playback to ~5 seconds then restarts */
function useVideoLoop(ref: React.RefObject<HTMLVideoElement | null>, maxDuration = 5) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= maxDuration) {
        video.currentTime = 0;
      }
    };
    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [ref, maxDuration]);
}

const VideoCard = ({ slide }: { slide: Slide }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useVideoLoop(videoRef, 5);

  // Autoplay muted on mount via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <Link
      to={slide.href}
      className="group shrink-0 w-[280px] sm:w-[340px] md:w-[420px] lg:w-[480px]"
    >
      {/* Video card */}
      <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[16/9] mb-3 bg-[var(--surface)] border border-[var(--surface-border)]">
        {/* Video — autoplay muted */}
        <video
          ref={videoRef}
          src={slide.video}
          poster={slide.poster}
          muted
          playsInline
          loop={false}
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Mute / Unmute button */}
        <button
          type="button"
          onClick={toggleMute}
          className={cn(
            'absolute bottom-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
            isMuted
              ? 'bg-black/50 text-white/60 backdrop-blur-sm hover:bg-black/70 hover:text-white'
              : 'bg-[var(--neon-pink)]/80 text-white backdrop-blur-sm hover:bg-[var(--neon-pink)]',
          )}
        >
          {isMuted ? (
            <VolumeOff className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Badge */}
        {slide.badge && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[var(--neon-pink)] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-[0_2px_12px_rgba(244,64,151,0.35)]">
            {slide.badge}
          </span>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
          <div className="h-full bg-[var(--neon-pink)] animate-[progress_5s_linear_infinite]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm md:text-base font-extrabold uppercase tracking-wide text-[var(--page-text)] mb-1 group-hover:text-[var(--neon-pink)] transition-colors truncate">
        {slide.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-[var(--page-text-muted)] line-clamp-2 leading-relaxed">
        {slide.description}
      </p>
    </Link>
  );
};

const FeaturedCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(':scope > a')?.offsetWidth ?? 400;
    const gap = 16;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + gap) : cardWidth + gap, behavior: 'smooth' });
  };

  return (
    <section className="relative group/carousel">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll('left')}
        className={cn(
          'absolute left-2 md:left-3 top-[120px] md:top-[140px] z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[var(--header-bg)]/80 backdrop-blur-sm border border-[var(--surface-border-strong)] text-[var(--page-text)] shadow-xl transition-all duration-200',
          canScrollLeft
            ? 'opacity-0 group-hover/carousel:opacity-100 hover:bg-[var(--surface-hover)] hover:scale-105'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll('right')}
        className={cn(
          'absolute right-2 md:right-3 top-[120px] md:top-[140px] z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[var(--header-bg)]/80 backdrop-blur-sm border border-[var(--surface-border-strong)] text-[var(--page-text)] shadow-xl transition-all duration-200',
          canScrollRight
            ? 'opacity-0 group-hover/carousel:opacity-100 hover:bg-[var(--surface-hover)] hover:scale-105'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth -mx-1 px-1 pb-2"
      >
        {SLIDES.map((slide) => (
          <VideoCard key={slide.href} slide={slide} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCarousel;
