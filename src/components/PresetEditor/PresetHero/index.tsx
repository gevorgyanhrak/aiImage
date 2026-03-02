import { memo } from 'react';
import { TEST_IDS } from './constants/testIds';

interface IPresetHero {
  title: string;
  description: string;
}

const PresetHero = ({ title, description }: IPresetHero) => {
  return (
    <div className="flex flex-col gap-1" data-testid={TEST_IDS.CONTAINER}>
      <h2 className="text-xl md:text-xxl font-bold leading-7 antialiased text-foreground first-letter:uppercase" data-testid={TEST_IDS.TITLE}>
        {title}
      </h2>
      <p className="text-sm font-normal leading-5 tracking-normal text-foreground first-letter:uppercase overflow-hidden text-ellipsis line-clamp-2" data-testid={TEST_IDS.DESCRIPTION}>
        {description}
      </p>
    </div>
  );
};

export default memo(PresetHero);
