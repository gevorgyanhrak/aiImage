import type { SectionItem } from '@/types/sectionItem';
import { MediaType } from '@/types/media';
import type { Transformation } from '@/types/landing';
import type { Preset } from '@/types/preset';
import { getToolId } from './getToolId';

type Params = {
  media: SectionItem;
  transformations: Transformation[];
  prompt: string;
};

const buildPreset = ({ media, transformations, prompt }: Params): Preset | null => {
  if (media.type !== MediaType.VIDEO || !media.video || !transformations?.length) return null;

  const imageTransformation = transformations.find(({ type }) => type === MediaType.IMAGE);
  const videoTransFormation = transformations.find(({ type }) => type === MediaType.VIDEO);
  return {
    id: String(media.id),
    ...(videoTransFormation?.videoModel && { videoModel: videoTransFormation.videoModel }),
    ...(videoTransFormation?.videoModel && { toolId: getToolId({ modelId: videoTransFormation.videoModel, durationSeconds: videoTransFormation?.duration ?? 0 }) }),
    ...(videoTransFormation?.duration && { duration: videoTransFormation.duration }),
    posterUrl: media.media.poster,
    prompt: videoTransFormation?.prompt ?? prompt,
    videoUrl: media.video,
    allowReverseScript: false,
    allowModelSelection: false,
    allowVoiceOver: false,
    autoGenerate: true,
    forcePrompt: imageTransformation?.forcePrompt ?? true,
    tutorial: {
      videoUrl: media.video,
      posterUrl: media.media.poster,
    },
    ...(imageTransformation && {
      imageTransformationInfo: {
        imageGenPrompt: imageTransformation.prompt,
        imageGenModel: imageTransformation?.imageModel,
        imagePassingMode: imageTransformation?.passingMode,
      },
    }),
    images: {
      first: {
        required: true,
      },
    },
  };
};

export default buildPreset;
