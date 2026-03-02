import Link from 'next/link';

import type { SliderItem } from '@/types/sectionItem';

import LazyVideo from '../LazyVideo';
import { TEST_IDS } from './constants/testIds';
// import CardLink from './CardLink';

type CardProps = {
  item: SliderItem;
  priority?: boolean;
};

const Card = ({ item, priority }: CardProps) => {
  const { media, url, title, description, video, slug } = item;

  const videoUrl = media?.url ?? video?.media.url;
  const width = media?.width ?? video?.media.width;
  const height = media?.height ?? video?.media.height;
  const poster = media?.poster ?? video?.media.poster;
  const href = slug ?? url ?? '/';

  return (
    <div className="flex w-80 shrink-0 flex-col items-stretch gap-3 rounded-xl bg-background/50 text-center shadow-sm" data-testid={TEST_IDS.CARD}>
      <Link href={href} target="_blank" className="flex flex-col gap-3 group" scroll={false} data-pulse-name={title}>
        <LazyVideo src={videoUrl} priority={priority} title={title} poster={poster} width={width} height={height} sizes="(max-width: 640px) 12rem, 24rem" />
        <div className="flex flex-col">
          <h3 className="text-start text-base font-semibold leading-6 text-white font-hrakai group-hover:text-primary transition-color duration-300">{title}</h3>
          <p className="text-start text-sm font-normal leading-6 text-muted-foreground group-hover:text-primary transition-color duration-300">{description}</p>
        </div>
      </Link>
      {/* <CardLink href={href} title={title} /> */}
    </div>
  );
};

export default Card;
