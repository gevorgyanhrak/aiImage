import { useParams, useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Theme } from '@radix-ui/themes';

import Header from '@/components/Header';
import Media from '@/components/Media';
import BreadCrump from '@/components/BreadCrump';
import SimilarPresets from '@/components/SimilarPresets';
import PresetHero from '@/components/PresetEditor/PresetHero';
import PageJsonLinkedData from '@/components/PageJsonLinkedData';
import GlobalHooksWrapper from '@/components/GlobalHooksWrapper';
import { MediaType } from '@/types/media';
import { getLandingBySlugAndCategory } from '@/lib/strapi/landings';
import { defaultHowToSteps } from '@/constants/schema';
import { BREADCRUMB_BASE_SEGMENT } from '@/constants/breadcrumb';
import { TEST_IDS } from '@/constants/detailTestIds';
import CUSTOM_BREADCRUMB_TITLE from '@/constants/customBreadcrumbTitle';
import ItemsAndFooterWrapper from '@/components/ItemsAndFooterWrapper';
import { SITE_NAME } from '@/constants/seo';
import { PlaybackMode } from '@/types/media';

import type { Media as MediaPropsType, VideoMedia } from '@/types/media';
import type { SectionItemWithFlow } from '@/types/sectionItem';

import '@/styles/radix-theme.css';
import '@/styles/skeleton.css';
import '@/styles/preset.css';

const DetailPage = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  if (!category || !id) return null;

  const { data } = getLandingBySlugAndCategory(category, id);

  if (!data) return null;

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

  const transformationPrompt = transformations?.find(transformation => transformation.type === MediaType.IMAGE && transformation.prompt.trim().length)?.prompt ?? null;
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
    return (
      <>
        <Header />
        <main className="detail-page min-h-screen flex items-center justify-center">
          <h1 className="text-xl text-[var(--page-text-secondary)]">Not found</h1>
        </main>
      </>
    );
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
    <>
    <Header />
    <Theme>
      <Helmet>
        <title>{seoSettings?.title || `${title} - ${SITE_NAME}`}</title>
        {seoSettings?.metaDescription && <meta name="description" content={seoSettings.metaDescription} />}
      </Helmet>
      <main className="detail-page min-h-screen text-[var(--page-text)]" data-testid={TEST_IDS.MAIN}>
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

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-4 pt-4 md:pt-6 md:px-8">
          <BreadCrump segments={segments} />
        </div>

        {/* Two-panel layout */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">
          <div
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 lg:gap-8"
            data-testid={TEST_IDS.CONTENT_SECTION}
          >
            {/* Left panel — controls */}
            <div className="detail-card flex flex-col gap-6 p-5 md:p-7 order-2 lg:order-1 self-start">
              {/* Title & description */}
              <PresetHero title={title} description={description} />

              <div className="detail-separator" />

              {/* Upload areas & text inputs */}
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

            {/* Right panel — media preview */}
            <div className="order-1 lg:order-2 flex flex-col gap-4 self-start lg:sticky lg:top-20">
              <span className="detail-label px-1">Preview</span>
              <div
                className="detail-media-wrap w-full h-[220px] md:h-[400px] lg:h-[560px] flex items-center justify-center"
                data-testid={TEST_IDS.MEDIA_PREVIEW}
              >
                <Media
                  playbackMode={PlaybackMode.Instant}
                  item={mediaItem}
                  priority
                  className="w-full h-full"
                  mediaClassName="object-contain"
                  isWithBackground
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, (max-width: 1440px) 35vw, 40rem"
                />
              </div>
            </div>
          </div>

          {/* Similar effects */}
          <SimilarPresets documentId={documentId} landingType={landingType} category={category} />
        </div>
      </main>
    </Theme>
    </>
  );
};

export default DetailPage;
