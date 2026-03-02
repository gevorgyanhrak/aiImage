import type { WebSitePayload } from '@/types/jsonLd';
import type { WebSite } from 'schema-dts';

const createWebSitePayload = ({ seoSettings }: WebSitePayload): WebSite => {
  const { title, metaDescription, canonicalUrl } = seoSettings || {};

  return {
    '@type': 'WebSite',
    ...(title && { name: title }),
    ...(canonicalUrl && { url: canonicalUrl }),
    ...(metaDescription && { description: metaDescription }),
    ...(canonicalUrl && { '@id': `${canonicalUrl}#website` }),
  };
};

export { createWebSitePayload };
