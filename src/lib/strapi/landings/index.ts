import { makeMockLanding } from '@/mocks/data';

import type { LandingApiResponse } from '@/types/landing';

export function getLandingBySlugAndCategory(category: string, slug: string): LandingApiResponse {
  return makeMockLanding(category, slug);
}
