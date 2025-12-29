import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to store cached data
const CACHE_DIR = path.join(__dirname, '../../data');
const CACHE_FILE = path.join(CACHE_DIR, 'customer-spend.json');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

/**
 * Persistent file-based cache
 * Data is stored as JSON on disk and survives server restarts
 */
class PersistentCache {
  constructor() {
    this.memoryCache = new Map();
    this.loadFromDisk();
  }

  /**
   * Load cached data from disk into memory on server startup
   */
  loadFromDisk() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const fileContent = fs.readFileSync(CACHE_FILE, 'utf8');
        const data = JSON.parse(fileContent);
        
        // Load into memory cache
        Object.entries(data).forEach(([key, value]) => {
          this.memoryCache.set(key, value);
        });
        
        console.log('📂 Loaded cached data from disk');
      } else {
        console.log('📂 No cached data file found - will create on first refresh');
      }
    } catch (error) {
      console.error('❌ Error loading cache from disk:', error.message);
    }
  }

  /**
   * Save data to both memory and disk
   */
  set(key, value) {
    const cacheEntry = {
      value,
      timestamp: Date.now()
    };
    
    // Store in memory
    this.memoryCache.set(key, cacheEntry);
    
    // Persist to disk
    this.saveToDisk();
  }

  /**
   * Get data from memory cache
   */
  get(key) {
    const item = this.memoryCache.get(key);
    if (!item) return null;
    return item.value;
  }

  /**
   * Save all cache data to disk
   */
  saveToDisk() {
    try {
      const cacheData = {};
      this.memoryCache.forEach((value, key) => {
        cacheData[key] = value;
      });
      
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf8');
      console.log('💾 Cache saved to disk');
    } catch (error) {
      console.error('❌ Error saving cache to disk:', error.message);
    }
  }

  /**
   * Clear cache (both memory and disk)
   */
  clear() {
    this.memoryCache.clear();
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
    }
  }
}

export default new PersistentCache();
