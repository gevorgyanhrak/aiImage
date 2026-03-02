'use client';

import { useLayoutEffect, useState } from 'react';

type UseScrollSpyParams = {
  sectionIds: Array<number | string>;
  offset?: number;
};

/**
 * Hook to track which section is currently in view
 * Returns the ID of the currently active section
 */
const useScrollSpy = ({ sectionIds, offset = 120 }: UseScrollSpyParams) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      let bestId: string | number | null = null;
      let bestDistance = Infinity;
      const screenCenter = window.innerHeight / 2;

      sectionIds.forEach(id => {
        const section = document.getElementById(String(id));
        if (!section) return;

        const sectionRect = section.getBoundingClientRect();
        const isVisible = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;

        if (!isVisible) return;

        const sectionCenter = sectionRect.top + sectionRect.height / 2;

        const distance = Math.abs(sectionCenter - screenCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      });

      if (bestId !== null) {
        setActiveId(bestId);
      }
    };

    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offset]);

  return [activeId, setActiveId] as const;
};

export default useScrollSpy;
