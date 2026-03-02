import { getRelatedLandings } from '@/lib/strapi/landings/related';
import { TEST_IDS } from './constants/testIds';
import MediaSection from '../SectionGrid';
import { DEFAULT_COLUMNS_COUNT } from '@/constants/grid';

import type { LandingType } from '@/types/landing';

interface SimilarPresetsProps {
  documentId: string;
  landingType: LandingType;
  category: string;
}

const SimilarPresets = ({ documentId, category }: SimilarPresetsProps) => {
  if (!documentId) return null;

  const data = getRelatedLandings();
  if (!data?.length) return null;

  return (
    <div className="mt-10 flex flex-col gap-6" data-testid={TEST_IDS.SECTION} data-pulse-section={`similar-presets-${category}`}>
      <h3 className="text-foreground" data-testid={TEST_IDS.TITLE}>
        Explore similar Effects
      </h3>
      <MediaSection items={data} id={1} defaultColumn={DEFAULT_COLUMNS_COUNT.UltraLarge} />
    </div>
  );
};

export default SimilarPresets;
