import type { VideoObjectPayload } from '@/types/jsonLd';
import type { VideoObject } from 'schema-dts';

const createVideoObjectPayload = ({ name, description, thumbnailUrl, uploadDate, contentUrl }: VideoObjectPayload): VideoObject => ({
  '@type': 'VideoObject',
  ...(name && { name }),
  ...(description && { description }),
  ...(thumbnailUrl && { thumbnailUrl }),
  ...(uploadDate && { uploadDate }),
  ...(contentUrl && { contentUrl }),
});

export { createVideoObjectPayload };
