/**
 * Memory Match Arena - Achievement Manager Engine
 * Manages 20+ achievement definitions, progress evaluation listeners, and unlock toast notifications.
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';
import { toastManager } from '../ui/toast.js';

export const ACHIEVEMENTS = [
  { id: 'first_win', name: 'First Victory', desc: 'Win your first memory match game', icon: '🏆', maxProgress: 1 },
  { id: 'speed_master', name: 'Speed Master', desc: 'Complete a match in under 45 seconds', icon: '⚡', maxProgress: 1 },
  { id: 'perfect_memory', name: 'Perfect Memory', desc: 'Achieve 100% accuracy in a game', icon: '🧠', maxProgress: 1 },
  { id: 'combo_king', name: 'Combo King', desc: 'Reach a 5x combo multiplier', icon: '🔥', maxProgress: 5 },
  { id: 'under_30_moves', name: 'Under 30 Moves', desc: 'Win a game in under 30 total moves', icon: '🎯', maxProgress: 1 },
  { id: 'win_streak_10', name: '10 Win Streak', desc: 'Win 10 games in a row', icon: '👑', maxProgress: 10 },
  { id: 'theme_collector', name: 'Theme Collector', desc: 'Play matches using 4 different visual themes', icon: '🎨', maxProgress: 4 },
  { id: 'daily_challenger', name: 'Daily Challenger', desc: 'Complete your first Daily Challenge', icon: '📅', maxProgress: 1 },
  { id: 'zen_master', name: 'Zen Master', desc: 'Complete 3 relaxed games in Zen Mode', icon: '🧘', maxProgress: 3 },
  { id: 'expert_conqueror', name: 'Expert Conqueror', desc: 'Win a game on 10x10 Expert difficulty', icon: '🌌', maxProgress: 1 },
  { id: 'ultra_accuracy', name: 'Ultra Accuracy', desc: 'Finish 5 games with >85% accuracy', icon: '🏹', maxProgress: 5 },
  { id: 'move_efficiency', name: 'Move Efficiency', desc: 'Complete an Easy match in 12 or fewer moves', icon: '⚡', maxProgress: 1 },
  { id: 'powerup_prodigy', name: 'Power-Up Prodigy', desc: 'Use 10 hints or shuffles across matches', icon: '💡', maxProgress: 10 },
  { id: 'night_owl', name: 'Night Owl', desc: 'Play 5 total games', icon: '🦉', maxProgress: 5 },
  { id: 'level_10_champion', name: 'Level 10 Champion', desc: 'Reach Player Level 10', icon: '⭐', maxProgress: 10 },
  { id: 'high_scorer', name: 'High Scorer', desc: 'Score over 5,000 points in a single match', icon: '🥇', maxProgress: 5000 },
  { id: 'card_veteran', name: 'Card Veteran', desc: 'Play 25 total games', icon: '🃏', maxProgress: 25 },
  { id: 'timed_survivor', name: 'Timed Survivor', desc: 'Win 3 Timed Mode matches', icon: '⏱️', maxProgress: 3 },
  { id: 'streak_master_7', name: '7-Day Streak Master', desc: 'Maintain a 7-day daily login streak', icon: '🗓️', maxProgress: 7 },
  { id: 'completionist', name: 'Completionist', desc: 'Unlock 15 total achievements', icon: '🌟', maxProgress: 15 }
];

export class AchievementManager {
  constructor() {
    this.data = storage.load();
    this.setupListeners();
  }

  setupListeners() {
    eventBus.on('game:victory', (data) => this.evaluateGameVictory(data));
    eventBus.on('profile:updated', () => this.evaluateProfileProgress());
  }

  getAchievements() {
    const userAchievements = this.data.achievements || {};
    return ACHIEVEMENTS.map(ach => {
      const userState = userAchievements[ach.id] || { unlocked: false, progress: 0, unlockedAt: null };
      return {
        ...ach,
        unlocked: userState.unlocked,
        progress: userState.progress,
        unlockedAt: userState.unlockedAt
      };
    });
  }

  unlock(achId) {
    if (!this.data.achievements) this.data.achievements = {};
    const existing = this.data.achievements[achId];
    if (existing && existing.unlocked) return;

    const achDef = ACHIEVEMENTS.find(a => a.id === achId);
    if (!achDef) return;

    this.data.achievements[achId] = {
      unlocked: true,
      progress: achDef.maxProgress,
      unlockedAt: new Date().toISOString()
    };

    storage.save(this.data);
    toastManager.show('ACHIEVEMENT UNLOCKED! 🏆', `${achDef.name}: ${achDef.desc}`, 'achievement', 5000);
    eventBus.emit('achievement:unlocked', achDef);
  }

  updateProgress(achId, progressVal) {
    if (!this.data.achievements) this.data.achievements = {};
    const existing = this.data.achievements[achId];
    if (existing && existing.unlocked) return;

    const achDef = ACHIEVEMENTS.find(a => a.id === achId);
    if (!achDef) return;

    const newProg = Math.min(achDef.maxProgress, (existing ? existing.progress : 0) + progressVal);
    this.data.achievements[achId] = {
      unlocked: newProg >= achDef.maxProgress,
      progress: newProg,
      unlockedAt: newProg >= achDef.maxProgress ? new Date().toISOString() : null
    };

    storage.save(this.data);
    if (newProg >= achDef.maxProgress) {
      toastManager.show('ACHIEVEMENT UNLOCKED! 🏆', `${achDef.name}: ${achDef.desc}`, 'achievement', 5000);
      eventBus.emit('achievement:unlocked', achDef);
    }
  }

  evaluateGameVictory(data) {
    this.unlock('first_win');
    if (data.elapsedSeconds <= 45) this.unlock('speed_master');
    if (data.scoreResult.accuracy >= 100) this.unlock('perfect_memory');
    if (data.highestCombo >= 5) this.unlock('combo_king');
    if (data.moves < 30) this.unlock('under_30_moves');
    if (data.difficulty === 'expert') this.unlock('expert_conqueror');
    if (data.difficulty === 'easy' && data.moves <= 12) this.unlock('move_efficiency');
    if (data.scoreResult.totalScore >= 5000) this.unlock('high_scorer');

    this.updateProgress('night_owl', 1);
    this.updateProgress('card_veteran', 1);
    if (data.mode === 'zen') this.updateProgress('zen_master', 1);
    if (data.mode === 'timed') this.updateProgress('timed_survivor', 1);
  }

  evaluateProfileProgress() {
    const profile = this.data.profile;
    if (profile.level >= 10) this.unlock('level_10_champion');
    if (profile.loginStreak >= 7) this.unlock('streak_master_7');
  }
}

export const achievementManager = new AchievementManager();
