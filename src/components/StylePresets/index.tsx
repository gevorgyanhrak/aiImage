import { Link } from 'react-router';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESETS = [
  // Visual effects
  { label: 'Neon Glow', href: '/ai-effects/neon-glow', color: 'from-pink-500 to-purple-600' },
  { label: 'Oil Painting', href: '/ai-effects/oil-painting', color: 'from-amber-600 to-orange-700' },
  { label: 'Watercolor', href: '/ai-effects/watercolor', color: 'from-cyan-500 to-blue-500' },
  { label: 'Sketch', href: '/ai-effects/sketch-effect', color: 'from-gray-400 to-gray-600' },
  { label: 'Cartoon', href: '/ai-effects/cartoon-filter', color: 'from-yellow-400 to-orange-500' },
  { label: 'Pop Art', href: '/ai-effects/pop-art', color: 'from-red-500 to-pink-500' },
  { label: 'Vintage Film', href: '/ai-effects/vintage-look', color: 'from-amber-700 to-yellow-900' },
  { label: 'Pixel Art', href: '/ai-effects/pixel-art', color: 'from-green-500 to-emerald-600' },
  { label: 'Glitch', href: '/ai-effects/glitch-art', color: 'from-violet-500 to-fuchsia-600' },
  { label: 'Low Poly', href: '/ai-effects/low-poly', color: 'from-teal-500 to-cyan-600' },
  { label: 'Double Exposure', href: '/ai-effects/double-exposure', color: 'from-indigo-500 to-blue-700' },
  { label: 'Stained Glass', href: '/ai-effects/stained-glass', color: 'from-rose-500 to-amber-500' },
  { label: 'Mosaic', href: '/ai-effects/mosaic-tiles', color: 'from-orange-500 to-red-600' },
  { label: 'Infrared', href: '/ai-effects/infrared-vision', color: 'from-red-600 to-rose-800' },
  { label: 'Bokeh Magic', href: '/ai-effects/bokeh-magic', color: 'from-purple-400 to-pink-500' },
  // Photo editing
  { label: 'HDR Boost', href: '/photo-editor/hdr-boost', color: 'from-sky-500 to-blue-600' },
  { label: 'Color Grading', href: '/photo-editor/color-grading', color: 'from-teal-600 to-emerald-700' },
  { label: 'Auto Retouch', href: '/photo-editor/auto-retouch', color: 'from-pink-400 to-rose-500' },
  { label: 'Sky Replace', href: '/photo-editor/sky-replacement', color: 'from-blue-400 to-indigo-600' },
  { label: 'Light Leak', href: '/photo-editor/light-leak', color: 'from-amber-400 to-orange-500' },
  { label: 'Lens Blur', href: '/photo-editor/lens-blur', color: 'from-slate-400 to-gray-600' },
  { label: 'Selective Color', href: '/photo-editor/selective-color', color: 'from-red-500 to-gray-500' },
  // AI generate
  { label: 'Text to Image', href: '/ai-generate/text-to-image', color: 'from-violet-500 to-purple-600' },
  { label: 'Logo Creator', href: '/ai-generate/logo-creator', color: 'from-emerald-500 to-teal-600' },
  { label: 'Pattern Gen', href: '/ai-generate/pattern-generator', color: 'from-fuchsia-500 to-pink-600' },
  { label: 'Outpainting', href: '/ai-generate/outpainting', color: 'from-blue-500 to-cyan-500' },
];

const StylePresets = () => {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/10">
          <Palette className="h-4.5 w-4.5 text-fuchsia-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--page-text)]">Quick Style Presets</h2>
          <p className="text-xs text-[var(--page-text-muted)]">One-click styles — pick a preset and start creating</p>
        </div>
      </div>

      {/* Flowing preset tags */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Link
            key={preset.label}
            to={preset.href}
            className={cn(
              'group relative px-4 py-2 rounded-xl text-sm font-medium text-[var(--page-text)] border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--surface-border-strong)] transition-all duration-200 overflow-hidden',
            )}
          >
            {/* Gradient hover fill */}
            <span className={cn(
              'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200',
              preset.color,
            )} />
            {/* Dot indicator */}
            <span className="relative flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full bg-gradient-to-r shrink-0', preset.color)} />
              {preset.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StylePresets;
