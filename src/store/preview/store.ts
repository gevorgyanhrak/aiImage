import type { StateCreator } from 'zustand';
import type { IPreviewImage, IPreviewState } from './types';

const usePreviewStore: StateCreator<IPreviewState> = (set, get) => ({
  preview: {},
  textItems: {},

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
  clearAll: () => set(() => ({ preview: {}, textItems: {} })),

  getPreviewSource: ({ id }: { id: string }) => get().preview[id]?.sourceUrl ?? null,
  getPreviewMedia: ({ id }: { id: string }) => get().preview[id]?.mediaUrl ?? null,
  getPreviewsByIds: ({ ids }: { ids: string[] }) => ids.map(id => get().preview[id]).filter(Boolean) as IPreviewImage[],
  setTextItem: ({ key, value }: { key: string; value: string }) => set(state => ({ textItems: { ...state.textItems, [key]: value } })),
});

export default usePreviewStore;
