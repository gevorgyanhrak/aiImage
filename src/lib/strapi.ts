import 'server-only';

import { IS_CACHE_ENABLED, STRAPI_URL, TOKEN } from '@/constants/globals';
import CF_ACCESS_HEADERS from '@/constants/headers';
import nextFetch from '@/tools/nextFetch/nextFetch';

type FetchOptions = {
  path: string;
  query?: Record<string, unknown>; // e.g. { populate: '*', 'filters[slug][$eq]': 'my-post' }
  cache?: RequestCache; // 'no-store' for always-fresh, or default for ISR with next.revalidate
  revalidate?: number | false; // seconds; e.g. 60 enables ISR
  tags?: string[];
};

function toQuery(params?: Record<string, unknown>) {
  if (!params) return '';
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    // Support arrays
    if (Array.isArray(v)) v.forEach(vv => q.append(k, String(vv)));
    else q.append(k, String(v));
  });
  const s = q.toString();
  return s ? `?${s}` : '';
}

export async function strapiFetch<T>({ path, query, cache, revalidate, tags }: FetchOptions): Promise<T> {
  const url = `${STRAPI_URL}${path}${toQuery(query)}`;
  const headers: HeadersInit = { 'Content-Type': 'application/json', ...CF_ACCESS_HEADERS };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  console.log('url', url);

  const cacheValue = IS_CACHE_ENABLED ? (cache ?? (tags ? 'force-cache' : 'no-store')) : 'no-store';
  const next = IS_CACHE_ENABLED
    ? {
        ...(tags ? { tags } : {}),
        ...(revalidate ? { revalidate } : {}),
      }
    : undefined;

  const res = await nextFetch(url, {
    headers,
    cache: cacheValue,
    next,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Strapi ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// Helper: Strapi serves media with relative URLs sometimes
export function mediaUrl(url?: string) {
  if (!url) return '';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}
