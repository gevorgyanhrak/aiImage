import 'server-only';

export class RedisService {
  private static instance: RedisService;
  private initialized = false;

  static getInstance() {
    if (!this.instance) {
      this.instance = new RedisService();
    }
    return this.instance;
  }

  async init(_channels?: string[]) {
    this.initialized = true;
    console.log('Redis mock: init (no-op)');
  }

  async publish(_channel: string, _message: string) {
    console.log('Redis mock: publish (no-op)');
  }

  onMessage(_listener: (data: { channel: string; message: string }) => void) {
    // No-op
  }

  async disconnect() {
    // No-op
  }
}
