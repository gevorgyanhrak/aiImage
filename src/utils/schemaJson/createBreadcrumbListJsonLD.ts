import type { BreadcrumbList, WithContext } from 'schema-dts';

const createBreadcrumbListJsonLD = (params: Omit<BreadcrumbList, '@context' | '@type'>): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  ...params,
});

export { createBreadcrumbListJsonLD };
