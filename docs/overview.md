# User Journey Overview

## Landing on gen.ai
- Visitors arrive at `https://gen.ai/` and are greeted by a full-screen layout rendered from Strapi “hub” content.
- The header shows the current hub name and SEO metadata comes preloaded, so social shares immediately display titles and summaries.
- Tabs across the top map to Strapi-defined sections (grids, sliders). Switching tabs scrolls to the relevant section without triggering a full navigation.

## Browsing Sections
- Each section highlights curated presets with large cover art optimized for the first viewport (above-the-fold media is marked `priority`).
- When a card is clicked, the user is routed to `/<preset-slug>` where the specific landing page is rendered.
- Infinite-scroll style layouts (e.g., `SectionGrid`) honor responsive breakpoints so cards reflow cleanly on phones, tablets, and desktop monitors.
- Video cards use the shared `Media` component which now accepts a `playbackMode` prop (`PlaybackMode.Instant` vs `PlaybackMode.Scheduled`). This determines whether `useVideoAutoplay` plays immediately when the card intersects the viewport or after the scheduled delay, so pick the faster mode only for above-the-fold hero media to avoid noisy autoplay elsewhere.
- `LazyVideo` optimizes resource usage by listening for the `onLoadedData` event; once the video frame is ready, the poster image is removed from the DOM to prevent visual overlap and reduce node count.
- `SectionGrid` also exposes `playbackMode`, allowing granular control over autoplay behavior per section (defaulting to `Scheduled` for better performance).

## Preset Detail Pages
- The landing page (`/[id]`) starts with breadcrumb navigation, then a hero block explaining the preset and any usage tips.
- Media preview shows either a video loop or an image slider; posters and thumbnails are served via Strapi media URLs.
- Upload panels let users drag-and-drop assets matching the preset requirements (extensions and multiple slots are read from Strapi). Each slot syncs with the global Zustand store so previews update instantly.
- A context-aware footer (`PreviewFooter`) surfaces the main CTA button—either redirecting or triggering generation—and repeats the recommended prompt for quick copy/paste.

## Related Content & Trust Elements
- Below the fold, `SimilarPresets` fetches recommended entries using the current preset’s `documentId`, encouraging further exploration.
- Terms notices, schema.org How-To data, and JSON-LD payloads are embedded to improve transparency and search visibility.

## Performance & Feedback
- `vercel.json` currently sets `Cache-Control: no-store`, so every visit renders fresh content from Next.js until `src/proxy.ts` is promoted to middleware and CDN caching is explicitly enabled.
- When caching is turned on, Redis-published events trigger `/api/revalidate` so hub and landing tags can be invalidated without full redeploys.
- Health endpoints (`/api/health`, `/api/liveness`, `/api/readiness`) keep uptime monitors informed, ensuring the marketing surface remains reliable for users.
