import type { BreadcrumbList, HowTo, HowToStep, SoftwareApplication, VideoObject, WebSite } from 'schema-dts';
import type { SeoSettings } from './seoSettings';
import type { BreadcrumbListSegment } from './breadcrumb';

export enum SchemaType {
  HowTo = 'HowTo',
  WebSite = 'WebSite',
  VideoObject = 'VideoObject',
  BreadcrumbList = 'BreadcrumbList',
  SoftwareApplication = 'SoftwareApplication',
}

export type SchemaJson = SoftwareApplication | VideoObject | HowTo | BreadcrumbList | WebSite;

export type SchemaParams =
  | { type: SchemaType.HowTo; payload: HowTo }
  | { type: SchemaType.WebSite; payload: WebSite }
  | { type: SchemaType.VideoObject; payload: VideoObject }
  | { type: SchemaType.BreadcrumbList; payload: BreadcrumbList }
  | { type: SchemaType.SoftwareApplication; payload: SoftwareApplication };

export type VideoObjectPayload = {
  name: string;
  thumbnailUrl: string;
  description: string;
  contentUrl: string;
  uploadDate?: string;
};

export type SoftwareApplicationPayload = {
  seoSettings: SeoSettings;
};

export type BreadcrumbListPayload = {
  segments: Array<Omit<BreadcrumbListSegment, 'isSkeleton'>>;
};

export type HowToPayload = {
  name: string;
  description: string;
  steps: Array<HowToStep>;
};

export type WebSitePayload = {
  seoSettings: SeoSettings;
};
