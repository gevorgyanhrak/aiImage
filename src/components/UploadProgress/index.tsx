import type { CSSProperties } from 'react';
import { memo } from 'react';
import { Box, Flex, Progress, Text } from '@radix-ui/themes';

import { TEST_IDS } from './constants/testIds';
import type { IUploadProgress } from './types';

const DEFAULT_SUBTITLE = 'This won’t take long';
const DEFAULT_TITLE = 'Uploading your image';

const UploadProgress = ({ title = DEFAULT_TITLE, subtitle = DEFAULT_SUBTITLE, progress, className }: IUploadProgress) => {
  const clamped = progress && Math.max(0, Math.min(100, progress));

  return (
    <Box className={`rounded-2xl p6] ${className ?? ''}`} data-testid={TEST_IDS.CONTAINER}>
      <Progress value={clamped} size="1" variant="surface" className="!bg-[#3B3B3B] w-full" style={{ '--accent-track': 'var(--primary)' } as CSSProperties} data-testid={TEST_IDS.BAR} />
      <Flex direction="column" align="center" gap="1" className="mt-6 text-center">
        <Text as="p" size="3" className="!font-medium text-foreground" data-testid={TEST_IDS.TITLE}>
          {title}
        </Text>
        <Text as="p" size="2" className="!font-medium text-[#B3B3B3]" data-testid={TEST_IDS.SUBTITLE}>
          {subtitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default memo(UploadProgress);
