import puter from '@heyputer/puter.js';
import type { UploadApiResponse } from '@/utils/types';

type JsonUploadOptions = {
  method?: 'POST' | 'PUT' | 'PATCH';
  signal?: AbortSignal;
};

/** Convert a blob URL to a base64 data string. */
async function blobUrlToBase64(blobUrl: string): Promise<{ base64: string; mimeType: string }> {
  const res = await fetch(blobUrl);
  const blob = await res.blob();
  const mimeType = blob.type || 'image/jpeg';

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve({ base64: result.split(',')[1], mimeType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Generate an AI image using Puter.js (free, no API key, no CORS issues).
 * Supports text-to-image and image-to-image (with source image + prompt).
 */
const postJson = async (payload: Record<string, unknown>, _options?: JsonUploadOptions): Promise<UploadApiResponse> => {
  const prompt = (payload.prompt as string) || 'Generate a creative artwork';

  const media = payload.media as Array<{ sourceUrl: string; type: string }> | undefined;
  const sourceUrl = media?.[0]?.sourceUrl;

  if (sourceUrl) {
    const { base64, mimeType } = await blobUrlToBase64(sourceUrl);
    const image = await puter.ai.txt2img({
      prompt,
      input_image: base64,
      input_image_mime_type: mimeType,
    });
    const url = image.src;
    return { response: { url, download_url: url } };
  }

  const image = await puter.ai.txt2img(prompt);
  const url = image.src;
  return { response: { url, download_url: url } };
};

export default postJson;
