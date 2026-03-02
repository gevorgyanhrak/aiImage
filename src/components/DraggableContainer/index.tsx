import { cn } from '@/lib/utils';
import { buildAcceptFromExtensions } from '@/lib/utils';
import useUpload from '@/hooks/useUpload';
import { TEST_IDS } from './constants/testIds';
import type IDraggableContainer from './types';
import { PULSE_NAMES } from '@/constants/pulseNames';

const fileAccept = 'image/png,image/jpeg,image/webp,image/heic,image/heif';

const DraggableContainer = ({ onFileSelect, onError, children, multiplyEnabled, tone = 'default', type, extensions }: IDraggableContainer) => {
  const accept = type && extensions?.length ? buildAcceptFromExtensions({ type, extensions }) : fileAccept;
  const { inputRef, handleDragOver, handleDragLeave, handleDrop, handleFileChange, triggerUpload } = useUpload({
    onFileSelect,
    setError: onError,
    validFileTypes: accept,
  });

  return (
    <>
      <div
        role="button"
        aria-pressed="false"
        tabIndex={0}
        onClick={triggerUpload}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex h-40 w-full cursor-pointer bg-upload-gradient flex-col items-center justify-center gap-3 transition-all outline-none rounded-[var(--radius)] border-1 border-primary  border-dashed',
          tone === 'error' && 'border-destructive/70',
        )}
        data-testid={TEST_IDS.DROPZONE}
        data-pulse-clickable
        data-pulse-name={PULSE_NAMES.UPLOAD_AREA}
      >
        {children}
      </div>
      <input className="hidden" type="file" ref={inputRef} multiple={multiplyEnabled} accept={accept} onChange={handleFileChange} data-testid={TEST_IDS.FILE_INPUT} />
    </>
  );
};

export default DraggableContainer;
