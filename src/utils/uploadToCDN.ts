type UploadOptions = {
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
};

type UploadToCDNProps = {
  sourceUrl: string;
  options?: UploadOptions;
  shouldGetMetadata?: boolean;
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const uploadToCDN = async ({ sourceUrl, options }: UploadToCDNProps) => {
  const { onProgress } = options ?? {};

  // Simulate realistic upload progress
  if (onProgress) {
    onProgress(20);
    await delay(300);
    onProgress(60);
    await delay(400);
    onProgress(90);
    await delay(200);
    onProgress(100);
  } else {
    await delay(500);
  }

  return {
    url: sourceUrl,
    download_url: sourceUrl,
    width: 800,
    height: 600,
  };
};

export default uploadToCDN;
