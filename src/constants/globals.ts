// Must be NEXT_PUBLIC_* because uploads are triggered from client components
export const UPLOAD_BASE_URL = process.env.NEXT_PUBLIC_UPLOAD_URL || 'http://localhost:3000/api/mock/upload';
export const PICSART_BASE_URL = process.env.NEXT_PUBLIC_PICSART_BASE_URL || 'http://localhost:3000';

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
export const TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
export const CF_ACCESS_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID;
export const CF_ACCESS_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET;

export const HUB_DOCUMENT_ID = process.env.NEXT_PUBLIC_HUB_DOCUMENT_ID;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const APP_ENV = process.env.APP_ENV || process.env.NODE_ENV;
export const IS_CACHE_ENABLED = process.env.NEXT_PUBLIC_CACHE_ENABLED === 'true';
