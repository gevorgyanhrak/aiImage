import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MediaType } from '@/types/media';
import { FILE_EXTENSION_TO_MIME } from '@/constants/fileTypes';

const IMAGE_FALLBACK_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_FALLBACK_TYPES = ['video/mp4', 'video/webm'];

export function buildAcceptFromExtensions({ type, extensions }: { type: MediaType; extensions: string[] }): string {
  const fallback = type === MediaType.IMAGE ? IMAGE_FALLBACK_TYPES : VIDEO_FALLBACK_TYPES;

  const mimes = extensions.map(ext => FILE_EXTENSION_TO_MIME[ext.toUpperCase()] || []);
  const unique = Array.from(new Set(mimes.length ? mimes : fallback));
  return unique.join(',');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
