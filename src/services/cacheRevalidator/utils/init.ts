import CacheRevalidator from '../cacheRevalidator';

const initCacheRevalidator = () => {
  try {
    CacheRevalidator.getInstance();
    console.log('✅ Cache revalidator service initialized');
  } catch (error) {
    console.error('❌ Failed to initialize cache revalidator service:', error);
    // Don't throw - allow the app to start even if cache revalidator fails
  }
};

export default initCacheRevalidator;
