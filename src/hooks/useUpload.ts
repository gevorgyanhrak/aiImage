import { ErrorType } from '@/types/upload';
import { isValidFileType } from '@/utils/isValidFileType';
import type { ChangeEvent, DragEvent, SyntheticEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

type UseUploadProps = {
  onFileSelect?: (urls: string[]) => void;
  setError?: (errorType: ErrorType) => void;
  validFileTypes: string;
};

const filterValidFileTypes = (files: File[] | FileList, validFileTypes: string) => Array.from(files).filter(file => isValidFileType(file.type, validFileTypes));

const useUpload = ({ onFileSelect, setError, validFileTypes }: UseUploadProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFilesLoaded, setFilesLoaded] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    inputRef.current?.click();
  }, []);

  const clearRef = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files ? Array.from(event.target.files) : null;
      if (!files?.length) {
        setError?.(ErrorType.NO_FILES);
        return null;
      }

      const validFiles = filterValidFileTypes(files, validFileTypes);
      if (!validFiles.length) {
        setError?.(ErrorType.NO_FILES);
        return null;
      }

      const blobUrls = validFiles.map(file => URL.createObjectURL(file));
      onFileSelect?.(blobUrls);
      setFilesLoaded(true);
      return blobUrls;
    },
    [onFileSelect, setError, validFileTypes],
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    [setIsDragging],
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const dataTransfer = event.dataTransfer;

      if (!Array.from(dataTransfer.types).includes('Files')) {
        setError?.(ErrorType.INVALID_FILE_TYPE);
        return;
      }

      const files = dataTransfer.files;

      if (!files) return;

      // for only supporting one dragged file, later as I understand we'll support multiple images
      const validFiles = filterValidFileTypes([files[0]], validFileTypes);

      if (!validFiles.length) {
        setError?.(ErrorType.NO_FILES);
        return;
      }

      const blobUrls = validFiles.map(file => URL.createObjectURL(file));
      onFileSelect?.(blobUrls);
      setFilesLoaded(true);
    },
    [onFileSelect, setError, validFileTypes],
  );

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  return {
    inputRef,
    isFilesLoaded,
    isDragging,
    triggerUpload,
    clearRef,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnter,
  };
};

export default useUpload;
