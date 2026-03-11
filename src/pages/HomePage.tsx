import { useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import componentsMap from '@/componentMaps/hub';
import { getHubByDocumentId } from '@/lib/strapi/hubs';
import { HUB_DOCUMENT_ID } from '@/constants/globals';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import { SITE_NAME } from '@/constants/seo';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import QuickGenerate from '@/components/QuickGenerate';
import NewFeatures from '@/components/NewFeatures';
import PopularFilters from '@/components/PopularFilters';
import HowItWorks from '@/components/HowItWorks';
import FilterExplorer from '@/components/FilterExplorer';
import PromoBanner from '@/components/PromoBanner';
import ToolsShowcase from '@/components/ToolsShowcase';
import TrendingEffects from '@/components/TrendingEffects';
import CreatorApps from '@/components/CreatorApps';
import ContestBanner from '@/components/ContestBanner';
import StylePresets from '@/components/StylePresets';
import CommunityShowcase from '@/components/CommunityShowcase';

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
        <div className="px-3 md:px-6 py-4 md:py-6 pb-16 flex flex-col gap-8 md:gap-10">
          {/* Featured carousel — top filters */}
          <FeaturedCarousel />

          {/* Tools showcase — right after hero */}
          <ToolsShowcase />

          {/* Trending effects — tabbed grid */}
          <TrendingEffects />

          {/* CMS sections interleaved with custom components */}
          {pageData.components.map((componentData, index) => {
            const Component = componentsMap[componentData.__component];
            if (!Component) return null;
            return (
              <div key={componentData.id} className="contents">
                <Component {...componentData} priority={index === 0} searchParams={queryParams} />

                {/* After 1st CMS section: What's New */}
                {index === 0 && <NewFeatures />}

                {/* After 2nd CMS section: Creator Apps carousel */}
                {index === 1 && <CreatorApps />}

                {/* After 3rd CMS section: Promo banner */}
                {index === 2 && <PromoBanner />}

                {/* After 4th CMS section: Popular filters */}
                {index === 3 && <PopularFilters />}

                {/* After 5th CMS section: Style Presets */}
                {index === 4 && <StylePresets />}

                {/* After 6th CMS section: How It Works */}
                {index === 5 && <HowItWorks />}
              </div>
            );
          })}

          {/* Contest banner */}
          <ContestBanner />

          {/* Community showcase gallery */}
          <CommunityShowcase />

          {/* Filter Explorer — at the bottom */}
          <FilterExplorer />
        </div>
      </main>

      {/* Sticky bottom bar */}
      <QuickGenerate />
    </>
  );
};

export default HomePage;
