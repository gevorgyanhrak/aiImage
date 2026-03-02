'use server';

export async function getFileMetadata(_url: string) {
  return {
    ok: true as const,
    data: {
      width: 800,
      height: 600,
      mimeType: 'image/jpeg',
    },
  };
}
