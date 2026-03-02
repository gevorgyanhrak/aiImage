// Common MIME → file extension mappings
// Note: This is best-effort; servers should rely on Content-Type (from Blob.type)

const MIME_TO_EXTENSION: Record<string, string> = {
  // Images
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/heic': 'heic',
  'image/heif': 'heif',

  // Video
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
};

export function getExtensionFromMime(mimeType: string, fallback: string = 'bin'): string {
  return MIME_TO_EXTENSION[mimeType] || fallback;
}
