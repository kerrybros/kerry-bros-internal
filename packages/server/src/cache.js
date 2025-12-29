// Simple in-memory cache with TTL
class SimpleCache {
  constructor(ttlHours = 20) {
    this.cache = new Map();
    this.ttl = ttlHours * 60 * 60 * 1000; // Convert hours to milliseconds
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Check if cache is expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

export default new SimpleCache(20); // 20 hour cache

