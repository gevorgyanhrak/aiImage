import type { PosterImageProps } from './types';
import { cn } from '@/lib/utils';

const PosterImage = ({ poster, title, width, height, preload, className, onLoad }: PosterImageProps) => {
  return (
    <img
      src={poster}
      alt={title || 'Video poster'}
      width={width}
      height={height}
      className={cn('absolute inset-0 w-full h-full transition-transform duration-300 z-20', className)}
      style={{ aspectRatio: `${width}/${height}` }}
      loading={preload ? 'eager' : 'lazy'}
      fetchPriority={preload ? 'high' : 'auto'}
      onLoad={onLoad}
    />
  );
};

export default PosterImage;
