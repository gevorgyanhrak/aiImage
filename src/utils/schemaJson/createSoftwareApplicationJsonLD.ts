import type { SoftwareApplication, WithContext } from 'schema-dts';

const createSoftwareApplicationJsonLD = (params: Omit<SoftwareApplication, '@context' | '@type'>): WithContext<SoftwareApplication> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  ...params,
});

export { createSoftwareApplicationJsonLD };
