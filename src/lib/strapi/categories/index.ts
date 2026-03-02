import { makeMockCategory } from '@/mocks/data';
import type { CategoryResponse } from '@/types/category';

type GetCategoryBySlugOptions = {
  cache?: RequestCache;
  tags?: string[];
};

export async function getCategoryBySlug(slug: string, _options?: GetCategoryBySlugOptions): Promise<CategoryResponse> {
  return makeMockCategory(slug);
}
