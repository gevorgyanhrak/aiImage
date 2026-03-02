import type { MediaType } from '@/types/media';

export interface IUploadArea {
  id: string;
  multiplyEnabled?: boolean;
  extensions: string[];
  title: string;
  type: MediaType;
}

export enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  DONE = 'done',
  ERROR = 'error',
}
