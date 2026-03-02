import type { ReactNode } from 'react';
import { useRef, useState, useLayoutEffect, useMemo, isValidElement } from 'react';
import type { IMasonryDimension } from './types';

const estimatedViewportSize = 800;
const buffer = 300;

type UseMasonryProps = {
  horizontal?: boolean;
  rowHeight: number;
  columns: number;
  horizontalGap: number;
  verticalGap: number;
  children: ReactNode[];
  rows: number;
  dimensions: IMasonryDimension[];
  isVirtualizationEnabled: boolean;
};

const findLeastFilledTrack = (trackSizes: number[]) => {
  let minIndex = 0;
  let minValue = trackSizes[0] ?? 0;

  for (let index = 1; index < trackSizes.length; index += 1) {
    const value = trackSizes[index];
    if (value < minValue) {
      minValue = value;
      minIndex = index;
    }
  }

  return { minIndex, minValue };
};

const useMasonry = ({ horizontal, rowHeight, columns, horizontalGap, verticalGap, rows, children, dimensions, isVirtualizationEnabled }: UseMasonryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useLayoutEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) return;

    const updateWidth = (width: number) => {
      requestAnimationFrame(() => {
        setContainerWidth(width);
      });
    };

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const width = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        updateWidth(width);
      });
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const columnWidth = useMemo(() => {
    if (horizontal) return rowHeight;
    if (columns <= 0) return 0;

    const availableWidth = Math.max(containerWidth - (columns - 1) * horizontalGap, 0);
    return availableWidth / columns;
  }, [horizontal, rowHeight, columns, containerWidth, horizontalGap]);

  const positionedItems = useMemo(() => {
    const trackCount = horizontal ? rows : columns;
    if (trackCount <= 0) return [];

    const trackSizes = Array(trackCount).fill(0);
    const gap = horizontal ? horizontalGap : verticalGap;

    return children.map((child, index) => {
      const dimension = dimensions[index];
      const { width = 0, height = 0 } = dimension ?? {};
      let size = rowHeight;

      if (horizontal) {
        if (height > 0) {
          size = (width / height) * rowHeight;
        } else if (width > 0) {
          size = width;
        }
      } else if (width > 0 && columnWidth > 0) {
        size = (height / width) * columnWidth;
      } else if (height > 0) {
        size = height;
      }

      const { minIndex: minTrack, minValue: start } = findLeastFilledTrack(trackSizes);
      const gapToAdd = start > 0 ? gap : 0;
      const mainAxisPosition = start + gapToAdd;

      trackSizes[minTrack] = mainAxisPosition + size;

      const childKey = isValidElement(child) ? child.key : null;
      const id = childKey ?? `masonry-${index}`;

      if (horizontal) {
        return {
          child,
          top: minTrack * (rowHeight + verticalGap),
          left: mainAxisPosition,
          size,
          trackIndex: minTrack,
          id,
        };
      }

      return {
        child,
        top: mainAxisPosition,
        left: (100 / trackCount) * minTrack,
        size,
        trackIndex: minTrack,
        id,
      };
    });
  }, [children, horizontal, rows, columns, horizontalGap, verticalGap, rowHeight, dimensions, columnWidth]);

  const containerSize = useMemo(() => {
    if (!positionedItems || positionedItems.length === 0) return 0;

    const trackCount = horizontal ? rows : columns;
    const trackSizes = Array(trackCount).fill(0);
    const gap = horizontal ? horizontalGap : verticalGap;

    positionedItems.forEach(item => {
      const { minIndex: minTrack, minValue: currentSize } = findLeastFilledTrack(trackSizes);
      const gapToAdd = currentSize > 0 ? gap : 0;
      trackSizes[minTrack] = currentSize + gapToAdd + item.size;
    });

    return Math.max(...trackSizes);
  }, [positionedItems, horizontal, rows, columns, verticalGap, horizontalGap]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const offset = horizontal ? e.currentTarget.scrollLeft : e.currentTarget.scrollTop;

    requestAnimationFrame(() => {
      setScrollOffset(offset);
    });
  };

  const visibleItems = useMemo(() => {
    if (!positionedItems) return [];
    if (!isVirtualizationEnabled) return positionedItems;

    return positionedItems.filter(item => {
      const itemStart = horizontal ? item.left : item.top;
      const itemEnd = itemStart + item.size;
      const viewportStart = scrollOffset - buffer;
      const viewportEnd = scrollOffset + estimatedViewportSize + buffer;

      return itemEnd >= viewportStart && itemStart <= viewportEnd;
    });
  }, [positionedItems, isVirtualizationEnabled, horizontal, scrollOffset]);

  return {
    handleScroll,
    scrollContainerRef,
    visibleItems,
    containerSize,
  };
};

export default useMasonry;
