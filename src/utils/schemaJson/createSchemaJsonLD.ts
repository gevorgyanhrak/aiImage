import { type SchemaParams, SchemaType, type SchemaJson } from '@/types/jsonLd';
import type { WithContext } from 'schema-dts';

import { createHowToJsonLD } from './createHowToJsonLD';
import { createWebsiteJsonLd } from './createWebsiteJsonLd';
import { createVideoObjectJsonLD } from './createVideoObjectJsonLD';
import { createBreadcrumbListJsonLD } from './createBreadcrumbListJsonLD';
import { createSoftwareApplicationJsonLD } from './createSoftwareApplicationJsonLD';

const createSchemaJsonLD = ({ type, payload }: SchemaParams): WithContext<SchemaJson> => {
  switch (type) {
    case SchemaType.HowTo:
      return createHowToJsonLD(payload);
    case SchemaType.WebSite:
      return createWebsiteJsonLd(payload);
    case SchemaType.VideoObject:
      return createVideoObjectJsonLD(payload);
    case SchemaType.BreadcrumbList:
      return createBreadcrumbListJsonLD(payload);
    case SchemaType.SoftwareApplication:
      return createSoftwareApplicationJsonLD(payload);
  }
};

export { createSchemaJsonLD };
