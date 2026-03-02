import type { ComponentType } from 'react';

import { StrapiComponent } from '@/types/strapiComponent';

import SectionGrid from '@/components/SectionGrid';
import SectionSlider from '@/components/SectionSlider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentsMap = Record<string, ComponentType<any>>;

const componentsMap: ComponentsMap = {
  [StrapiComponent.SectionGrid]: SectionGrid,
  [StrapiComponent.SectionSlider]: SectionSlider,
};

export default componentsMap;
