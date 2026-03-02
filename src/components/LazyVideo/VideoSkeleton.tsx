import { memo } from 'react';

interface VideoSkeletonProps {
  className?: string;
  showPlayButton?: boolean;
  width: number;
  height: number;
}

const VideoSkeleton = ({ className = '', showPlayButton = true, width, height }: VideoSkeletonProps) => {
  return (
    <div className="absolute inset-0 z-10">
      <div
        className={`relative w-full bg-muted rounded-lg overflow-hidden ${className} w-full h-auto`}
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted-foreground/10 to-muted animate-pulse" />

        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            {showPlayButton && (
              <div className="w-16 h-16 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                <div className="w-0 h-0 border-l-6 border-l-muted-foreground/50 border-y-4 border-y-transparent ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(VideoSkeleton);
