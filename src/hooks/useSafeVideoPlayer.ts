import type { RefObject } from 'react';
import { useCallback, useRef } from 'react';

export const useSafeVideoPlayer = (videoRef: RefObject<HTMLVideoElement | null>) => {
  const playPromiseRef = useRef<Promise<void> | null>(null);

  const playVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || playPromiseRef.current) return;

    const playPromise = video.play();
    if (!playPromise) return;

    playPromiseRef.current = playPromise
      .catch(() => {
        // TODO: handle error properly
        // if (error.name !== 'AbortError') {
        //   console.error('Autoplay blocked:', error);
        // }
      })
      .finally(() => {
        playPromiseRef.current = null;
      });
  }, [videoRef]);

  const pauseVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const waitForPlay = playPromiseRef.current ?? Promise.resolve();
    waitForPlay.then(() => {
      if (!video.paused) video.pause();
    });
  }, [videoRef]);

  return { playVideo, pauseVideo };
};
