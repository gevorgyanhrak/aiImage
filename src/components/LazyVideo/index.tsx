'use client';

import { memo, useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import hasAudioTrack from '@/utils/hasAudioTrack';

import PosterImage from './PosterImage';
import VideoPlayer from './VideoPlayer';
import type { LazyVideoProps } from './types';
import BlurredPosterBackdrop from '../BlurredPosterBackdrop';
import { useVideoAutoplay } from '@/hooks/useVideoAutoPlay';
import { PlaybackMode } from '@/types/media';
import { TEST_IDS } from './constants/testIds';

const LazyVideo = ({ src, style, poster, priority = false, title, width, height, className, mediaClassName, isWithBackground, sizes, playbackMode = PlaybackMode.Scheduled }: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [isMuted, setIsMuted] = useState(true);

  useVideoAutoplay({
    containerRef,
    videoRef,
    playbackMode,
  });

  // eslint-disable-next-line react-hooks/refs
  const hasAudioControl = Boolean(videoRef.current && isWithBackground && hasAudioTrack(videoRef.current));
  const handleAudioToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video || !hasAudioControl) {
      return;
    }

    const shouldMute = !video.muted;
    video.muted = shouldMute;
    setIsMuted(shouldMute);
  }, [hasAudioControl]);

  const handleVideoLoadedData = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const showPoster = poster && !isVideoLoaded;

  return (
    <div
      ref={containerRef}
      className={cn('group relative w-full bg-background overflow-hidden rounded-lg', className)}
      style={{
        aspectRatio: `${width}/${height}`,
        ...style,
      }}
      data-testid={TEST_IDS.VIDEO}
    >
      {showPoster && <PosterImage title={title} width={width} height={height} poster={poster} preload={priority} className={mediaClassName} sizes={sizes} />}
      {poster && isWithBackground && <BlurredPosterBackdrop src={poster} alt={`${title} background blur`} sizes={sizes} />}

      <VideoPlayer
        videoRef={videoRef}
        src={src}
        width={width}
        height={height}
        videoLabel={title ? `Preview of ${title}` : 'Preview of template video'}
        className={cn('z-38', mediaClassName)}
        muted={isMuted}
        onAudioToggle={hasAudioControl ? handleAudioToggle : undefined}
        onLoadedData={handleVideoLoadedData}
      />
    </div>
  );
};

export default memo(LazyVideo);
