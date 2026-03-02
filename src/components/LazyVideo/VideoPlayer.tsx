import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VideoPlayerProps } from './types';

const VideoPlayer = ({ videoRef, src, videoLabel, className, muted, width, height, onAudioToggle, onError, onLoadedData }: VideoPlayerProps) => {
  const AudioToggleIcon = onAudioToggle && (muted ? VolumeX : Volume2);

  return (
    <div className="relative w-full h-full flex">
      <video
        ref={videoRef}
        style={{ aspectRatio: `${width}/${height}` }}
        className={cn('relative transition-transform duration-300', className)}
        loop
        src={src}
        muted={muted}
        playsInline
        preload="none"
        width={width}
        height={height}
        aria-label={videoLabel}
        onError={onError}
        onLoadedData={onLoadedData}
      />
      {AudioToggleIcon && (
        <AudioToggleIcon
          onClick={onAudioToggle}
          className="w-8 h-8 absolute bottom-3 left-3 md:bottom-4 md:left-4 p-1.5 bg-black/80 backdrop-blur-sm rounded-lg cursor-pointer z-50 transition-all hover:bg-black"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
