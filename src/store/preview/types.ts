import type { MediaType } from '@/types/media';

export interface IPreviewState {
  preview: Record<string, IPreviewImage>;
  textItems: Record<string, string>;

  setPreview: ({ id, mediaUrl, sourceUrl, type }: IPreviewImage) => void;
  clearPreview: ({ id }: { id: string }) => void;
  clearAll: () => void;

  getPreviewSource: ({ id }: { id: string }) => string | null;
  getPreviewMedia: ({ id }: { id: string }) => string | null;
  getPreviewsByIds: ({ ids }: { ids: string[] }) => IPreviewImage[];
  setTextItem: ({ key, value }: { key: string; value: string }) => void;
}

export interface IPreviewImage {
  id: string;
  mediaUrl: string | null;
  sourceUrl: string | null;
  type: MediaType;
  width?: number;
  height?: number;
}
