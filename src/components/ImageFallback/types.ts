import type { ImageProps } from 'next/image';

type IImageWithFallback = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
  blurImageDataUrl?: string;
};

export type { IImageWithFallback };
