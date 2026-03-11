import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Image,
  Video,
  Wand2,
  PenTool,
  SmilePlus,
  Grid3X3,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const IMG = (keyword: string, lock: number, w = 400, h = 300) =>
  `https://loremflickr.com/${w}/${h}/${keyword}?lock=${lock}`;

interface FilterItem {
  name: string;
  slug: string;
  category: string;
  img: string;
  description: string;
}

const ALL_FILTERS: FilterItem[] = [
  { name: 'AI Portrait', slug: 'ai-portrait', category: 'ai-effects', img: IMG('portrait,woman', 1), description: 'AI-generated portrait with artistic flair' },
  { name: 'Background Remove', slug: 'background-remove', category: 'ai-effects', img: IMG('person,standing', 2), description: 'Instantly remove backgrounds' },
  { name: 'Style Transfer', slug: 'style-transfer', category: 'ai-effects', img: IMG('painting,art', 3), description: 'Apply famous art styles to photos' },
  { name: 'Neon Glow', slug: 'neon-glow', category: 'ai-effects', img: IMG('neon,night', 9), description: 'Electric neon glow effects' },
  { name: 'Sketch Effect', slug: 'sketch-effect', category: 'ai-effects', img: IMG('pencil,sketch', 6), description: 'Convert photos to pencil sketches' },
  { name: 'Cartoon Filter', slug: 'cartoon-filter', category: 'ai-effects', img: IMG('cartoon,illustration', 7), description: 'Turn photos into cartoons' },
  { name: 'Watercolor', slug: 'watercolor', category: 'ai-effects', img: IMG('watercolor,painting', 10), description: 'Beautiful watercolor painting effect' },
  { name: 'Pop Art', slug: 'pop-art', category: 'ai-effects', img: IMG('pop,art,colorful', 13), description: 'Bold pop art transformations' },
  { name: 'Glitch Art', slug: 'glitch-art', category: 'ai-effects', img: IMG('glitch,digital', 14), description: 'Digital glitch effects' },
  { name: 'Double Exposure', slug: 'double-exposure', category: 'ai-effects', img: IMG('double,exposure', 18), description: 'Cinematic double exposure blend' },
  { name: 'Auto Retouch', slug: 'auto-retouch', category: 'photo-editor', img: IMG('selfie,woman', 21), description: 'One-click portrait retouching' },
  { name: 'HDR Boost', slug: 'hdr-boost', category: 'photo-editor', img: IMG('hdr,landscape', 22), description: 'Intelligent HDR processing' },
  { name: 'Super Resolution', slug: 'super-resolution', category: 'photo-editor', img: IMG('macro,detail', 25), description: 'Upscale images up to 4x' },
  { name: 'Object Eraser', slug: 'object-eraser', category: 'photo-editor', img: IMG('street,urban', 26), description: 'Remove unwanted objects seamlessly' },
  { name: 'Sky Replacement', slug: 'sky-replacement', category: 'photo-editor', img: IMG('sky,sunset', 27), description: 'Replace dull skies with stunning ones' },
  { name: 'Color Grading', slug: 'color-grading', category: 'photo-editor', img: IMG('cinema,film', 28), description: 'Cinematic color grading presets' },
  { name: 'Slow Motion', slug: 'slow-motion', category: 'video-effects', img: IMG('action,sport', 33), description: 'AI-powered smooth slow motion' },
  { name: 'Cinemagraph', slug: 'cinemagraph', category: 'video-effects', img: IMG('coffee,still,life', 36), description: 'Mesmerizing partial-motion images' },
  { name: 'Video Stabilize', slug: 'video-stabilize', category: 'video-effects', img: IMG('camera,video', 35), description: 'Remove shaky camera motion' },
  { name: 'AI Zoom', slug: 'ai-zoom', category: 'video-effects', img: IMG('zoom,camera', 40), description: 'Ken Burns-style zoom effects' },
  { name: 'Text to Image', slug: 'text-to-image', category: 'ai-generate', img: IMG('digital,art', 43), description: 'Generate images from text' },
  { name: 'Outpainting', slug: 'outpainting', category: 'ai-generate', img: IMG('panorama,landscape', 45), description: 'Extend images beyond borders' },
  { name: 'Logo Creator', slug: 'logo-creator', category: 'ai-generate', img: IMG('logo,design', 48), description: 'Design unique logo concepts' },
  { name: 'Character Design', slug: 'character-design', category: 'ai-generate', img: IMG('character,illustration', 52), description: 'Design original characters' },
  { name: 'Image to SVG', slug: 'image-to-svg', category: 'design-tools', img: IMG('vector,illustration', 53), description: 'Convert raster to vector' },
  { name: 'Mockup Generator', slug: 'mockup-generator', category: 'design-tools', img: IMG('mockup,product', 56), description: 'Product mockup generation' },
  { name: 'QR Art', slug: 'qr-art', category: 'design-tools', img: IMG('qr,code', 58), description: 'Artistic scannable QR codes' },
  { name: 'Collage Maker', slug: 'collage-maker', category: 'design-tools', img: IMG('collage,photos', 59), description: 'Beautiful photo collages' },
  { name: 'Face Swap', slug: 'face-swap', category: 'face-body', img: IMG('two,people,face', 65), description: 'Seamless AI face swapping' },
  { name: 'Age Transform', slug: 'age-transform', category: 'face-body', img: IMG('elderly,portrait', 61), description: 'AI age progression' },
  { name: 'Hair Color', slug: 'hair-color', category: 'face-body', img: IMG('hair,colorful', 63), description: 'Preview different hair colors' },
  { name: 'Makeup Try-On', slug: 'makeup-try-on', category: 'face-body', img: IMG('makeup,beauty', 64), description: 'Virtual makeup application' },
];

const CATEGORIES = [
  { key: 'all', label: 'All', icon: Grid3X3 },
  { key: 'ai-effects', label: 'AI Effects', icon: Sparkles },
  { key: 'photo-editor', label: 'Photo Editor', icon: Image },
  { key: 'video-effects', label: 'Video', icon: Video },
  { key: 'ai-generate', label: 'AI Generate', icon: Wand2 },
  { key: 'design-tools', label: 'Design', icon: PenTool },
  { key: 'face-body', label: 'Face & Body', icon: SmilePlus },
];

const FilterExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let items = ALL_FILTERS;

    if (activeCategory !== 'all') {
      items = items.filter(f => f.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(
        f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [activeCategory, search]);

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
          <SlidersHorizontal className="h-4.5 w-4.5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--page-text)]">Filter Explorer</h2>
          <p className="text-xs text-[var(--page-text-muted)]">Browse and search all available filters</p>
        </div>
      </div>

      {/* Search + Category Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--page-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search filters..."
            className="w-full h-9 pl-9 pr-8 rounded-lg border border-[var(--surface-border-strong)] bg-[var(--input-bg)] text-sm text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] focus:outline-none focus:border-[var(--neon-pink)]/40 focus:shadow-[0_0_0_3px_rgba(244,64,151,0.08)] transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-[var(--page-text-muted)] hover:text-[var(--page-text)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
          {CATEGORIES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={cn(
                'flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap',
                activeCategory === key
                  ? 'bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border border-[var(--neon-pink)]/20'
                  : 'bg-[var(--surface)] text-[var(--page-text-muted)] border border-[var(--surface-border)] hover:text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)]',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              to={`/${item.category}/${item.slug}`}
              className="group relative rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--surface-border-strong)] transition-all duration-200"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-2.5">
                <h3 className="text-xs font-semibold text-[var(--page-text)] truncate group-hover:text-[var(--neon-pink)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[11px] text-[var(--page-text-muted)] truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-10 w-10 text-[var(--page-text-faint)] mb-3" />
          <p className="text-sm font-medium text-[var(--page-text-muted)] mb-1">No filters found</p>
          <p className="text-xs text-[var(--page-text-faint)]">Try a different search term or category</p>
        </div>
      )}
    </section>
  );
};

export default FilterExplorer;
