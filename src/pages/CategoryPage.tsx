import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import Header from '@/components/Header';
import CategoryGrid from '@/components/CategoryGrid';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import { getCategoryBySlug } from '@/lib/strapi/categories';
import { BREADCRUMB_BASE_SEGMENT } from '@/constants/breadcrumb';
import BreadCrump from '@/components/BreadCrump';
import SectionText from '@/components/SectionText';
import { defaultHowToSteps } from '@/constants/schema';
import { SITE_NAME } from '@/constants/seo';

import '@/styles/skeleton.css';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  if (!category) return null;

  const { data } = getCategoryBySlug(category);
  const { title, description, id, items, seoSettings } = data;

  if (!items?.length) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background text-foreground px-3 md:px-6 flex items-center justify-center">
          <h1 className="text-2xl">Category not found</h1>
        </main>
      </>
    );
  }

  const segments = [
    BREADCRUMB_BASE_SEGMENT,
    {
      title,
      href: `/${category}`,
    },
  ];

  return (
    <>
    <Header />
    <main className="min-h-screen bg-background text-foreground px-3 md:px-6">
      <Helmet>
        <title>{seoSettings?.title || `${title} - ${SITE_NAME}`}</title>
        {seoSettings?.metaDescription && <meta name="description" content={seoSettings.metaDescription} />}
      </Helmet>
      <PageJsonLinkedData
        webSitePayload={{ seoSettings }}
        breadcrumbListPayload={{ segments }}
        softwareApplicationPayload={{ seoSettings }}
        howToPayload={{ name: title, description: description, steps: defaultHowToSteps }}
      />
      <div className="mx-auto pt-4 md:pt-8">
        <BreadCrump segments={segments} />
      </div>
      <section className="flex flex-col gap-2 mt-4">
        {title && <SectionText as="h1" text={title} className="uppercase text-gradient-valentine text-2xl font-semibold leading-7" />}
        {description && <SectionText as="p" text={description} className="text-sm font-normal leading-5" />}
      </section>
      <section className="min-h-screen flex flex-col py-2" data-pulse-section={category} data-pulse-group={category}>
        <CategoryGrid id={id} items={data.items} title={category} basePath={category} />
      </section>
    </main>
    </>
  );
};

export default CategoryPage;
