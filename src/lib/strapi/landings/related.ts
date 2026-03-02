import { mockRelatedLandings } from '@/mocks/data';
import type { LandingType } from '@/types/landing';
import type { SectionItem } from '@/types/sectionItem';

export const getRelatedLandings = async (_documentId: string, _landingType: LandingType): Promise<SectionItem[]> => {
  return mockRelatedLandings;
};
