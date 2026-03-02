import type { BreadcrumbListPayload, HowToPayload, SoftwareApplicationPayload, VideoObjectPayload, WebSitePayload } from '@/types/jsonLd';
import { SchemaType } from '@/types/jsonLd';

import { createHowToPayload } from '@/utils/schemaJson/createHowToPayload';
import { createWebSitePayload } from '@/utils/schemaJson/createWebSitePayload';
import { createVideoObjectPayload } from '@/utils/schemaJson/createVideoObjectPayload';
import { createBreadcrumbListPayload } from '@/utils/schemaJson/createBreadcrumbListPayload';
import { createSoftwareApplicationPayload } from '@/utils/schemaJson/createSoftwareApplicationPayload';

import JSONLinkedData from '@/components/JSONLinkedData';

type PageJsonLinkedDataProps = {
  howToPayload?: HowToPayload;
  webSitePayload?: WebSitePayload;
  videoObjectPayload?: VideoObjectPayload;
  breadcrumbListPayload?: BreadcrumbListPayload;
  softwareApplicationPayload?: SoftwareApplicationPayload;
};

const PageJsonLinkedData = ({ breadcrumbListPayload, videoObjectPayload, softwareApplicationPayload, howToPayload, webSitePayload }: PageJsonLinkedDataProps) => (
  <>
    {howToPayload && <JSONLinkedData type={SchemaType.HowTo} payload={createHowToPayload({ ...howToPayload })} />}
    {webSitePayload && <JSONLinkedData type={SchemaType.WebSite} payload={createWebSitePayload({ ...webSitePayload })} />}
    {videoObjectPayload && <JSONLinkedData type={SchemaType.VideoObject} payload={createVideoObjectPayload({ ...videoObjectPayload })} />}
    {breadcrumbListPayload && <JSONLinkedData type={SchemaType.BreadcrumbList} payload={createBreadcrumbListPayload({ ...breadcrumbListPayload })} />}
    {softwareApplicationPayload && <JSONLinkedData type={SchemaType.SoftwareApplication} payload={createSoftwareApplicationPayload({ ...softwareApplicationPayload })} />}
  </>
);

export default PageJsonLinkedData;
