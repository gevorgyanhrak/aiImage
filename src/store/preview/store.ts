import type { StateCreator } from 'zustand';
import type { IPreviewImage, IPreviewState } from './types';

const usePreviewStore: StateCreator<IPreviewState> = (set, get) => ({
  preview: {},
  textItems: {},
  resultUrl: null,
  isGenerating: false,

  setPreview: ({ id, mediaUrl, sourceUrl, type, width, height }: IPreviewImage) =>
    set(state => ({
      preview: { ...state.preview, [id]: { id, mediaUrl, sourceUrl, type, width, height } },
    })),
  clearPreview: ({ id }: { id: string }) =>
    set(state => {
      const nextPreview = { ...state.preview };
      delete nextPreview[id];
      return { preview: nextPreview };
    }),
  clearAll: () => set(() => ({ preview: {}, textItems: {}, resultUrl: null, isGenerating: false })),

  getPreviewSource: ({ id }: { id: string }) => get().preview[id]?.sourceUrl ?? null,
  getPreviewMedia: ({ id }: { id: string }) => get().preview[id]?.mediaUrl ?? null,
  getPreviewsByIds: ({ ids }: { ids: string[] }) => ids.map(id => get().preview[id]).filter(Boolean) as IPreviewImage[],
  setTextItem: ({ key, value }: { key: string; value: string }) => set(state => ({ textItems: { ...state.textItems, [key]: value } })),
  setResultUrl: (url: string | null) => set({ resultUrl: url }),
  setIsGenerating: (value: boolean) => set({ isGenerating: value }),
});

export default usePreviewStore;
