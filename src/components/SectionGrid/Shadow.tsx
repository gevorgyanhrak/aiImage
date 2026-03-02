import { memo } from 'react';
import { cn } from '@/lib/utils';

type ShadowProps = {
  dataTestId?: string;
  className?: string;
};

const Shadow = ({ dataTestId, className }: ShadowProps) => (
  <div
    className={cn('absolute bottom-0 left-0 right-0 h-40 pointer-events-none bg-[linear-gradient(to_top,var(--background)_0%,var(--background)_20%,transparent_100%)]', className)}
    data-testid={dataTestId}
  />
);

export default memo(Shadow);
