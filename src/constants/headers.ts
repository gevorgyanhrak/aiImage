import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from './globals';

const CF_ACCESS_HEADERS = {
  ...(CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET ? { 'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID, 'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET } : {}),
};

export default CF_ACCESS_HEADERS;
