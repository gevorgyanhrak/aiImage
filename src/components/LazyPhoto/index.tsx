import { memo } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
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

const DEFAULT_SIZES = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1440px) 18vw, (max-width: 1920px) 18rem, 14rem';

const LazyPhoto = ({ src, width, height, alt, title, className, mediaClassName, style, blurDataUrl, preload = false, isWithBackground = false, dataTestId, sizes = DEFAULT_SIZES }: LazyPhotoProps) => {
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
      {isWithBackground && <BlurredPosterBackdrop src={src} sizes={sizes} alt={`${imageAlt} background blur`} />}

      <Image
        src={src}
        alt={imageAlt}
        width={width}
        height={height}
        preload={preload}
        fetchPriority={preload ? 'high' : 'auto'}
        blurDataURL={blurDataUrl}
        className={cn('relative h-full w-full object-cover transition-all duration-300 group-hover:scale-110', mediaClassName)}
        style={{ aspectRatio }}
        sizes={sizes}
      />
    </div>
  );
};

export default memo(LazyPhoto);
