# Repository Guidelines

## Architecture Reference

Read `docs/architecture.md` for a system-level map covering routing, Strapi integration, caching, and health probes before making cross-cutting changes.

## Project Structure & Module Organization

This is a Next.js App Router workspace. `src/app` owns route groups and server actions, `src/components` houses reusable UI, and shared logic belongs in `src/lib`, `src/utils`, and `src/constants`. Data-fetching or API wrappers live in `src/services` and `proxy.ts`, while state managers stay in `src/store` and `src/hooks`. Keep schemas and shared contracts in `src/types`. Static assets live in `public/` and `src/fonts`, infrastructure charts stay in `charts/`, and sanitized environment examples belong in `env/`.

## Build, Test, and Development Commands

- `pnpm install` — sync dependencies captured in `pnpm-lock.yaml`.
- `pnpm dev` — launch the Turbopack dev server with `APP_ENV=development` on port 3000.
- `pnpm build` / `pnpm build:production` — compile preview or production bundles; set `APP_ENV` before running.
- `pnpm start:production` — serve the previously built output under production config.
- `pnpm lint` or `pnpm check:lint[-fix]` — run ESLint (auto-fix when the suffix is used).
- `pnpm check:ts` / `pnpm type-check` — enforce strict TypeScript coverage before you push.

## Coding Style & Naming Conventions

Write modern TypeScript, prefer server components by default, and gate browser-only code with `"use client"`. Prettier formatting (2-space indent, double quotes in JSX, trailing commas) is enforced through ESLint, so run `pnpm lint:fix` before committing. Export React components, hooks, and stores with PascalCase filenames; helpers, utilities, and config modules use camelCase. Colocate CSS or Tailwind variants with the component they style.

## Testing Guidelines

Component and hook coverage should rely on React Testing Library plus Vitest (add spec files as `*.test.tsx` next to the source). Critical user flows should be validated through Playwright e2e scripts inside `tests/e2e`, runnable via `pnpm playwright test`. Always run `pnpm check:lint` and `pnpm check:ts` alongside your unit/e2e suite, and block merges until failures are resolved.

## Commit & Pull Request Guidelines

- Use Conventional Commits (e.g., `feat(ui): add chat sidebar`) and cite tickets with `Refs:`.
- PR description should cover what changed, validation run (dev server, build, lint, type-check, tests), and any schema/env updates.
- Include screenshots or short videos for UI changes; highlight risk areas or rollout notes when relevant.
- Request review from a domain owner, keep CI green, and squash-merge after approvals.
