import { memo, useRef } from 'react';
import { Link } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';

import useMasonryColumns from '@/hooks/useMasonryColumns';
import type { SectionItem } from '@/types/sectionItem';
import { TEST_IDS } from './constants/testIds';
import { DEFAULT_COLUMNS_COUNT, GRID_ID, HORIZONTAL_GAP, VERTICAL_GAP } from '@/constants/grid';
import { cn } from '@/lib/utils';
import { PlaybackMode } from '@/types/media';
import MasonryGrid from '../MasonryGrid';
import Media from '../Media';
import { PULSE_NAMES } from '@/constants/pulseNames';
import MediaOverlay from '../MediaOverlay';

type CategoryGridProps = {
  id: number;
  items: SectionItem[];
  title: string;
  basePath: string;
};

const CategoryGrid = ({ title, items, id, basePath }: CategoryGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { columns, isReady } = useMasonryColumns({ columnsCount: DEFAULT_COLUMNS_COUNT });

  const headingId = `${id}-heading`;
  const dimensions = items.map(item => ({ width: item?.media?.width ?? 0, height: item?.media?.height ?? 0 }));

  // TODO: implement infinite scroll
  return (
    <div ref={containerRef}>
      <MasonryGrid
        id={GRID_ID}
        columns={columns}
        dimensions={dimensions}
        aria-labelledby={headingId}
        verticalGap={VERTICAL_GAP}
        isVirtualizationEnabled={false}
        className={cn('overflow-hidden', isReady ? 'opacity-100' : 'opacity-0')}
        horizontalGap={HORIZONTAL_GAP}
        data-testid={`${title}-${TEST_IDS.MASONRY}`}
      >
        {items.map((item, itemIndex) => {
          const itemSlug = item?.slug ?? '/';
          const href = `/${basePath}/${itemSlug}`;
          const isPriority = itemIndex < 6;

          return (
            <Link
              to={href}
              key={item?.id}
              className="group relative no-underline"
              data-testid={`${title}-${TEST_IDS.LINK}`}
              data-pulse-name={item?.title ?? PULSE_NAMES.SECTION_ITEM}
            >
              <ErrorBoundary fallbackRender={() => null}>
                <div className="relative w-full">
                  <Media item={item} priority={isPriority} mediaClassName="md:group-hover:scale-110" playbackMode={PlaybackMode.Scheduled} />
                </div>
                <MediaOverlay title={item.title} />
              </ErrorBoundary>
            </Link>
          );
        })}
      </MasonryGrid>
    </div>
  );
};

export default memo(CategoryGrid);
