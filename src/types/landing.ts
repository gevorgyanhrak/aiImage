import type { VideoProvider } from './aiTools';
import type { VideoMedia } from './media';
import type { MediaType } from './media';
import type { SeoSettings } from './seoSettings';
import type { StrapiMeta } from './strapi';
import type { ImagePassingMode } from './preset';
import type { Tag } from './tag';

export enum LandingType {
  FLOW = 'flow',
  BASIC = 'basic',
  NONE = 'none',
}

export type StrapiImageFormatVariant = {
  ext: string;
  mime: string;
  name: string;
  url: string;
  width: number;
  height: number;
};

export type StrapiImageFormats = {
  large?: StrapiImageFormatVariant;
  medium?: StrapiImageFormatVariant;
  small?: StrapiImageFormatVariant;
  thumbnail?: StrapiImageFormatVariant;
};

export type StrapiMediaAsset = {
  id: number;
  name: string;
  alternativeText: string | null;
  ext: string;
  mime: string;
  url: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
};

export type LandingImage = {
  id: number;
  alt: string;
  media: StrapiMediaAsset;
};

export type LandingVideo = {
  id: number;
  media: VideoMedia;
};

export type LandingUploadItem = {
  id: number;
  type: MediaType;
  title: string;
  extensions: string[];
};

export type LandingButton = {
  id: number;
  title: string;
  ariaLabel: string;
  icon: string | null;
};

export type Transformation = {
  id: number;
  duration: number | null;
  imageModel: string | null;
  passingMode: ImagePassingMode;
  forcePrompt?: boolean;
  prompt: string;
  type: MediaType;
  videoModel: VideoProvider | null;
  videoToolId: string | null;
};

export type Landing = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
  title: string;
  slug: string;
  description: string;
  type: MediaType;
  prompt: string;
  redirectionUrl: string;
  image: LandingImage[];
  video: LandingVideo[];
  tags: Tag[];
  uploadItems: LandingUploadItem[];
  textItems: LandingTextItem[];
  button: LandingButton | null;
  transformations?: Transformation[];
  flowId?: string;
  landingType: LandingType;
  seoSettings: SeoSettings;
};

export type LandingApiResponse = {
  data: Landing;
  meta: StrapiMeta;
};

export type LandingTextItem = {
  type: string;
  id: string;
};
