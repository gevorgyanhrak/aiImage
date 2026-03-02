import { useMemo } from 'react';

import type { ColumnsCount } from '@/types/masonry';

import useWindowSize from './useWindowSize';

enum MASONRY_BREAKPOINT {
  SMALL = 375,
  MEDIUM = 768,
  LARGE = 1024,
  EXTRA_LARGE = 1280,
  ULTRA_LARGE = 1600,
  FULL_HD = 1920,
  XXL = 2560,
}

type UseMasonryColumnsProps = {
  columnsCount: ColumnsCount;
  defaultColumn?: number;
};

const useMasonryColumns = ({ columnsCount, defaultColumn = columnsCount.XXL }: UseMasonryColumnsProps) => {
  const { width: windowWidth } = useWindowSize();

  const isReady = windowWidth > 0;

  const columns = useMemo(() => {
    if (windowWidth < MASONRY_BREAKPOINT.SMALL) return columnsCount.Small;
    if (windowWidth < MASONRY_BREAKPOINT.MEDIUM) return columnsCount.Medium;
    if (windowWidth < MASONRY_BREAKPOINT.LARGE) return columnsCount.Large;
    if (windowWidth < MASONRY_BREAKPOINT.EXTRA_LARGE) return columnsCount.ExtraLarge;
    if (windowWidth < MASONRY_BREAKPOINT.ULTRA_LARGE) return columnsCount.UltraLarge;
    if (windowWidth < MASONRY_BREAKPOINT.FULL_HD) return columnsCount.FullHD;
    if (windowWidth < MASONRY_BREAKPOINT.XXL) return columnsCount.FullHD;

    return defaultColumn;
  }, [windowWidth, columnsCount, defaultColumn]);

  return { columns, isReady };
};

export default useMasonryColumns;
