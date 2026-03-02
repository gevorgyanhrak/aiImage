import type { HowToPayload } from '@/types/jsonLd';
import type { HowTo } from 'schema-dts';

const createHowToPayload = ({ name, description, steps }: HowToPayload): HowTo => ({
  '@type': 'HowTo',
  ...(name && { name }),
  ...(description && { description }),
  ...(steps && { steps }),
});

export { createHowToPayload };
