import type { BreadcrumbList } from 'schema-dts';

import { BASE_URL } from '@/constants/globals';
import type { BreadcrumbListPayload } from '@/types/jsonLd';

const createBreadcrumbListPayload = ({ segments }: BreadcrumbListPayload): BreadcrumbList => ({
  '@type': 'BreadcrumbList',
  itemListElement: segments.map((segment, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: segment.title,
    item: `${BASE_URL}${segment.href}`,
  })),
});

export { createBreadcrumbListPayload };
