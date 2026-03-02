import { memo } from 'react';

import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

import BlurredPosterBackdrop from '../BlurredPosterBackdrop';

interface LazyPhotoProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
  className?: string;
  mediaClassName?: string;
  style?: CSSProperties;
  preload?: boolean;
  blurDataUrl?: string;
  dataTestId?: string;
  sizes?: string;
  isWithBackground?: boolean;
}

const LazyPhoto = ({ src, width, height, alt, title, className, mediaClassName, style, blurDataUrl, preload = false, isWithBackground = false, dataTestId }: LazyPhotoProps) => {
  const aspectRatio = `${width}/${height}`;
  const imageAlt = alt || title || 'Template preview image';

  return (
    <div
      className={cn('group relative w-full overflow-hidden rounded-lg bg-background', className)}
      style={{
        aspectRatio,
        ...style,
      }}
      data-testid={dataTestId}
    >
      {isWithBackground && <BlurredPosterBackdrop src={src} alt={`${imageAlt} background blur`} />}

      <img
        src={src}
        alt={imageAlt}
        width={width}
        height={height}
        loading={preload ? 'eager' : 'lazy'}
        fetchPriority={preload ? 'high' : 'auto'}
        className={cn('relative h-full w-full object-cover transition-all duration-300 group-hover:scale-110', mediaClassName)}
        style={{ aspectRatio }}
      />
    </div>
  );
};

export default memo(LazyPhoto);
