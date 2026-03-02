import type { MediaType } from '@/types/media';
import type { InputItem, PreviewMedia, PreviewsLayout, Project, TextItem } from '@/types/presetGenMiniappContent';

const getPreviewsLayout = (previewMedia: PreviewMedia): PreviewsLayout => {
  return {
    sidebar: {
      header: {
        title: 'AiImage Studio',
        hasCloseIcon: true,
        appIconName: 'IconAiImage',
        previewMedia,
      },
      footer: {
        primaryActionTitle: 'Generate',
      },
    },
  };
};

type Params = {
  category: string;
  resultType: MediaType;
  webhookId: string;
  inputs: (InputItem | TextItem)[];
  previewMedia: PreviewMedia;
};

export const getPresetGenMiniappContent = ({ webhookId, previewMedia, inputs, resultType, category }: Params): Project => ({
  category,
  webhookId,
  resultType,
  inputs,
  drive: {
    toolId: 'gen-ai',
    folderName: 'AiImage',
  },
  layout: getPreviewsLayout(previewMedia),
});
