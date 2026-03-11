import type { StateCreator } from 'zustand';
import type { IFavoritesState } from './types';

const LIKES_KEY = 'hrakai-likes';
const LIKED_KEY = 'hrakai-liked';
const WISHLIST_KEY = 'hrakai-wishlist';

// Seed demo like counts so the UI isn't empty
const DEMO_LIKES: Record<string, number> = {
  'ai-portrait': 1243,
  'background-remove': 2871,
  'style-transfer': 987,
  'face-enhance': 654,
  'neon-glow': 1532,
  'cartoon-filter': 1105,
  'text-to-image': 3210,
  'face-swap': 2104,
  'super-resolution': 1890,
  'sketch-effect': 743,
  'watercolor': 612,
  'pop-art': 528,
  'auto-retouch': 1456,
  'hdr-boost': 890,
  'slow-motion': 1678,
  'outpainting': 945,
  'logo-creator': 1320,
  'age-transform': 776,
  'hair-color': 893,
  'makeup-try-on': 1050,
  'double-exposure': 634,
  'vintage-look': 521,
  'pixel-art': 489,
  'object-eraser': 1735,
  'sky-replacement': 1102,
  'color-grading': 867,
  'cinemagraph': 543,
  'character-design': 1287,
  'qr-art': 412,
  'collage-maker': 678,
  'image-to-svg': 345,
  'mockup-generator': 901,
};

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function persist(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

const useFavoritesStore: StateCreator<IFavoritesState> = (set, get) => ({
  likes: { ...DEMO_LIKES, ...loadJson<Record<string, number>>(LIKES_KEY, {}) },
  likedByUser: loadJson<string[]>(LIKED_KEY, []),
  wishlist: loadJson<string[]>(WISHLIST_KEY, []),

  toggleLike: (slug: string) => {
    const { likes, likedByUser } = get();
    const alreadyLiked = likedByUser.includes(slug);
    const currentCount = likes[slug] ?? 0;

    const nextLiked = alreadyLiked
      ? likedByUser.filter(s => s !== slug)
      : [...likedByUser, slug];
    const nextLikes = {
      ...likes,
      [slug]: alreadyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
    };

    persist(LIKES_KEY, nextLikes);
    persist(LIKED_KEY, nextLiked);
    set({ likes: nextLikes, likedByUser: nextLiked });
  },

  isLiked: (slug: string) => get().likedByUser.includes(slug),

  getLikeCount: (slug: string) => get().likes[slug] ?? 0,

  toggleWishlist: (slug: string) => {
    const { wishlist } = get();
    const next = wishlist.includes(slug)
      ? wishlist.filter(s => s !== slug)
      : [...wishlist, slug];
    persist(WISHLIST_KEY, next);
    set({ wishlist: next });
  },

  isInWishlist: (slug: string) => get().wishlist.includes(slug),
});

export default useFavoritesStore;
export type { IFavoritesState };
