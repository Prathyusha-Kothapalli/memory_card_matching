/**
 * Memory Match Arena - LocalStorage Data Engine
 * Wraps LocalStorage with schema validation, fallback in-memory state, and import/export capabilities.
 */
import { CONFIG } from '../config.js';

export class StorageEngine {
  constructor(storageKey = CONFIG.STORAGE_KEY) {
    this.storageKey = storageKey;
    this.inMemoryFallback = null;
    this.isLocalStorageAvailable = this.checkLocalStorageSupport();
  }

  /**
   * Check if browser LocalStorage is supported and writable
   * @returns {boolean}
   */
  checkLocalStorageSupport() {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return false;
      }
      const testKey = '__mma_test_key__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Load complete player state from storage or return default schema
   * @returns {Object} Player data object
   */
  load() {
    if (!this.isLocalStorageAvailable) {
      if (!this.inMemoryFallback) {
        this.inMemoryFallback = JSON.parse(JSON.stringify(CONFIG.DEFAULT_PLAYER_DATA));
      }
      return this.inMemoryFallback;
    }

    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) {
        const initialData = JSON.parse(JSON.stringify(CONFIG.DEFAULT_PLAYER_DATA));
        this.save(initialData);
        return initialData;
      }

      const parsed = JSON.parse(raw);
      return this.mergeWithDefaults(parsed);
    } catch (err) {
      console.error('[StorageEngine] Failed to parse LocalStorage payload. Resetting to default.', err);
      const defaultData = JSON.parse(JSON.stringify(CONFIG.DEFAULT_PLAYER_DATA));
      this.save(defaultData);
      return defaultData;
    }
  }

  /**
   * Merge loaded state with default template to ensure schema integrity across updates
   * @param {Object} data 
   * @returns {Object} Deeply merged state
   */
  mergeWithDefaults(data) {
    const defaults = CONFIG.DEFAULT_PLAYER_DATA;
    return {
      profile: { ...defaults.profile, ...(data.profile || {}) },
      settings: { ...defaults.settings, ...(data.settings || {}) },
      stats: {
        ...defaults.stats,
        ...(data.stats || {}),
        fastestTimeByDifficulty: {
          ...defaults.stats.fastestTimeByDifficulty,
          ...((data.stats && data.stats.fastestTimeByDifficulty) || {})
        },
        fewestMovesByDifficulty: {
          ...defaults.stats.fewestMovesByDifficulty,
          ...((data.stats && data.stats.fewestMovesByDifficulty) || {})
        },
        themePlayCounts: {
          ...defaults.stats.themePlayCounts,
          ...((data.stats && data.stats.themePlayCounts) || {})
        },
        difficultyPlayCounts: {
          ...defaults.stats.difficultyPlayCounts,
          ...((data.stats && data.stats.difficultyPlayCounts) || {})
        }
      },
      achievements: data.achievements || {},
      dailyChallengeHistory: data.dailyChallengeHistory || {},
      leaderboards: Array.isArray(data.leaderboards) ? data.leaderboards : []
    };
  }

  /**
   * Save player data object to storage
   * @param {Object} data 
   * @returns {boolean} Success status
   */
  save(data) {
    if (!this.isLocalStorageAvailable) {
      this.inMemoryFallback = JSON.parse(JSON.stringify(data));
      return true;
    }

    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error('[StorageEngine] Failed to write to LocalStorage:', err);
      return false;
    }
  }

  /**
   * Reset all stored data back to defaults
   */
  clear() {
    if (this.isLocalStorageAvailable) {
      window.localStorage.removeItem(this.storageKey);
    }
    this.inMemoryFallback = null;
  }

  /**
   * Export player data as JSON string for backup
   * @returns {string}
   */
  exportJSON() {
    const data = this.load();
    return JSON.stringify(data, null, 2);
  }

  /**
   * Import player data from JSON string backup
   * @param {string} jsonString 
   * @returns {boolean}
   */
  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.profile || !parsed.stats) {
        throw new Error('Invalid backup data structure: missing profile or stats.');
      }
      const validated = this.mergeWithDefaults(parsed);
      return this.save(validated);
    } catch (err) {
      console.error('[StorageEngine] Import failed:', err);
      return false;
    }
  }
}

export const storage = new StorageEngine();
