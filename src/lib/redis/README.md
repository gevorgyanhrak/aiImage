# Redis Service

This service provides a singleton Redis client with pub/sub capabilities that automatically initializes when the Next.js server starts.

## Features

- **Singleton Pattern**: Single Redis instance across the application
- **Auto-initialization**: Automatically connects and subscribes when the server starts
- **Pub/Sub Support**: Built-in publisher and subscriber clients
- **Event-driven**: Uses Node.js EventEmitter for message handling
- **Graceful Shutdown**: Properly disconnects on process termination

## Environment Variables

Set the following environment variables in your `.env` files:

```bash
# Redis connection URL (required)
REDIS_URL=redis://localhost:6379

# Redis channels to subscribe to (optional, comma-separated)
# Defaults to 'news' if not specified
REDIS_CHANNELS=news,updates,notifications
```

## Usage

### Listening to Messages

```typescript
import { RedisService } from '@/lib/redis/redis';

// Get the singleton instance
const redis = RedisService.getInstance();

// Listen to incoming messages
redis.onMessage(({ channel, message }) => {
  console.log(`Received on ${channel}:`, message);
  
  // Handle your message logic here
  // Example: Parse JSON, trigger updates, etc.
});
```

### Publishing Messages

```typescript
import { RedisService } from '@/lib/redis/redis';

const redis = RedisService.getInstance();

// Publish a message to a channel
await redis.publish('news', JSON.stringify({
  type: 'update',
  data: { /* your data */ }
}));
```

## Automatic Initialization

The service automatically initializes when the Next.js server starts via the `instrumentation.ts` file. Next.js automatically detects and runs this file on server startup - no configuration needed.

The instrumentation process:
1. Creates the Redis client instance
2. Connects to Redis
3. Subscribes to configured channels
4. Sets up graceful shutdown handlers

## How It Works

1. **Server Start**: Next.js calls `register()` in `instrumentation.ts`
2. **Redis Connect**: Both publisher and subscriber clients connect to Redis
3. **Subscribe**: Subscriber subscribes to configured channels
4. **Ready**: Service is ready to receive and send messages
5. **Shutdown**: On SIGTERM/SIGINT, clients disconnect gracefully

## Error Handling

- If Redis fails to initialize, the error is logged but doesn't prevent the app from starting
- All connection errors are caught and logged
- The `publish()` method checks if the service is initialized before publishing

## Example: Real-time Updates

```typescript
// In your API route or server component
import { RedisService } from '@/lib/redis/redis';

export async function POST(request: Request) {
  const data = await request.json();
  
  const redis = RedisService.getInstance();
  
  // Publish an update to all subscribers
  await redis.publish('updates', JSON.stringify({
    timestamp: Date.now(),
    ...data
  }));
  
  return Response.json({ success: true });
}
```

