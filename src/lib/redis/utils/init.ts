import { RedisService } from '../redis';
import { REDIS_CHANNELS } from '../constants/general';

const initRedis = async () => {
  try {
    console.log('🚀 Initializing Redis service...');

    const redisService = RedisService.getInstance();

    const channels = REDIS_CHANNELS;

    await redisService.init(channels);

    console.log(`✅ Redis service initialized and subscribed to channels: ${channels.join(', ')}`);

    // Graceful shutdown handler
    const shutdown = async () => {
      console.log('🔄 Shutting down Redis service...');
      await redisService.disconnect();
      console.log('✅ Redis service disconnected');
    };

    // Only register shutdown handlers in Node.js runtime (not Edge Runtime)
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);
    }
  } catch (error) {
    console.error('❌ Failed to initialize Redis service:', error);
    // Don't throw - allow the app to start even if Redis fails
  }
};

export default initRedis;
