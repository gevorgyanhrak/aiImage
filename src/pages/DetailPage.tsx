import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Theme } from '@radix-ui/themes';
import { Download, RotateCcw, Sparkles, Heart, Bookmark } from 'lucide-react';

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
import { useAppStore, getAppStore } from '@/store/store';

import type { Media as MediaPropsType, VideoMedia } from '@/types/media';
import type { SectionItemWithFlow } from '@/types/sectionItem';

import LoginModal from '@/components/LoginModal';
import { cn } from '@/lib/utils';

import '@/styles/radix-theme.css';
import '@/styles/skeleton.css';
import '@/styles/preset.css';

function formatLikeCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

const DetailPage = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const resultUrl = useAppStore(s => s.resultUrl);
  const isGenerating = useAppStore(s => s.isGenerating);
  const isAuthenticated = useAppStore(s => s.isAuthenticated);
  const likedByUser = useAppStore(s => s.likedByUser);
  const likes = useAppStore(s => s.likes);
  const toggleLike = useAppStore(s => s.toggleLike);
  const wishlist = useAppStore(s => s.wishlist);
  const toggleWishlist = useAppStore(s => s.toggleWishlist);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Clear result when navigating to a different page
  useEffect(() => {
    getAppStore().setResultUrl(null);
  }, [category, id]);

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
    <Theme>
    <Header />
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

              {/* Like + Wishlist actions */}
              {(() => {
                const slug = id;
                const isLiked = likedByUser.includes(slug);
                const likeCount = likes[slug] ?? 0;
                const isWishlisted = wishlist.includes(slug);

                return (
                  <div className="flex items-center gap-3">
                    {/* Like button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                          return;
                        }
                        toggleLike(slug);
                      }}
                      className={cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 border',
                        isLiked
                          ? 'border-[var(--neon-pink)]/30 bg-[var(--neon-pink)]/10 text-[var(--neon-pink)]'
                          : 'border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--page-text)]',
                      )}
                    >
                      <Heart
                        className={cn('h-[18px] w-[18px] transition-transform duration-200', isLiked && 'scale-110')}
                        fill={isLiked ? 'currentColor' : 'none'}
                        strokeWidth={isLiked ? 0 : 2}
                      />
                      <span>{formatLikeCount(likeCount)}</span>
                    </button>

                    {/* Wishlist button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                          return;
                        }
                        toggleWishlist(slug);
                      }}
                      className={cn(
                        'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 border',
                        isWishlisted
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-400'
                          : 'border-[var(--surface-border-strong)] bg-[var(--surface)] text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--page-text)]',
                      )}
                    >
                      <Bookmark
                        className={cn('h-[18px] w-[18px] transition-transform duration-200', isWishlisted && 'scale-110')}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                        strokeWidth={isWishlisted ? 0 : 2}
                      />
                      <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                );
              })()}

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

            {/* Right panel — media preview / result */}
            <div className="order-1 lg:order-2 flex flex-col gap-4 self-start lg:sticky lg:top-20">
              <span className="detail-label px-1">{resultUrl ? 'Result' : isGenerating ? 'Generating...' : 'Preview'}</span>
              <div
                className="detail-media-wrap w-full h-[220px] md:h-[400px] lg:h-[560px] flex items-center justify-center relative overflow-hidden"
                data-testid={TEST_IDS.MEDIA_PREVIEW}
              >
                {resultUrl ? (
                  <img
                    src={resultUrl}
                    alt="Generated result"
                    className="w-full h-full object-contain"
                  />
                ) : isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F44097] animate-spin" />
                      <Sparkles className="h-6 w-6 text-[#F44097]" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-[var(--page-text)]">Generating your image</p>
                      <p className="text-xs text-[var(--page-text-muted)] mt-1">This may take a few seconds...</p>
                    </div>
                  </div>
                ) : (
                  <Media
                    playbackMode={PlaybackMode.Instant}
                    item={mediaItem}
                    priority
                    className="w-full h-full"
                    mediaClassName="object-contain"
                    isWithBackground
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, (max-width: 1440px) 35vw, 40rem"
                  />
                )}
              </div>
              {resultUrl && (
                <div className="flex gap-2">
                  <a
                    href={resultUrl}
                    download="hrakai-generated.png"
                    className="flex-1 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F44097] to-[#FC67FA] text-sm font-semibold text-white shadow-[0_0_20px_rgba(244,64,151,0.2)] hover:shadow-[0_0_32px_rgba(244,64,151,0.35)] active:translate-y-px transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => getAppStore().setResultUrl(null)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--surface-border-strong)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--page-text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    New
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Similar effects */}
          <SimilarPresets documentId={documentId} landingType={landingType} category={category} />
        </div>
      </main>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </Theme>
  );
};

export default DetailPage;
