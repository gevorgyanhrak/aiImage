export interface IFavoritesState {
  /** Like counts per slug (public, any user) */
  likes: Record<string, number>;
  /** Slugs the current user has liked */
  likedByUser: string[];
  /** Wishlist slugs (auth-only) */
  wishlist: string[];

  toggleLike: (slug: string) => void;
  isLiked: (slug: string) => boolean;
  getLikeCount: (slug: string) => number;

  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}
