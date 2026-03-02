import type { SectionGrid, SectionSlider } from './strapiComponent';
import type { StrapiMeta } from './strapi';
import type { SeoSettings } from './seoSettings';

export interface HubEntry {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  slug: string;
  seoSettings: SeoSettings;
  components: Array<SectionSlider | SectionGrid>;
  localizations: unknown[];
}

export interface HubsResponse {
  data: HubEntry;
  meta: StrapiMeta;
}
