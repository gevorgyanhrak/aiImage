export interface StrapiImageFormatVariant {
  ext: string;
  mime: string;
  name: string;
  url: string;
  width: number;
  height: number;
}

export interface StrapiImageFormats {
  large?: StrapiImageFormatVariant;
  medium?: StrapiImageFormatVariant;
  small?: StrapiImageFormatVariant;
  thumbnail?: StrapiImageFormatVariant;
}

export interface StrapiMediaAsset {
  id: number;
  name: string;
  alternativeText: string | null;
  ext: string;
  mime: string;
  url: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
}
