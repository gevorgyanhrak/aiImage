import type { MediaType, Media, VideoMedia } from './media';
import type { LandingUploadItem } from './landing';

export interface BaseMedia {
  id: string;
  title: string;
  url: string;
  description: string;
  redirectUrl: string;
  image: string | null;
  video: string | null;
  slug: string;
  media: Media;
}

export interface ImageSectionItem extends BaseMedia {
  type: typeof MediaType.IMAGE;
  blurDataUrl?: string;
}

export interface VideoSectionItem extends Omit<BaseMedia, 'media'> {
  type: typeof MediaType.VIDEO;
  media: VideoMedia;
}

export type SectionItem = ImageSectionItem | VideoSectionItem;

export interface Flow {
  webhookId: string;
  uploadItems: LandingUploadItem[];
}

export type SectionItemWithFlow = SectionItem & { flow: Flow | null };

export interface SliderItem {
  id: number;
  title: string;
  description: string;
  url: string | null;
  slug?: string;
  video: {
    id: number;
    media: VideoMedia;
  };
  media: VideoMedia;
}
