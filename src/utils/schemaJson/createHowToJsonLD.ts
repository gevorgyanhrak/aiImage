import type { HowTo, WithContext } from 'schema-dts';

const createHowToJsonLD = (params: Omit<HowTo, '@context' | '@type'>): WithContext<HowTo> => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  ...params,
});

export { createHowToJsonLD };
