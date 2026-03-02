import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export type UploadProgressHandler = (percent: number) => void;

type BaseUploadOptions = {
  signal?: AbortSignal;
  onProgress?: UploadProgressHandler;
  axios?: AxiosRequestConfig;
};

export async function uploadFormData<T>(url: string, form: FormData, options?: BaseUploadOptions): Promise<T> {
  const { signal, onProgress, axios: axiosConfig } = options ?? {};
  const res = await axios.request<T>({
    url,
    method: 'POST',
    data: form,
    signal,
    onUploadProgress: e => {
      if (!onProgress || !e.total) return;
      const percent = Math.round((e.loaded / e.total) * 100);
      onProgress(percent);
    },
    ...axiosConfig,
    withCredentials: false,
  });
  return res.data;
}

export async function blobFromUrl(url: string, signal?: AbortSignal): Promise<Blob> {
  const response = await fetch(url, { signal });
  return response.blob();
}
