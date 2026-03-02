import type { UploadApiResponse } from '@/utils/types';

type JsonUploadOptions = {
  method?: 'POST' | 'PUT' | 'PATCH';
  signal?: AbortSignal;
};

const postJson = async (_payload: Record<string, unknown>, _options?: JsonUploadOptions): Promise<UploadApiResponse> => {
  return {
    response: {
      url: 'https://picsum.photos/800/600',
      download_url: 'https://picsum.photos/800/600',
    },
  };
};

export default postJson;
