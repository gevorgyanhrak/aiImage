import type { WebSite, WithContext } from 'schema-dts';

const createWebsiteJsonLd = (params: Omit<WebSite, '@context' | '@type'>): WithContext<WebSite> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    ...params,
  };
};

export { createWebsiteJsonLd };
