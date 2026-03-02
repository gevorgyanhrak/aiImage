import { makeMockCategory } from '@/mocks/data';

import type { CategoryResponse } from '@/types/category';

export function getCategoryBySlug(slug: string): CategoryResponse {
  return makeMockCategory(slug);
}
