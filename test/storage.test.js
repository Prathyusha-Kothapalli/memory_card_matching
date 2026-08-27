/**
 * Storage Engine Unit Tests
 */
import { StorageEngine } from '../js/core/storage.js';
import { CONFIG } from '../js/config.js';

describe('StorageEngine Tests', () => {
  it('should initialize fallback in-memory state when LocalStorage is absent', () => {
    const storage = new StorageEngine('__test_key__');
    const data = storage.load();
    assert.isNotNull(data.profile, 'Profile data should be populated');
    assert.strictEqual(data.profile.username, 'MemoryChamp', 'Default username match');
  });

  it('should save and load updated player profile data', () => {
    const storage = new StorageEngine('__test_key_2__');
    const data = storage.load();
    data.profile.username = 'MasterPlayer';
    data.profile.level = 5;
    storage.save(data);

    const reloaded = storage.load();
    assert.strictEqual(reloaded.profile.username, 'MasterPlayer', 'Username should persist');
    assert.strictEqual(reloaded.profile.level, 5, 'Level should persist');
  });

  it('should merge missing schema defaults gracefully', () => {
    const storage = new StorageEngine('__test_key_3__');
    const partial = { profile: { username: 'PartialUser' } };
    const merged = storage.mergeWithDefaults(partial);
    assert.strictEqual(merged.profile.username, 'PartialUser', 'Custom username retained');
    assert.isNotNull(merged.stats, 'Stats schema added automatically');
  });
});
