import { MediaType } from '@/types/media';
import type { SectionItem } from '@/types/sectionItem';

import LazyVideo from '../LazyVideo';
import LazyPhoto from '../LazyPhoto';
import { PlaybackMode } from '@/types/media';
import { TEST_IDS } from './constants/testIds';

const DEFAULT_MEDIA_SIZES = '(max-width: 640px) 35vw, (max-width: 1024px) 30vw, (max-width: 1440px) 14vw, (max-width: 1920px) 14rem, 22rem';

type MediaProps = {
  item: SectionItem;
  priority?: boolean;
  className?: string;
  mediaClassName?: string;
  isWithBackground?: boolean;
  sizes?: string;
  playbackMode?: PlaybackMode;
};

const Media = ({ item, priority, className, mediaClassName, isWithBackground, sizes = DEFAULT_MEDIA_SIZES, playbackMode = PlaybackMode.Scheduled }: MediaProps) => {
  const { media, title, type } = item;

  if (!media) {
    return null;
  }

  const { width, height, url } = media;

  switch (type) {
    case MediaType.VIDEO:
      return (
        <LazyVideo
          src={url}
          priority={priority}
          title={title}
          poster={media.poster}
          width={width}
          height={height}
          className={className}
          mediaClassName={mediaClassName}
          isWithBackground={isWithBackground}
          sizes={sizes}
          playbackMode={playbackMode}
        />
      );
    case MediaType.IMAGE:
      return (
        <LazyPhoto
          src={media.url}
          width={width}
          height={height}
          title={title}
          alt={title}
          blurDataUrl={item?.blurDataUrl}
          preload={priority}
          className={className}
          mediaClassName={mediaClassName}
          isWithBackground={isWithBackground}
          dataTestId={TEST_IDS.PHOTO}
          sizes={sizes}
        />
      );
    default:
      return null;
  }
};

export default Media;
