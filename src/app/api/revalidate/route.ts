import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-revalidate-secret');
    if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const json = await req.json();
    const { tag, path } = json;
    if (!tag && !path) {
      return new Response(JSON.stringify({ ok: false, error: 'Either tag or path must be provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (tag) {
      console.log('revalidating tag:', tag);
      revalidateTag(tag, 'max');
      if (tag.startsWith('hub-')) {
        console.log('revalidating path: /');
        revalidatePath(`/`);
      }
    }
    if (path) {
      console.log('revalidating path:', path);
      revalidatePath(path);
    }

    return new Response(JSON.stringify({ ok: true, tag }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: unknown) {
    return new Response(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : 'Unknown error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
