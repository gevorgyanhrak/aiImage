'use client';

import clsx from 'clsx';

import type { IMasonryProps } from './types';
import useMasonry from './useMasonry';
import { ITEM } from './testIds';

const MasonryGrid = ({
  children,
  style,
  columns = 1,
  rows = 1,
  horizontal = false,
  horizontalGap = 0,
  verticalGap = 0,
  dimensions,
  className,
  rowHeight = 100,
  isVirtualizationEnabled = true,
  id,
  contentRef,
  ...props
}: IMasonryProps) => {
  const { handleScroll, scrollContainerRef, visibleItems, containerSize } = useMasonry({
    horizontal,
    rowHeight,
    columns,
    horizontalGap,
    verticalGap,
    rows,
    children,
    dimensions,
    isVirtualizationEnabled,
  });

  return (
    <div ref={scrollContainerRef} onScroll={handleScroll} id={id} className={clsx('relative w-full h-full overflow-auto', className)} {...props} style={style}>
      <div
        ref={contentRef}
        className="relative"
        style={{
          width: horizontal ? `${containerSize}px` : '100%',
          height: horizontal ? `${rows * rowHeight + (rows - 1) * verticalGap}px` : `${containerSize}px`,
        }}
      >
        {visibleItems.map(({ id, trackIndex, size, top, left, child }) => (
          <div
            key={id}
            className="absolute box-border"
            style={{
              top: `${top}px`,
              left: horizontal ? `${left}px` : `calc((100% - ${(columns - 1) * horizontalGap}px) / ${columns} * ${trackIndex} + ${trackIndex * horizontalGap}px)`,
              width: horizontal ? `${size}px` : `calc((100% - ${(columns - 1) * horizontalGap}px) / ${columns})`,
              height: horizontal ? `${rowHeight}px` : `${size}px`,
            }}
            data-testid={ITEM}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
