import type { ToolId, ToolModel } from '@/types/aiTools';
import { AiVideoGenToolId, VideoProvider } from '@/types/aiTools';

type Params = {
  modelId: VideoProvider;
  durationSeconds: number;
};

const DURATION_THRESHOLD_SECONDS = 5;

const runway: ToolModel = {
  id: VideoProvider.Runway,
  getToolId: durationSeconds => (durationSeconds > DURATION_THRESHOLD_SECONDS ? AiVideoGenToolId.AiVideoGenRunway_10s : AiVideoGenToolId.AiVideoGenRunway_5s),
};

const luma: ToolModel = {
  id: VideoProvider.Luma,
  getToolId: durationSeconds => (durationSeconds > DURATION_THRESHOLD_SECONDS ? AiVideoGenToolId.AiVideoGenLuma_10s : AiVideoGenToolId.AiVideoGenLuma_5s),
};

const veo2: ToolModel = {
  id: VideoProvider.Veo2,
  getToolId: durationSeconds => (durationSeconds > DURATION_THRESHOLD_SECONDS ? AiVideoGenToolId.AiVideoGenVeo2_10s : AiVideoGenToolId.AiVideoGenVeo2_5s),
};

const veo3_1: ToolModel = {
  id: VideoProvider.Veo3_1,
  getToolId: durationSeconds => (durationSeconds === 4 ? AiVideoGenToolId.AiVideoGenVeo3_4s : durationSeconds === 6 ? AiVideoGenToolId.AiVideoGenVeo3_6s : AiVideoGenToolId.AiVideoGenVeo3_8s),
};

const veo3_1_no_audio: ToolModel = {
  id: VideoProvider.Veo3_1_No_Audio,
  getToolId: durationSeconds =>
    durationSeconds === 4 ? AiVideoGenToolId.AiVideoGenVeo3_No_Audio_4s : durationSeconds === 6 ? AiVideoGenToolId.AiVideoGenVeo3_No_Audio_6s : AiVideoGenToolId.AiVideoGenVeo3_No_Audio_8s,
};

const veo3_1_fast: ToolModel = {
  id: VideoProvider.Veo3_1_Fast,
  getToolId: durationSeconds =>
    durationSeconds === 4 ? AiVideoGenToolId.AiVideoGenVeo3_Fast_4s : durationSeconds === 6 ? AiVideoGenToolId.AiVideoGenVeo3_Fast_6s : AiVideoGenToolId.AiVideoGenVeo3_Fast_8s,
};

const veo3_1_fast_no_audio: ToolModel = {
  id: VideoProvider.Veo3_1_Fast_No_Audio,
  getToolId: durationSeconds =>
    durationSeconds === 4
      ? AiVideoGenToolId.AiVideoGenVeo3_Fast_No_Audio_4s
      : durationSeconds === 6
        ? AiVideoGenToolId.AiVideoGenVeo3_Fast_No_Audio_6s
        : AiVideoGenToolId.AiVideoGenVeo3_Fast_No_Audio_8s,
};

const pika: ToolModel = {
  id: VideoProvider.Pika,
  getToolId: durationSeconds => (durationSeconds > DURATION_THRESHOLD_SECONDS ? AiVideoGenToolId.AiVideoGenPika_10s : AiVideoGenToolId.AiVideoGenPika_5s),
};

const MODELS: Record<string, ToolModel> = {
  runway,
  luma,
  veo2,
  veo3_1,
  veo3_1_no_audio,
  veo3_1_fast,
  veo3_1_fast_no_audio,
  pika,
};

export const getToolId = ({ modelId, durationSeconds }: Params): ToolId => {
  const model = MODELS[modelId];
  if (!model) {
    throw new Error(`Unknown model id: ${modelId}`);
  }
  return model.getToolId(durationSeconds);
};

export const TOOL_MODELS = MODELS;
