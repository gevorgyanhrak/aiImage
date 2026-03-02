# Repository Architecture

## System Overview
This project is a Next.js 16 App Router application that renders marketing "hub" and "landing" experiences backed by Strapi. All pages default to React Server Components, while interactive widgets opt into the client runtime with the `"use client"` directive. The runtime is parameterized through `APP_ENV` and other `NEXT_PUBLIC_*` variables defined in `env/`, and pnpm scripts (see `package.json`) orchestrate builds with Turbopack, linting, and type checks.

## Architecture Diagram
```
 Visitor Browser
        |
        v  HTTPS
  Vercel Edge (Cache-Control: no-store)
        |
        v
  Next.js App Router (App Dir)
        | \
        |  \__ Static assets & media --> public/ + CDN uploads
        |
        v  strapiFetch + CF Access headers
      Strapi API
        |
        | CMS publish events
        v
   Redis Pub/Sub (gen-ai:events)
        |
        v
 Cache Revalidator Service
        |
        v  POST /api/revalidate (x-revalidate-secret)
 Next.js Revalidation API
        |
        v  revalidateTag hub-*/landing-*
  Next.js App Router (data cache refresh)
```

## Directory Topology
- `src/app/` holds route groups: `page.tsx` serves the hub home, and `[id]/page.tsx` resolves dynamic landings.
- `src/components/` contains leaf UI, grouped by domain (e.g., `PresetEditor`, `Media`, `Tabs`). Client-only wrappers such as `GlobalHooksWrapper` live here.
- `src/componentMaps/` translates Strapi component types into React implementations (`componentMaps/hub.ts`).
- `src/lib/` contains integration helpers (`strapi.ts`, Redis drivers, shared utils) and sub-folders for each upstream (`lib/strapi`, `lib/redis`).
- `src/services/cacheRevalidator/` packages the Redis-driven ISR invalidation loop.
- `src/store/` exposes Zustand-based global state; `resetStore.ts` helps hydrate or clear client stores.
- Static artifacts land in `public/`, data contracts in `src/types/`, and CDN/middleware helpers in `src/proxy.ts`.

## Request & Data Flow
1. **Hub ( `/` )** — `src/app/page.tsx` calls `getHubByDocumentId` (`lib/strapi/hubs`) to fetch a document id-specified entry. Sections are rendered by iterating `components` and instantiating each mapped component via `componentMaps/hub`.
2. **Landing ( `/[id]` )** — `src/app/[id]/page.tsx` invokes `getLandingBySlug`, constructs SEO objects, configures breadcrumb metadata, and drives upload widgets plus preset previews.
3. **Strapi Access** — `strapiFetch` centralizes HTTP concerns: Cloudflare Access headers (`constants/headers.ts`), bearer token injection, cache hints, and tag propagation into the Next.js data cache. Media links are normalized through `mediaUrl`.

## Rendering & Client Code
Server components prepare SEO metadata via utilities like `createSEOMetaData` and embed schema.org payloads using `PageJsonLinkedData`. Client components (Tabs, Media viewers, upload widgets) are isolated, import `TEST_IDS` for e2e targeting, and share styles through `app/globals.css` plus Tailwind tokens. State that must persist across widgets (e.g., preset previews) flows through the Zustand store (`src/store/store.ts`); `GlobalHooksWrapper` simply clears preview state on mount and enforces scroll restoration between route changes.

## Content & Component Mapping
Strapi entries ship component-type markers (see `types/strapiComponent.ts`). The `componentMaps` layer resolves those markers to React modules, letting content editors rearrange sections without code changes. Each section component accepts Strapi-shaped props along with rendering hints such as `priority` for media preloading. This model makes the homepage fully data-driven and lets new section types onboard by adding a React module and updating the map.

## Caching & Invalidation Path
- **Edge headers** — `src/proxy.ts` contains the middleware logic that would emit CDN cache headers and attach cache tags (`hub-{documentId}`, `landing-{slug}`) when `IS_CACHE_ENABLED` is true, but it is not currently registered as `middleware.ts`. Today, `vercel.json` forces `Cache-Control: no-store`, so requests always bypass CDN caching until that middleware is wired up.
- **Redis bootstrap** — `src/instrumentation.ts` runs at server start, initializing the singleton Redis layer (`lib/redis/redis.ts`) plus the cache revalidator service whenever caching is enabled.
- **Cache revalidator** — `services/cacheRevalidator/cacheRevalidator.ts` subscribes to Redis pub/sub messages. Published events (validated via Zod) trigger axios calls to `/api/revalidate`, enabling on-demand ISR invalidation per tag.
- **Graceful degradation** — Initialization failures log and allow the app to boot without caching, ensuring developer machines can run without Redis.

## Critical Operations & Health Endpoints
- **Revalidation API** — `src/app/api/revalidate/route.ts` is protected by the `x-revalidate-secret` header and `NEXT_REVALIDATE_SECRET`. Only Redis-triggered events or trusted operators should hit this path, because it fans out to `revalidateTag` and `revalidatePath`, and automatically refreshes `/` when a `hub-*` tag is passed.
- **Internal base URL** — Cache revalidation requests default to `INTERNAL_BASE_URL` (`http://127.0.0.1:3000` during local runs). Update this env var when deploying behind load balancers so the service can reach the running Next instance.
- **Health probes** — `/api/liveness`, `/api/readiness`, and `/api/health` supply Kubernetes-ready probes. Keep these endpoints lean (no DB calls unless needed) so orchestration controllers can accurately detect failures without tripping rate limits.
- **Cache flag** — `NEXT_PUBLIC_CACHE_ENABLED` toggles the entire caching+Redis subsystem. Production should set it to `true`; local development can safely disable it to avoid Redis dependencies.

## SEO, Analytics & Schema
Structured metadata is generated centrally: `PageJsonLinkedData` composes breadcrumb, video, how-to, and software-application schemas, while `JSONLinkedData` and `GoogleAnalytics` components inject tracking snippets. Canonical URLs rely on `createPageUrl`, and defaults such as `defaultHowToSteps` and `BREADCRUMB_BASE_SEGMENT` keep marketing content consistent with search guidelines.

## External Integrations & Security
- **Cloudflare Access** guards Strapi APIs via the `CF-Access-Client-*` headers derived from `constants/globals.ts`.
- **Uploads** go through `UPLOAD_BASE_URL`, allowing client components (e.g., `UploadArea`) to hit upload endpoints directly from the browser.
- **Redis** credentials are drawn from `REDIS_GENAI_PUBSUB_SENTINEL_URI`, which supports direct or Sentinel clusters; optional channels configure which publishing topics trigger revalidation (`lib/redis/constants`).
- **Secrets management** depends on environment-layer `.env*` files, mirrored for multiple deployment targets (development, preproduction, production).

## Extensibility Guidelines
- To add a new Strapi-driven section, extend `StrapiComponent`, build a server-friendly React component in `src/components`, export it via `componentMaps`, and document its schema in `src/types`.
- To integrate another CMS event, add a case to `CacheRevalidator.handleEvent`, emit a semantic tag, and ensure your route opts into `fetch` caching via `strapiFetch({ tags: [...] })`.
- Client features that need shared state should expose a dedicated slice under `src/store/` and wire it into `useAppStore` using the equality-aware combiner already in place.
