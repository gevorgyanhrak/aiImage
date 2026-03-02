import type { PlaybackMode } from '@/types/media';
import type { CSSProperties, RefObject } from 'react';

export interface LazyVideoProps {
  src: string;
  style?: CSSProperties;
  poster?: string;
  priority?: boolean;
  title?: string;
  width: number;
  height: number;
  showLoadingText?: boolean;
  className?: string;
  mediaClassName?: string;
  isWithBackground?: boolean;
  sizes?: string;
  playbackMode?: PlaybackMode;
}

export interface PosterImageProps {
  poster: string;
  className?: string;
  title?: string;
  width: number;
  height: number;
  onLoad?: () => void;
  preload: boolean;
  sizes?: string;
}

export interface VideoPlayerProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  className?: string;
  src: string;
  videoLabel?: string;
  muted: boolean;
  width: number;
  height: number;
  onAudioToggle?: () => void;
  onError?: () => void;
  onLoadedData?: () => void;
}
