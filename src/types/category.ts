import type { SectionItem } from './sectionItem';
import type { SeoSettings } from './seoSettings';
import type { StrapiMeta } from './strapi';

export interface Category {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  slug: string;
  description: string;
  seoSettings: SeoSettings;
  items: SectionItem[];
}

export interface CategoryResponse {
  data: Category;
  meta: StrapiMeta;
}
