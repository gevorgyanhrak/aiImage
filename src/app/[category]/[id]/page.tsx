import { notFound } from 'next/navigation';

import Media from '@/components/Media';
import BreadCrump from '@/components/BreadCrump';
import SimilarPresets from '@/components/SimilarPresets';
import PresetHero from '@/components/PresetEditor/PresetHero';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import GlobalHooksWrapper from '@/components/GlobalHooksWrapper';
import { createSEOMetaData } from '@/utils/createSEOMetaData';
import { MediaType } from '@/types/media';
import type { Media as MediaPropsType, VideoMedia } from '@/types/media';
import type { SectionItemWithFlow } from '@/types/sectionItem';

import createPageUrl from '@/utils/createPageUrl';
import { getLandingBySlugAndCategory } from '@/lib/strapi/landings';
import { defaultHowToSteps } from '@/constants/schema';
import { BREADCRUMB_BASE_SEGMENT } from '@/constants/breadcrumb';
import { TEST_IDS } from './constants/testIds';
import type { SearchParams } from '@/types/common';
import { PlaybackMode } from '@/types/media';
import CUSTOM_BREADCRUMB_TITLE from './constants/customBreadcrumbTitle';
import ItemsAndFooterWrapper from '@/components/ItemsAndFooterWrapper';

type PageProps = {
  params: Promise<{ category: string; id: string }>;
  searchParams: Promise<SearchParams>;
};
// const getTags = (id: string) => ['landings', `landing-${id}`];

const getLanding = async (category: string, slug: string) => {
  const { data } = await getLandingBySlugAndCategory(category, slug);
  return data;
};

export const generateMetadata = async ({ params }: PageProps) => {
  const { id, category } = await params;
  const { seoSettings } = await getLanding(category, id);

  return createSEOMetaData({ ...seoSettings, canonicalUrl: seoSettings?.canonicalUrl || createPageUrl([category, id]) });
};

export default async function Page({ params, searchParams }: PageProps) {
  const { category, id } = await params;
  const queryParams = await searchParams;

  const data = await getLanding(category, id);

  if (!data) return;

  const {
    flowId,
    landingType,
    title = '',
    description = '',
    uploadItems,
    textItems,
    button,
    redirectionUrl,
    prompt,
    image = [],
    type,
    video,
    documentId,
    transformations,
    seoSettings = {},
    createdAt,
  } = data;

  // If the primary prompt is empty, reuse the first image transformation prompt for generation.
  const transformationPrompt = transformations?.find(transformation => transformation.type === MediaType.IMAGE && transformation.prompt.trim().length)?.prompt ?? null;

  // IDs used to key uploaded previews in the store; PreviewFooter fetches sourceUrl(s) by these IDs
  const itemsIds = uploadItems ? uploadItems.map(item => String(item.id)) : [];

  const segments = [
    BREADCRUMB_BASE_SEGMENT,
    {
      title:
        CUSTOM_BREADCRUMB_TITLE[category] ??
        category
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      href: `/${category}`,
    },
    {
      title,
      href: `/${category}/${id}`,
    },
  ];

  const media: MediaPropsType = type === MediaType.VIDEO ? video?.[0]?.media : image?.[0]?.media;

  if (!media) {
    notFound();
  }

  const flow = flowId
    ? {
        webhookId: flowId,
        uploadItems,
      }
    : null;

  const mediaItem: SectionItemWithFlow =
    type === MediaType.VIDEO
      ? {
          media: media as VideoMedia,
          title,
          type: MediaType.VIDEO,
          id: String(id),
          url: redirectionUrl || '',
          redirectUrl: redirectionUrl || '',
          slug: id,
          image: null,
          video: media.url,
          description,
          flow,
        }
      : {
          media,
          blurDataUrl: image?.[0]?.media?.formats?.small?.url,
          title,
          type: MediaType.IMAGE,
          id: String(id),
          url: redirectionUrl || '',
          redirectUrl: redirectionUrl || '',
          slug: id,
          image: media.url,
          video: null,
          description,
          flow,
        };

  return (
    <main className="min-h-screen bg-background md:bg-app-black text-foreground" data-testid={TEST_IDS.MAIN}>
      <PageJsonLinkedData
        breadcrumbListPayload={{ segments }}
        {...(type === MediaType.VIDEO && {
          videoObjectPayload: {
            name: title,
            description,
            thumbnailUrl: (media as VideoMedia).poster,
            contentUrl: media.url,
            uploadDate: createdAt,
          },
        })}
        softwareApplicationPayload={{ seoSettings }}
        howToPayload={{ name: title, description, steps: defaultHowToSteps }}
        webSitePayload={{ seoSettings }}
      />
      <GlobalHooksWrapper />
      <div className="mx-auto px-3 pt-2 md:pt-10 md:pb-8 md:px-6">
        <BreadCrump segments={segments} />
      </div>
      <div className="py-4 mx-auto max-w-5xl px-4">
        <section className="grid grid-cols-1 gap-3 rounded-2xl md:bg-background md:p-6 lg:grid-cols-2 lg:gap-6" data-testid={TEST_IDS.CONTENT_SECTION}>
          <div className="contents lg:flex lg:flex-col lg:gap-4 relative">
            <div className="order-1 lg:order-none">
              <PresetHero title={title} description={description} />
            </div>
            <ItemsAndFooterWrapper
              uploadItems={uploadItems}
              textItems={textItems}
              id={id}
              flowId={flowId ?? null}
              button={button}
              redirectionUrl={redirectionUrl}
              transformationPrompt={transformationPrompt}
              prompt={prompt}
              queryParams={queryParams}
              itemsIds={itemsIds}
              mediaItem={mediaItem}
              transformations={transformations ?? []}
              category={category}
            />
          </div>

          <div className="w-full h-[160px] md:h-[300px] lg:h-[540px] flex items-center justify-center order-2 lg:order-none" data-testid={TEST_IDS.MEDIA_PREVIEW}>
            <Media
              playbackMode={PlaybackMode.Instant}
              item={mediaItem}
              priority
              className="w-full h-[160px] md:h-full"
              mediaClassName="object-contain"
              isWithBackground
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, (max-width: 1440px) 25vw, (max-width: 1920px) 20rem, 50rem"
            />
          </div>
        </section>
        <SimilarPresets documentId={documentId} landingType={landingType} category={category} />
      </div>
    </main>
  );
}
