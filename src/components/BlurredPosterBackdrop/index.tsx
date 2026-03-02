import Image from 'next/image';
import { cn } from '@/lib/utils';
import { memo } from 'react';

type BlurredBackdropProps = {
  src: string;
  className?: string;
  alt?: string;
  sizes?: string;
};

const BlurredBackdrop = ({ src, className, alt, sizes }: BlurredBackdropProps) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden rounded-lg', className)} aria-hidden="true">
      <Image src={src} alt={alt ?? ''} fill loading="eager" sizes={sizes} draggable={false} className="scale-110 blur-2xl" />
    </div>
  );
};

export default memo(BlurredBackdrop);
