import { notFound } from 'next/navigation';

import CategoryGrid from '@/components/CategoryGrid';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import { createSEOMetaData } from '@/utils/createSEOMetaData';
import createPageUrl from '@/utils/createPageUrl';
import { getCategoryBySlug } from '@/lib/strapi/categories';
import { BREADCRUMB_BASE_SEGMENT } from '@/constants/breadcrumb';
import BreadCrump from '@/components/BreadCrump';
import SectionText from '@/components/SectionText';
import { defaultHowToSteps } from '@/constants/schema';

type PageProps = {
  params: Promise<{ category: string }>;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { category } = await params;

  try {
    const { data } = await getCategoryBySlug(category);
    const { seoSettings } = data;

    return createSEOMetaData({ ...seoSettings, canonicalUrl: seoSettings?.canonicalUrl || createPageUrl([category]) });
  } catch {
    return {};
  }
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const { data } = await getCategoryBySlug(category);
  const { title, description, id, items, seoSettings } = data;

  if (!items?.length) {
    notFound();
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
    </>
  );
}
