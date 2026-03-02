import 'server-only';

import { IS_CACHE_ENABLED } from '@/constants/globals';
import initRedis from '@/lib/redis/utils/init';
import initCacheRevalidator from '@/services/cacheRevalidator/utils/init';

export async function register() {
  console.log(`ℹ️ Cache enabled: ${IS_CACHE_ENABLED}`);
  if (IS_CACHE_ENABLED) {
    await initRedis();
    initCacheRevalidator();
  }
}
