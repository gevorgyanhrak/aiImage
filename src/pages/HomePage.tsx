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
const QUICK_GENERATE_POSITION = 2;

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
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="px-3 md:px-6 py-4 md:py-6 flex flex-col gap-6">
          {/* Hero Banner */}
          <HeroBanner />

          {/* Content sections with QuickGenerate inserted after first 2 */}
          {pageData.components.map((componentData, index) => {
            const Component = componentsMap[componentData.__component];
            if (!Component) return null;

            return (
              <div key={componentData.id}>
                <Component {...componentData} priority={index === 0} searchParams={queryParams} />
                {index === QUICK_GENERATE_POSITION - 1 && (
                  <div className="mt-6">
                    <QuickGenerate />
                  </div>
                )}
              </div>
            );
          })}

          {/* Fallback: if fewer than 2 sections, show QuickGenerate at the end */}
          {pageData.components.length < QUICK_GENERATE_POSITION && <QuickGenerate />}
        </div>
      </main>
    </>
  );
};

export default HomePage;
