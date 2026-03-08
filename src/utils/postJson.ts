import { GoogleGenAI } from '@google/genai';
import type { UploadApiResponse } from '@/utils/types';

type JsonUploadOptions = {
  method?: 'POST' | 'PUT' | 'PATCH';
  signal?: AbortSignal;
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
function getClient() {
  if (!ai) {
    if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not set');
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

/** Convert base64 image data to a blob URL for display. */
function base64ToBlobUrl(base64: string, mimeType: string): string {
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }
  const blob = new Blob([arr], { type: mimeType });
  return URL.createObjectURL(blob);
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const MAX_RETRIES = 3;

/** Call Gemini with retry on 429 rate-limit errors. */
async function callWithRetry(
  client: GoogleGenAI,
  contents: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>,
): Promise<UploadApiResponse> {
  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents,
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData?.data && part.inlineData?.mimeType?.startsWith('image/')) {
            const url = base64ToBlobUrl(part.inlineData.data, part.inlineData.mimeType);
            return { response: { url, download_url: url } };
          }
        }
      }

      throw new Error('No image was generated. Try a different prompt.');
    } catch (err: unknown) {
      lastError = err;
      const is429 =
        err instanceof Error &&
        (err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED') || err.message.includes('Too Many Requests'));

      if (is429 && attempt < MAX_RETRIES - 1) {
        const backoff = (attempt + 1) * 5000; // 5s, 10s, 15s
        console.warn(`[Gemini] Rate limited, retrying in ${backoff / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})...`);
        await delay(backoff);
        continue;
      }

      throw lastError;
    }
  }

  throw lastError;
}

/**
 * Generate an AI image using Google Gemini.
 * Retries on 429 rate-limit errors with exponential backoff.
 */
const postJson = async (payload: Record<string, unknown>, _options?: JsonUploadOptions): Promise<UploadApiResponse> => {
  const client = getClient();
  const prompt = (payload.prompt as string) || 'Generate a creative artwork';

  const contents: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
    { text: prompt },
  ];

  // If a source image was uploaded, include it in the request
  const media = payload.media as Array<{ sourceUrl: string; type: string }> | undefined;
  if (media?.[0]?.sourceUrl) {
    try {
      const imgRes = await fetch(media[0].sourceUrl);
      const imgBlob = await imgRes.blob();
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imgBlob);
      });
      contents.unshift({
        inlineData: {
          mimeType: imgBlob.type || 'image/jpeg',
          data: base64,
        },
      });
    } catch {
      // If image fetch fails, proceed with text-only prompt
    }
  }

  return callWithRetry(client, contents);
};

export default postJson;
