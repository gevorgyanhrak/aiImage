import { memo } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { PULSE_NAMES } from '@/constants/pulseNames';
import { TEST_IDS } from './constants/testIds';

type ViewMoreButtonProps = {
  href: string;
};

const ViewMoreButton = ({ href }: ViewMoreButtonProps) => {
  return (
    <div className="flex justify-center">
      <Button asChild variant="outline" className="hover:bg-muted px-8 rounded-3xl">
        <Link to={href} data-testid={TEST_IDS.CONTAINER} data-pulse-name={PULSE_NAMES.VIEW_MORE}>
          View more
        </Link>
      </Button>
    </div>
  );
};

export default memo(ViewMoreButton);
