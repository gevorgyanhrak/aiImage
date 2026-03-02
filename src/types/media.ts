export enum PlaybackMode {
  Instant = 'instant',
  Scheduled = 'scheduled',
}

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface Media {
  id: number;
  ext: string;
  mime: string;
  width: number;
  height: number;
  url: string;
}

export interface VideoMedia extends Media {
  poster: string;
}
