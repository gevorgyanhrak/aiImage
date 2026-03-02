import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IS_CACHE_ENABLED } from '@/constants/globals';

export default function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const tags: string[] = [];
  if (url.pathname === '/') {
    tags.push(`hub-${process.env.NEXT_PUBLIC_HUB_DOCUMENT_ID}`);
  }

  const pathname = url.pathname.replace(/\/$/, '');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 1) {
    const category = segments[0];
    tags.push('category');
    tags.push(`category-${category}`);
  }

  if (segments.length === 2) {
    const slug = segments[1];
    tags.push('landing');
    tags.push(`landing-${slug}`);
  }

  // console.log('tags', tags);

  const res = NextResponse.next();

  if (IS_CACHE_ENABLED) {
    if (tags.length) res.headers.set('Cache-Tag', tags.join(','));
    res.headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
    res.headers.set('Cache-Control', 'public, s-maxage=31536000, max-age=0, must-revalidate');
  } else {
    res.headers.set('CDN-Cache-Control', 'no-store, max-age=0');
    res.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
