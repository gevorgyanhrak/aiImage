'use client';

import Image from 'next/image';
import type { PosterImageProps } from './types';
import { cn } from '@/lib/utils';

const DEFAULT_SIZES = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1440px) 18vw, (max-width: 1920px) 18rem, 14rem';

const PosterImage = ({ poster, title, width, height, preload, className, onLoad, sizes = DEFAULT_SIZES }: PosterImageProps) => {
  return (
    <Image
      src={poster}
      alt={title || 'Video poster'}
      width={width}
      height={height}
      className={cn('absolute inset-0 w-full h-full transition-transform duration-300 z-20', className)}
      style={{ aspectRatio: `${width}/${height}` }}
      preload={preload}
      fetchPriority={preload ? 'high' : 'auto'}
      onLoad={onLoad}
      sizes={sizes}
    />
  );
};

export default PosterImage;
