import type { VideoObject, WithContext } from 'schema-dts';

const createVideoObjectJsonLD = (params: Omit<VideoObject, '@context' | '@type'>): WithContext<VideoObject> => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  ...params,
});

export { createVideoObjectJsonLD };
