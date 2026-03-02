import { defaultSoftwareApplicationSchema } from '@/constants/schema';
import type { SoftwareApplicationPayload } from '@/types/jsonLd';
import type { SoftwareApplication } from 'schema-dts';

const createSoftwareApplicationPayload = ({ seoSettings }: SoftwareApplicationPayload): SoftwareApplication => {
  const { title, metaDescription, ogImage, keywords } = seoSettings || {};

  return {
    ...defaultSoftwareApplicationSchema,
    ...(title && { name: title }),
    ...(metaDescription && { description: metaDescription }),
    // Todo: make correct feature list
    ...(keywords && { featureList: keywords?.split(',') }),
    ...(ogImage && { screenshot: ogImage }),
  };
};

export { createSoftwareApplicationPayload };
