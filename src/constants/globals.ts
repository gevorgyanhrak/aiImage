export const UPLOAD_BASE_URL = import.meta.env.VITE_UPLOAD_URL || 'http://localhost:3000/api/mock/upload';
export const AI_IMAGE_BASE_URL = import.meta.env.VITE_AI_IMAGE_BASE_URL || 'http://localhost:3000';

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
export const TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const HUB_DOCUMENT_ID = import.meta.env.VITE_HUB_DOCUMENT_ID;

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
export const APP_ENV = import.meta.env.MODE;
export const IS_CACHE_ENABLED = import.meta.env.VITE_CACHE_ENABLED === 'true';
