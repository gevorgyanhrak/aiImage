type IImageWithFallback = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  fill?: boolean;
  preload?: boolean;
  fallbackSrc?: string;
  blurImageDataUrl?: string;
};

export type { IImageWithFallback };
