import { Link, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Bookmark, Trash2, Heart, ExternalLink } from 'lucide-react';

import Header from '@/components/Header';
import { useAppStore } from '@/store/store';
import { SITE_NAME } from '@/constants/seo';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 600, h = 400) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

interface EffectInfo {
  name: string;
  slug: string;
  category: string;
  img: string;
  description: string;
}

// All known effects for resolving wishlist slugs to display data
const EFFECTS_MAP: Record<string, EffectInfo> = {
  'ai-portrait': { name: 'AI Portrait', slug: 'ai-portrait', category: 'ai-effects', img: IMG('portrait,woman', 1), description: 'Transform any photo into a stunning AI-generated portrait with artistic flair.' },
  'background-remove': { name: 'Background Remove', slug: 'background-remove', category: 'ai-effects', img: IMG('person,standing', 2), description: 'Instantly remove backgrounds from any image with precision AI.' },
  'style-transfer': { name: 'Style Transfer', slug: 'style-transfer', category: 'ai-effects', img: IMG('painting,art', 3), description: 'Apply the style of famous artworks to your photos.' },
  'face-enhance': { name: 'Face Enhance', slug: 'face-enhance', category: 'ai-effects', img: IMG('face,beauty', 4), description: 'Enhance facial features using advanced AI.' },
  'neon-glow': { name: 'Neon Glow', slug: 'neon-glow', category: 'ai-effects', img: IMG('neon,night', 9), description: 'Add electric neon glow effects to your images.' },
  'sketch-effect': { name: 'Sketch Effect', slug: 'sketch-effect', category: 'ai-effects', img: IMG('pencil,sketch', 6), description: 'Convert photos into beautiful pencil sketches.' },
  'cartoon-filter': { name: 'Cartoon Filter', slug: 'cartoon-filter', category: 'ai-effects', img: IMG('cartoon,illustration', 7), description: 'Turn your photos into fun cartoon-style illustrations.' },
  'watercolor': { name: 'Watercolor', slug: 'watercolor', category: 'ai-effects', img: IMG('watercolor,painting', 10), description: 'Transform photos into beautiful watercolor paintings.' },
  'pop-art': { name: 'Pop Art', slug: 'pop-art', category: 'ai-effects', img: IMG('pop,art,colorful', 13), description: 'Bold pop art transformations inspired by Warhol.' },
  'glitch-art': { name: 'Glitch Art', slug: 'glitch-art', category: 'ai-effects', img: IMG('glitch,digital', 14), description: 'Create striking digital glitch effects.' },
  'double-exposure': { name: 'Double Exposure', slug: 'double-exposure', category: 'ai-effects', img: IMG('double,exposure', 18), description: 'Blend two worlds into one frame.' },
  'vintage-look': { name: 'Vintage Look', slug: 'vintage-look', category: 'ai-effects', img: IMG('vintage,retro', 8), description: 'Add retro charm with authentic vintage effects.' },
  'pixel-art': { name: 'Pixel Art', slug: 'pixel-art', category: 'ai-effects', img: IMG('pixel,retro,game', 12), description: 'Convert images into retro pixel art style.' },
  'oil-painting': { name: 'Oil Painting', slug: 'oil-painting', category: 'ai-effects', img: IMG('oil,painting', 11), description: 'Create classic oil painting effects from your photos.' },
  'low-poly': { name: 'Low Poly', slug: 'low-poly', category: 'ai-effects', img: IMG('geometric,abstract', 15), description: 'Transform photos into geometric low-poly art.' },
  'auto-retouch': { name: 'Auto Retouch', slug: 'auto-retouch', category: 'photo-editor', img: IMG('selfie,woman', 21), description: 'One-click professional retouching for portraits.' },
  'hdr-boost': { name: 'HDR Boost', slug: 'hdr-boost', category: 'photo-editor', img: IMG('hdr,landscape', 22), description: 'Bring out hidden details with intelligent HDR.' },
  'super-resolution': { name: 'Super Resolution', slug: 'super-resolution', category: 'photo-editor', img: IMG('macro,detail', 25), description: 'Upscale images up to 4x without losing quality.' },
  'object-eraser': { name: 'Object Eraser', slug: 'object-eraser', category: 'photo-editor', img: IMG('street,urban', 26), description: 'Seamlessly remove unwanted objects from photos.' },
  'sky-replacement': { name: 'Sky Replacement', slug: 'sky-replacement', category: 'photo-editor', img: IMG('sky,sunset', 27), description: 'Replace dull skies with stunning alternatives.' },
  'color-grading': { name: 'Color Grading', slug: 'color-grading', category: 'photo-editor', img: IMG('cinema,film', 28), description: 'Apply cinematic color grading presets.' },
  'text-to-image': { name: 'Text to Image', slug: 'text-to-image', category: 'ai-generate', img: IMG('digital,art', 43), description: 'Generate stunning images from text descriptions.' },
  'outpainting': { name: 'Outpainting', slug: 'outpainting', category: 'ai-generate', img: IMG('panorama,landscape', 45), description: 'Extend your images beyond their borders.' },
  'logo-creator': { name: 'Logo Creator', slug: 'logo-creator', category: 'ai-generate', img: IMG('logo,design', 48), description: 'Design unique logo concepts from text.' },
  'character-design': { name: 'Character Design', slug: 'character-design', category: 'ai-generate', img: IMG('character,illustration', 52), description: 'Design original characters from text descriptions.' },
  'face-swap': { name: 'Face Swap', slug: 'face-swap', category: 'face-body', img: IMG('two,people,face', 65), description: 'Swap faces with seamless AI blending.' },
  'age-transform': { name: 'Age Transform', slug: 'age-transform', category: 'face-body', img: IMG('elderly,portrait', 61), description: 'See yourself at any age with AI.' },
  'hair-color': { name: 'Hair Color', slug: 'hair-color', category: 'face-body', img: IMG('hair,colorful', 63), description: 'Preview different hair colors before committing.' },
  'makeup-try-on': { name: 'Makeup Try-On', slug: 'makeup-try-on', category: 'face-body', img: IMG('makeup,beauty', 64), description: 'Try on different makeup looks virtually.' },
  'slow-motion': { name: 'Slow Motion', slug: 'slow-motion', category: 'video-effects', img: IMG('action,sport', 33), description: 'Create buttery smooth slow motion from any video.' },
  'cinemagraph': { name: 'Cinemagraph', slug: 'cinemagraph', category: 'video-effects', img: IMG('coffee,still,life', 36), description: 'Create mesmerizing cinemagraphs.' },
  'image-to-svg': { name: 'Image to SVG', slug: 'image-to-svg', category: 'design-tools', img: IMG('vector,illustration', 53), description: 'Convert raster images to clean SVG.' },
  'mockup-generator': { name: 'Mockup Generator', slug: 'mockup-generator', category: 'design-tools', img: IMG('mockup,product', 56), description: 'Place your designs on realistic mockups.' },
  'qr-art': { name: 'QR Art', slug: 'qr-art', category: 'design-tools', img: IMG('qr,code', 58), description: 'Create artistic QR codes that are scannable.' },
  'collage-maker': { name: 'Collage Maker', slug: 'collage-maker', category: 'design-tools', img: IMG('collage,photos', 59), description: 'Arrange multiple photos into beautiful collages.' },
};

function formatLikeCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

const WishlistPage = () => {
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const wishlist = useAppStore(s => s.wishlist);
  const toggleWishlist = useAppStore(s => s.toggleWishlist);
  const likes = useAppStore(s => s.likes);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Helmet>
          <title>Wishlist - {SITE_NAME}</title>
        </Helmet>
        <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center">
            <Bookmark className="h-16 w-16 text-[var(--page-text-faint)] mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Sign in to view your Wishlist</h1>
            <p className="text-sm text-[var(--page-text-muted)] mb-6">Save your favorite filters and access them anytime.</p>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.25)] hover:shadow-[0_0_30px_rgba(244,64,151,0.4)] transition-shadow"
            >
              Sign In
            </button>
          </div>
        </main>
      </>
    );
  }

  const wishlistItems = wishlist
    .map(slug => EFFECTS_MAP[slug])
    .filter(Boolean);

  return (
    <>
      <Header />
      <Helmet>
        <title>Wishlist - {SITE_NAME}</title>
      </Helmet>
      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
          {/* Page header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
                <Bookmark className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">My Wishlist</h1>
                <p className="text-xs text-[var(--page-text-muted)]">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
          </div>

          {/* Wishlist content */}
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.slug}
                  className="group relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--surface-border-strong)] transition-all duration-300"
                >
                  {/* Image */}
                  <Link to={`/${item.category}/${item.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link to={`/${item.category}/${item.slug}`}>
                      <h3 className="text-sm font-semibold text-[var(--page-text)] mb-1 group-hover:text-[var(--neon-pink)] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[var(--page-text-muted)] line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </Link>

                    {/* Actions row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px] text-[var(--page-text-muted)]">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-[var(--neon-pink)]" />
                          {formatLikeCount(likes[item.slug] ?? 0)} likes
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[var(--surface-hover)] text-[var(--page-text-muted)] capitalize">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/${item.category}/${item.slug}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-muted)] hover:text-[var(--page-text)] hover:bg-[var(--surface-hover)] transition-colors"
                          title="Open"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(item.slug)}
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-lg border transition-colors',
                            'border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10',
                          )}
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Bookmark className="h-14 w-14 text-[var(--page-text-faint)] mb-4" />
              <h2 className="text-lg font-semibold text-[var(--page-text-secondary)] mb-2">Your wishlist is empty</h2>
              <p className="text-sm text-[var(--page-text-muted)] mb-6 max-w-sm">
                Browse effects and click the bookmark icon to save them here for quick access.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-pink-light)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.25)] hover:shadow-[0_0_30px_rgba(244,64,151,0.4)] transition-shadow"
              >
                Explore Filters
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default WishlistPage;
