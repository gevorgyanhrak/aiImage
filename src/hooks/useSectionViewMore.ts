import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

type Params = {
  contentRef: RefObject<HTMLDivElement | null>;
  maxHeight: number;
  isReady: boolean;
};

const useSectionViewMore = ({ contentRef, maxHeight, isReady }: Params) => {
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    if (!contentRef?.current || !isReady) {
      return;
    }
    const updateShowMoreButton = (height: number) => {
      requestAnimationFrame(() => {
        setShowMoreButton(height > maxHeight);
      });
    };
    // Use ResizeObserver to avoid forced reflow when measuring height
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        // Use contentBoxSize for more accurate measurements without forcing reflow
        const height = entry.contentBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        updateShowMoreButton(height);
      });
    });
    resizeObserver.observe(contentRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [contentRef, maxHeight, isReady]);

  return {
    showMoreButton,
  };
};

export default useSectionViewMore;
