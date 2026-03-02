export enum ImagePassingMode {
  ORIGINAL_START_MODIFIED_END = 'original_start_modified_end',
  MODIFIED_START_ONLY = 'modified_start_only',
  MODIFIED_START_ORIGINAL_END = 'modified_start_original_end',
}

export interface Tutorial {
  videoUrl: string;
  posterUrl: string;
}

export interface PresetImage {
  required: boolean;
}

export interface PresetImages {
  first?: PresetImage;
  last?: PresetImage;
}

export interface ImageTransformationInfo {
  imageGenPrompt: string;
  imageGenModel: string | null;
  aspectRatio?: string;
  duration?: number;
  imagePassingMode?: ImagePassingMode;
}

export interface Preset {
  id: string;
  videoUrl: string;
  posterUrl: string;
  images: PresetImages;
  prompt?: string;
  forcePrompt?: boolean;
  tutorial?: Tutorial;
  imageTransformationInfo?: ImageTransformationInfo;
  allowReverseScript: boolean;
  allowModelSelection: boolean;
  allowVoiceOver: boolean;
  autoGenerate: boolean;
  serviceModel?: string;
  toolId?: string;
}
