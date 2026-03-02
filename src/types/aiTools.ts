export enum AiVideoGenToolId {
  // runway
  AiVideoGenRunway_10s = 'ai_video_generator_runway_10s',
  AiVideoGenRunway_5s = 'ai_video_generator_runway_5s',

  // Luma
  AiVideoGenLuma_10s = 'ai_video_generator_luma_ray2_10s',
  AiVideoGenLuma_5s = 'ai_video_generator_luma_ray2_5s',

  // Veo 2
  AiVideoGenVeo2_10s = 'ai_video_generator_veo2_10s',
  AiVideoGenVeo2_5s = 'ai_video_generator_veo2_5s',

  // Veo 3
  AiVideoGenVeo3_4s = 'ai_video_generator_veo3_4s',
  AiVideoGenVeo3_6s = 'ai_video_generator_veo3_6s',
  AiVideoGenVeo3_8s = 'ai_video_generator_veo3_8s',
  AiVideoGenVeo3_No_Audio_4s = 'ai_video_generator_veo3_no_audio_4s',
  AiVideoGenVeo3_No_Audio_6s = 'ai_video_generator_veo3_no_audio_6s',
  AiVideoGenVeo3_No_Audio_8s = 'ai_video_generator_veo3_no_audio_8s',
  AiVideoGenVeo3_Fast_4s = 'ai_video_generator_veo3_fast_4s',
  AiVideoGenVeo3_Fast_6s = 'ai_video_generator_veo3_fast_6s',
  AiVideoGenVeo3_Fast_8s = 'ai_video_generator_veo3_fast_8s',
  AiVideoGenVeo3_Fast_No_Audio_4s = 'ai_video_generator_veo3_fast_no_audio_4s',
  AiVideoGenVeo3_Fast_No_Audio_6s = 'ai_video_generator_veo3_fast_no_audio_6s',
  AiVideoGenVeo3_Fast_No_Audio_8s = 'ai_video_generator_veo3_fast_no_audio_8s',

  // Pika
  AiVideoGenPika_10s = 'ai_video_generator_pika_10s',
  AiVideoGenPika_5s = 'ai_video_generator_pika_5s',
}

export enum VideoProvider {
  Runway = 'runway',
  Luma = 'luma',
  Veo2 = 'veo2',
  Veo3_1 = 'veo3_1',
  Veo3_1_No_Audio = 'veo3_1_no_audio',
  Veo3_1_Fast = 'veo3_1_fast',
  Veo3_1_Fast_No_Audio = 'veo3_1_fast_no_audio',
  Pika = 'pika',
}

// ToolId used for monetization
export type ToolId = AiVideoGenToolId;

export interface ToolModel {
  id: VideoProvider;
  getToolId: (durationSeconds: number) => ToolId;
}
