import { useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import componentsMap from '@/componentMaps/hub';
import { getHubByDocumentId } from '@/lib/strapi/hubs';
import { HUB_DOCUMENT_ID } from '@/constants/globals';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import { SITE_NAME } from '@/constants/seo';
import HeroBanner from '@/components/HeroBanner';
import QuickGenerate from '@/components/QuickGenerate';

import type { TabItem } from '@/types/tabs';

const landingsLimit = 20;

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const { data: pageData } = getHubByDocumentId(HUB_DOCUMENT_ID!, { landingsLimit });

  const tabItems = pageData.components.reduce((acc, { id, title }) => {
    if (title) acc.push({ id, title });
    return acc;
  }, [] as TabItem[]);

  return (
    <>
      <Helmet>
        <title>{pageData.seoSettings?.title || SITE_NAME}</title>
        {pageData.seoSettings?.metaDescription && <meta name="description" content={pageData.seoSettings.metaDescription} />}
      </Helmet>
      <Header>
        <Tabs items={tabItems} />
      </Header>
      <PageJsonLinkedData softwareApplicationPayload={{ seoSettings: pageData.seoSettings }} webSitePayload={{ seoSettings: pageData.seoSettings }} />
      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--page-text)]">
        <div className="px-3 md:px-6 py-4 md:py-6 pb-16 flex flex-col gap-6">
          <HeroBanner />

          {pageData.components.map((componentData, index) => {
            const Component = componentsMap[componentData.__component];
            if (!Component) return null;
            return <Component {...componentData} priority={index === 0} key={componentData.id} searchParams={queryParams} />;
          })}
        </div>
      </main>

      {/* Sticky bottom bar */}
      <QuickGenerate />
    </>
  );
};

export default HomePage;
