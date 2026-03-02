import { cn } from '@/lib/utils';
import { memo } from 'react';

type BlurredBackdropProps = {
  src: string;
  className?: string;
  alt?: string;
  sizes?: string;
};

const BlurredBackdrop = ({ src, className, alt }: BlurredBackdropProps) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden rounded-lg', className)} aria-hidden="true">
      <img src={src} alt={alt ?? ''} loading="eager" draggable={false} className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl" />
    </div>
  );
};

export default memo(BlurredBackdrop);
