import { BASE_URL } from '@/constants/globals';

const createPageUrl = (slug?: string[]) => {
  if (!slug || slug.length === 0) return BASE_URL;

  if (Array.isArray(slug)) return `${BASE_URL}/${slug.join('/')}`;
};

export default createPageUrl;
