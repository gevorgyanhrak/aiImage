import type { SectionItem, SliderItem } from './sectionItem';
import type { Tag } from './tag';

export enum StrapiComponent {
  SectionGrid = 'section.grid',
  SectionSlider = 'section.slider',
}

export interface BaseComponent {
  __component: StrapiComponent;
  id: number;
  title: string;
  description?: string;
}

export interface SectionGrid extends BaseComponent {
  __component: typeof StrapiComponent.SectionGrid;
  items: SectionItem[];
  slug: string;
  tags?: Tag[];
}

export interface SectionSlider extends BaseComponent {
  __component: typeof StrapiComponent.SectionSlider;
  items: SliderItem[];
  priority?: boolean;
}
