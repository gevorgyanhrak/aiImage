'use client';

import Image from 'next/image';
import type { ReactEventHandler } from 'react';
import { useState } from 'react';
import type { IImageWithFallback } from './types';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

const ImageWithFallback = ({
  src,
  alt,
  fill,
  sizes,
  width,
  height,
  preload,
  fetchPriority = 'auto',
  className,
  fallbackSrc = ERROR_IMG_SRC,
  onError,
  blurImageDataUrl,
  ...rest
}: IImageWithFallback) => {
  const [errored, setErrored] = useState(false);

  const handleError: ReactEventHandler<HTMLImageElement> = e => {
    setErrored(true);
    onError?.(e);
  };

  const sizing = fill ? { fill: true as const, sizes: sizes ?? '(min-width:1024px) 560px, 100vw' } : { width: width ?? 600, height: height ?? 600, sizes: sizes ?? '(min-width:1024px) 560px, 100vw' };

  return (
    <Image
      src={errored ? fallbackSrc : src}
      blurDataURL={blurImageDataUrl}
      alt={alt}
      className={className}
      preload={preload}
      fetchPriority={fetchPriority}
      onError={handleError}
      {...sizing}
      {...rest}
      {...(errored ? { 'data-original-url': src } : {})}
    />
  );
};

export default ImageWithFallback;
