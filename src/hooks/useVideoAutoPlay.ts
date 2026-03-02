'use client';

import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useSharedIntersectionObserver } from './useSharedIntersectionObserver';
import { useSafeVideoPlayer } from './useSafeVideoPlayer';
import { PlaybackMode } from '@/types/media';

interface UseVideoAutoplayOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  playbackMode?: PlaybackMode;
}

export const useVideoAutoplay = ({ containerRef, videoRef, playbackMode = PlaybackMode.Scheduled, threshold = 0.85, rootMargin = '50px', delay = 1000 }: UseVideoAutoplayOptions) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const entry = useSharedIntersectionObserver({
    ref: containerRef,
    threshold,
    rootMargin,
  });

  const { playVideo, pauseVideo } = useSafeVideoPlayer(videoRef);

  useEffect(() => {
    if (!entry) return;

    const isVisible = entry.isIntersecting && entry.intersectionRatio >= threshold;

    if (isVisible) {
      // User Scrolled To the video

      // 1. Handle Playback Strategy
      if (playbackMode === PlaybackMode.Instant) {
        // Play immediately
        playVideo();
      } else {
        //  Scheduled plays (Wait for delay)
        // Only start timer if one isn't already running
        if (!timerRef.current) {
          timerRef.current = setTimeout(() => {
            playVideo();
            timerRef.current = null;
          }, delay);
        }
      }
    } else {
      //  User Scrolled AWAY from video
      // If the user scrolls away before 1.5s, we must CANCEL the play request.
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 2. Stop video immediately
      pauseVideo();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [entry, threshold, delay, playVideo, pauseVideo, playbackMode]);
};
