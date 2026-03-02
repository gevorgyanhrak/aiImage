import { memo } from 'react';

import type { MediaOverlayProps } from './types';
import { TEST_IDS } from './constants/testIds';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const MediaOverlay = ({ title, titleClassName, buttonClassName, ctaButtonLabel = 'Try Free Now' }: MediaOverlayProps) => {
  return (
    <div className="hidden md:block">
      <div
        className="absolute inset-0 z-40 flex h-full w-full flex-col items-center justify-center gap-4 bg-black/60 p-5 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
        data-testid={TEST_IDS.TITLE_OVERLAY}
      >
        <div className="flex flex-col items-center justify-center gap-2" />
        {title && (
          <h3 className={cn('text-white text-sm md:text-lg items-center flex font-medium text-center grow', titleClassName)} data-testid={TEST_IDS.TITLE_TEXT}>
            {title}
          </h3>
        )}
        <Button
          variant="default"
          className={cn('pointer-events-auto rounded-full bg-primary text-sm font-semibold text-black px-6 py-2 hover:bg-primary hover:text-black hidden md:block', buttonClassName)}
          data-testid={TEST_IDS.TITLE_BUTTON}
        >
          {ctaButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default memo(MediaOverlay);
