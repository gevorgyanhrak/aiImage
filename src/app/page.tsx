import Tabs from '@/components/Tabs';
import type { TabItem } from '@/types/tabs';
import componentsMap from '@/componentMaps/hub';
import { getHubByDocumentId } from '@/lib/strapi/hubs';
import { HUB_DOCUMENT_ID } from '@/constants/globals';
import { createSEOMetaData } from '@/utils/createSEOMetaData';
import createPageUrl from '@/utils/createPageUrl';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import type { SearchParams } from '@/types/common';

const landingsLimit = 20;

// Fetch data inside component to ensure it runs on every request
async function getPageData() {
  return getHubByDocumentId(HUB_DOCUMENT_ID!, { landingsLimit });
}

export const generateMetadata = async () => {
  const { data: pageData } = await getPageData();
  const { seoSettings } = pageData;

  return createSEOMetaData({ ...seoSettings, canonicalUrl: seoSettings.canonicalUrl || createPageUrl() });
};

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { data: pageData } = await getPageData();
  const queryParams = await searchParams;

  const tabItems = pageData.components.reduce((acc, { id, title }) => {
    if (title) acc.push({ id, title });
    return acc;
  }, [] as TabItem[]);

  return (
    <>
      <PageJsonLinkedData softwareApplicationPayload={{ seoSettings: pageData.seoSettings }} webSitePayload={{ seoSettings: pageData.seoSettings }} />
      <main className="min-h-screen bg-background text-foreground">
        <Tabs items={tabItems} />
        <div className="px-3 md:px-6 md:py-2 flex flex-col gap-10">
          {pageData.components.map((componentData, index) => {
            const Component = componentsMap[componentData.__component];
            if (!Component) return null;
            // Pass a priority hint so the first two sections can preload above-the-fold media
            return <Component {...componentData} priority={index === 0} key={componentData.id} searchParams={queryParams} />;
          })}
        </div>
      </main>
    </>
  );
}
