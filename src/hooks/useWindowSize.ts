'use client';

import { useState, useEffect } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

type UseWindowSizeOptions = {
  disabled?: boolean;
};

const useWindowSize = (options?: UseWindowSizeOptions): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (options?.disabled) return;

    const updateSize = () => {
      requestAnimationFrame(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        setWindowSize(prev => {
          if (prev.width === newWidth && prev.height === newHeight) return prev;
          return { width: newWidth, height: newHeight };
        });
      });
    };

    updateSize();

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [options?.disabled]);

  return windowSize;
};

export default useWindowSize;
