import type { MediaType } from '@/types/media';

export interface IPreviewState {
  preview: Record<string, IPreviewImage>;
  textItems: Record<string, string>;
  resultUrl: string | null;
  isGenerating: boolean;

  setPreview: ({ id, mediaUrl, sourceUrl, type }: IPreviewImage) => void;
  clearPreview: ({ id }: { id: string }) => void;
  clearAll: () => void;

  getPreviewSource: ({ id }: { id: string }) => string | null;
  getPreviewMedia: ({ id }: { id: string }) => string | null;
  getPreviewsByIds: ({ ids }: { ids: string[] }) => IPreviewImage[];
  setTextItem: ({ key, value }: { key: string; value: string }) => void;
  setResultUrl: (url: string | null) => void;
  setIsGenerating: (value: boolean) => void;
}

export interface IPreviewImage {
  id: string;
  mediaUrl: string | null;
  sourceUrl: string | null;
  type: MediaType;
  width?: number;
  height?: number;
}
