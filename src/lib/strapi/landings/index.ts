import { makeMockLanding } from '@/mocks/data';
import type { LandingApiResponse } from '@/types/landing';

export async function getLandingBySlugAndCategory(category: string, slug: string, _tags?: string[]): Promise<LandingApiResponse> {
  return makeMockLanding(category, slug);
}
