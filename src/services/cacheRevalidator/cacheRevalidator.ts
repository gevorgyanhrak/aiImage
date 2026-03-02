import 'server-only';

class CacheRevalidator {
  private static instance: CacheRevalidator;

  static getInstance() {
    if (!CacheRevalidator.instance) {
      CacheRevalidator.instance = new CacheRevalidator();
    }
    return CacheRevalidator.instance;
  }

  async revalidate(_payload: { tag?: string; path?: string }) {
    console.log('CacheRevalidator mock: revalidate (no-op)');
  }
}

export default CacheRevalidator;
