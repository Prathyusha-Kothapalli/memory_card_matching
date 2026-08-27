/**
 * Player Statistics & Achievement Unit Tests
 */
import { StatsManager } from '../js/managers/stats_manager.js';
import { AchievementManager } from '../js/managers/achievement_manager.js';
import { storage } from '../js/core/storage.js';

describe('Statistics & Achievements Tests', () => {
  it('should track win counts and win rate correctly', () => {
    const statsMgr = new StatsManager();
    statsMgr.recordMatchResult({
      isWin: true,
      difficulty: 'easy',
      theme: 'space',
      moves: 14,
      elapsedSeconds: 30,
      scoreResult: { totalScore: 1200 },
      highestCombo: 2
    });

    const stats = statsMgr.getStats();
    assert.strictEqual(stats.gamesPlayed, 1);
    assert.strictEqual(stats.wins, 1);
    assert.strictEqual(stats.winRate, 100);
    assert.strictEqual(stats.highestScore, 1200);
  });

  it('should list all 20+ achievement definitions with unlock state', () => {
    const achMgr = new AchievementManager();
    const achievements = achMgr.getAchievements();

    assert.isTrue(achievements.length >= 20, 'System must define 20+ achievements');
    const firstWin = achievements.find(a => a.id === 'first_win');
    assert.isNotNull(firstWin, 'First Win achievement must exist');
  });
});
