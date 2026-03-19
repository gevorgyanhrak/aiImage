import type { UploadApiResponse } from '@/utils/types';

type JsonUploadOptions = {
  method?: 'POST' | 'PUT' | 'PATCH';
  signal?: AbortSignal;
};

declare const puter: {
  ai: {
    txt2img: (prompt: string, options?: { model?: string }) => Promise<HTMLImageElement>;
  };
};

/**
 * Generate an AI image using Puter.js — completely free, no API key required.
 */
const postJson = async (payload: Record<string, unknown>, _options?: JsonUploadOptions): Promise<UploadApiResponse> => {
  const prompt = (payload.prompt as string) || 'Generate a creative artwork';

  if (typeof puter === 'undefined') {
    throw new Error('Puter.js not loaded. Check your internet connection.');
  }

  const imgElement = await puter.ai.txt2img(prompt);

  if (!imgElement.src) {
    throw new Error('Image generation returned no result');
  }

  const url = imgElement.src;
  return { response: { url, download_url: url } };
};

export default postJson;
