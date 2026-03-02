import type { MediaType } from '@/types/media';
import type { ErrorType } from '@/types/upload';
import type { ReactNode } from 'react';

interface IDraggableContainer {
  onFileSelect: (urls: string[]) => void;
  onError: (error: ErrorType) => void;
  children: ReactNode;
  type: MediaType;
  extensions: string[];
  multiplyEnabled?: boolean;
  tone?: 'default' | 'error';
}

export default IDraggableContainer;
