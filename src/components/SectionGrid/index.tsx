'use client';

import { useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ErrorBoundary } from 'react-error-boundary';

import useMasonryColumns from '@/hooks/useMasonryColumns';
import useSectionViewMore from '@/hooks/useSectionViewMore';
import type { SectionGrid as SectionGridType } from '@/types/strapiComponent';
import type { ColumnsCount } from '@/types/masonry';
import type { SearchParams } from '@/types/common';
import { TEST_IDS } from './testIds';
import { DEFAULT_COLUMNS_COUNT, HORIZONTAL_GAP, MAX_HEIGHT, VERTICAL_GAP } from '@/constants/grid';
import { cn } from '@/lib/utils';
import { PlaybackMode } from '@/types/media';
import MasonryGrid from '../MasonryGrid';
import ViewMoreButton from '../ViewMoreButton';
import Shadow from './Shadow';
import SectionText from '../SectionText';
import { AD_URL_PARAMS } from '@/constants/analytics';
import setParamsInSessionStorage from '@/utils/setParamsInSessionStorage';
import { PULSE_NAMES } from '@/constants/pulseNames';
import getRedirectionUrl from '@/utils/getHrefForItem';
import Media from '../Media';
import MediaOverlay from '../MediaOverlay';

type SectionGridProps = Omit<SectionGridType, '__component' | 'title' | 'slug'> & {
  title?: string;
  columnsCount?: ColumnsCount;
  priority?: boolean;
  slug?: string;
  playBackMode?: PlaybackMode;
  description?: string;
  searchParams?: SearchParams;
  defaultColumn?: number;
};

const MAX_PRIORITY_ITEMS = 7;

const SectionGrid = ({ title, items, id, priority, columnsCount = DEFAULT_COLUMNS_COUNT, playBackMode = PlaybackMode.Scheduled, slug, searchParams, description, defaultColumn }: SectionGridProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { columns, isReady } = useMasonryColumns({ columnsCount, defaultColumn });

  const headingId = `${id}-heading`;

  const dimensions = useMemo(() => items.map(item => ({ width: item?.media?.width ?? 0, height: item?.media?.height ?? 0 })), [items]);

  const { showMoreButton } = useSectionViewMore({
    contentRef,
    maxHeight: MAX_HEIGHT,
    isReady,
  });

  useEffect(() => {
    if (!searchParams) return;

    setParamsInSessionStorage(AD_URL_PARAMS, searchParams);
  }, [searchParams]);

  return (
    <section id={String(id)} aria-labelledby={headingId} data-testid={`${title}-${TEST_IDS.SECTION}`} data-pulse-section={title}>
      <div className="max-w-8xl mx-auto">
        <div className="w-full flex flex-col gap-1">
          {title && (
            <Link
              className={cn('inline-flex w-fit uppercase text-gradient-valentine text-2xl font-semibold leading-7 transition-opacity hover:opacity-80', description ? 'mb-2' : 'mb-8')}
              href={slug ?? '/'}
              id={headingId}
              data-testid={`${title}-${TEST_IDS.TITLE}`}
            >
              {title}
            </Link>
          )}
          {description && <SectionText as="h3" text={description} id={headingId} className="mb-2 text-sm font-normal leading-5" data-testid={`${description}-${TEST_IDS.TITLE}`} />}
        </div>
        <div className="relative">
          <ErrorBoundary fallbackRender={() => null}>
            <MasonryGrid
              columns={columns}
              dimensions={dimensions}
              aria-labelledby={headingId}
              verticalGap={VERTICAL_GAP}
              isVirtualizationEnabled={false}
              className={cn('overflow-hidden', isReady ? 'opacity-100' : 'opacity-0')}
              horizontalGap={HORIZONTAL_GAP}
              style={{ maxHeight: MAX_HEIGHT }}
              data-testid={`${title}-${TEST_IDS.MASONRY}`}
              contentRef={contentRef}
            >
              {items.map((item, itemIndex) => {
                const redirectionUrl = getRedirectionUrl({ category: slug, itemSlug: item?.slug });
                const isPriority = priority && itemIndex < MAX_PRIORITY_ITEMS;

                return (
                  <Link
                    href={redirectionUrl}
                    prefetch={false}
                    key={item?.id}
                    className="group relative no-underline"
                    data-testid={`${title}-${TEST_IDS.LINK}`}
                    data-pulse-name={item?.title ?? PULSE_NAMES.SECTION_ITEM}
                  >
                    <div className="relative w-full" data-testid={TEST_IDS.MEDIA_ITEM}>
                      <Media item={item} priority={isPriority} mediaClassName="md:group-hover:scale-110" playbackMode={playBackMode} />
                    </div>
                    <MediaOverlay title={item.title} />
                  </Link>
                );
              })}
            </MasonryGrid>
          </ErrorBoundary>
          {showMoreButton && <Shadow dataTestId={`${title}-${TEST_IDS.SHADOW}`} className="z-39" />}
        </div>
        {showMoreButton && slug && <ViewMoreButton href={`/${slug}`} />}
      </div>
    </section>
  );
};

export default SectionGrid;
