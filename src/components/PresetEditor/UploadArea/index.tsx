'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import IdleView from './IdleView';
import UploadingView from './UploadingView';
import PreviewView from './PreviewView';
import uploadToCDN from '@/utils/uploadToCDN';
import { captureFirstFrameDataUrl } from '@/utils/captureVideoFrame';
import type { IUploadArea } from './types';
import { UploadStatus } from './types';
import { getAppStore, useAppStore } from '@/store/store';
import ErrorView from './ErrorView';
import { MediaType } from '@/types/media';
import { ErrorType } from '@/types/upload';
import { CustomEvents, EventType } from '@/types/analytics';
import type { SearchParams } from '@/types/common';
import { TEST_IDS } from './constants/testIds';
import { AD_URL_PARAMS } from '@/constants/analytics';
import sendAnalyticsEvent from '@/utils/sendAnalyticsEvent';
import setParamsInSessionStorage from '@/utils/setParamsInSessionStorage';

type UploadAreaProps = IUploadArea & {
  shouldGetMetadata?: boolean;
  searchParams: SearchParams;
};

const UploadArea = ({ id, multiplyEnabled, extensions, title, type, shouldGetMetadata, searchParams }: UploadAreaProps) => {
  const preview = useAppStore(store => store.preview[id] ?? null);
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [progress, setProgress] = useState<number>(0);

  const onClear = useCallback(() => {
    setStatus(UploadStatus.IDLE);
    getAppStore().clearPreview({ id });
    setProgress(0);
  }, [id]);

  const onFileSelect = useCallback(
    async (urls: string[]) => {
      if (!urls?.length) return;

      const [localUrl] = urls;
      setStatus(UploadStatus.UPLOADING);
      setProgress(0);

      try {
        const controller = new AbortController();
        const response = await uploadToCDN({
          sourceUrl: localUrl,
          options: {
            signal: controller.signal,
            onProgress: (p: number) => setProgress(p),
          },
          shouldGetMetadata,
        });

        const { url, width, height } = response;
        const uploadedUrl = url ?? localUrl;
        if (type === MediaType.VIDEO) {
          try {
            const firstFrameUrl = await captureFirstFrameDataUrl(localUrl);
            getAppStore().setPreview({ id, mediaUrl: firstFrameUrl, sourceUrl: uploadedUrl, type: MediaType.VIDEO, width, height });
          } catch {
            getAppStore().setPreview({ id, mediaUrl: uploadedUrl, sourceUrl: uploadedUrl, type: MediaType.IMAGE, width, height });
          }
        } else {
          getAppStore().setPreview({ id, mediaUrl: uploadedUrl, sourceUrl: uploadedUrl, type: MediaType.IMAGE, width, height });
        }
        setStatus(UploadStatus.DONE);
        sendAnalyticsEvent(CustomEvents.UploadCompleted, EventType.custom_event);
      } catch {
        setProgress(0);
        setStatus(UploadStatus.IDLE);
      }
    },
    [id, shouldGetMetadata, type],
  );

  const onError = (error: ErrorType) => {
    switch (error) {
      case ErrorType.INVALID_FILE_TYPE:
        setStatus(UploadStatus.ERROR);
        return;
      case ErrorType.NO_FILES:
        setStatus(UploadStatus.ERROR);
        return;
    }
  };

  useEffect(() => {
    if (!searchParams) return;

    setParamsInSessionStorage(AD_URL_PARAMS, searchParams);
  }, [searchParams]);

  const view = useMemo(() => {
    switch (status) {
      case UploadStatus.IDLE:
        return <IdleView extensions={extensions} type={type} title={title} onSelect={onFileSelect} multiplyEnabled={multiplyEnabled} onError={onError} />;
      case UploadStatus.UPLOADING:
        return <UploadingView progress={progress} />;
      case UploadStatus.DONE:
        return preview?.mediaUrl && <PreviewView url={preview.mediaUrl} onClear={onClear} />;
      case UploadStatus.ERROR:
        return <ErrorView extensions={extensions} type={type} onSelect={onFileSelect} multiplyEnabled={multiplyEnabled} onError={onError} />;
      default:
        return null;
    }
  }, [extensions, multiplyEnabled, onClear, onFileSelect, preview, progress, status, title, type]);

  return (
    <div id={id} className="space-y-3" data-testid={TEST_IDS.UPLOAD_AREA}>
      {view}
    </div>
  );
};

export default UploadArea;
