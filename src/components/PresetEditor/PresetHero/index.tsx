import { memo } from 'react';
import { TEST_IDS } from './constants/testIds';

interface IPresetHero {
  title: string;
  description: string;
}

const PresetHero = ({ title, description }: IPresetHero) => {
  return (
    <div className="flex flex-col gap-2" data-testid={TEST_IDS.CONTAINER}>
      <h2
        className="text-[22px] md:text-[26px] font-semibold leading-tight tracking-[-0.01em] text-white first-letter:uppercase"
        data-testid={TEST_IDS.TITLE}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-sm leading-relaxed text-white/45 first-letter:uppercase line-clamp-3"
          data-testid={TEST_IDS.DESCRIPTION}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default memo(PresetHero);
