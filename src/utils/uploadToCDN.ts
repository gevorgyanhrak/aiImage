type UploadOptions = {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

type UploadToCDNProps = {
  sourceUrl: string;
  options?: UploadOptions;
  shouldGetMetadata?: boolean;
};

const uploadToCDN = async ({ sourceUrl, options }: UploadToCDNProps) => {
  const { onProgress } = options ?? {};

  // Simulate upload progress
  if (onProgress) {
    onProgress(25);
    onProgress(50);
    onProgress(75);
    onProgress(100);
  }

  return {
    url: sourceUrl,
    download_url: sourceUrl,
    width: 800,
    height: 600,
  };
};

export default uploadToCDN;
