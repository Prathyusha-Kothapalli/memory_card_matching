/**
 * Memory Match Arena - Player Profile & Progression Manager
 * Handles XP rewards, leveling formula, rank titles, avatar selection, and daily login streak rewards.
 */
import { CONFIG } from '../config.js';
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';
import { toastManager } from '../ui/toast.js';

export class ProfileManager {
  constructor() {
    this.data = storage.load();
    this.checkDailyLoginStreak();
  }

  /**
   * Get player profile object
   */
  getProfile() {
    return this.data.profile;
  }

  /**
   * Calculate XP required for a given level
   * Formula: BASE_XP * (level ^ EXPONENT)
   * @param {number} level 
   * @returns {number}
   */
  getXPForLevel(level) {
    return Math.floor(CONFIG.LEVEL_BASE_XP * Math.pow(level, CONFIG.LEVEL_EXPONENT));
  }

  /**
   * Get rank title info for current level
   * @param {number} level 
   * @returns {{ title: string, badge: string }}
   */
  getRankTitle(level = this.data.profile.level) {
    let currentRank = CONFIG.RANK_TITLES[0];
    for (const rank of CONFIG.RANK_TITLES) {
      if (level >= rank.minLevel) {
        currentRank = rank;
      }
    }
    return currentRank;
  }

  /**
   * Add XP points to player profile and check for level-up
   * @param {number} amount 
   * @returns {{ leveledUp: boolean, newLevel: number, xpGained: number }}
   */
  addXP(amount) {
    if (amount <= 0) return { leveledUp: false, newLevel: this.data.profile.level, xpGained: 0 };

    this.data.profile.xp += amount;
    let leveledUp = false;
    let requiredXP = this.getXPForLevel(this.data.profile.level);

    while (this.data.profile.xp >= requiredXP) {
      this.data.profile.xp -= requiredXP;
      this.data.profile.level += 1;
      leveledUp = true;
      requiredXP = this.getXPForLevel(this.data.profile.level);

      // Emit level up event
      eventBus.emit('profile:level_up', {
        level: this.data.profile.level,
        rank: this.getRankTitle(this.data.profile.level)
      });

      toastManager.show('LEVEL UP! 🎉', `You reached Level ${this.data.profile.level}!`, 'levelup', 4500);
    }

    storage.save(this.data);
    eventBus.emit('profile:updated', this.data.profile);

    return {
      leveledUp,
      newLevel: this.data.profile.level,
      xpGained: amount
    };
  }

  /**
   * Update username
   * @param {string} newUsername 
   */
  setUsername(newUsername) {
    this.data.profile.username = newUsername.trim();
    storage.save(this.data);
    eventBus.emit('profile:updated', this.data.profile);
  }

  /**
   * Update avatar
   * @param {string} avatarEmoji 
   */
  setAvatar(avatarEmoji) {
    this.data.profile.avatar = avatarEmoji;
    storage.save(this.data);
    eventBus.emit('profile:updated', this.data.profile);
  }

  /**
   * Evaluate daily login streak based on current date
   */
  checkDailyLoginStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = this.data.profile.lastLoginDate;

    if (!lastLogin) {
      this.data.profile.lastLoginDate = today;
      this.data.profile.loginStreak = 1;
      storage.save(this.data);
      return;
    }

    if (lastLogin === today) {
      return; // Already logged in today
    }

    const lastDate = new Date(lastLogin);
    const currentDate = new Date(today);
    const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      this.data.profile.loginStreak += 1;
    } else if (diffDays > 1) {
      this.data.profile.loginStreak = 1; // Streak broken
    }

    this.data.profile.lastLoginDate = today;
    storage.save(this.data);
  }

  /**
   * Claim daily login streak reward
   * @returns {{ success: boolean, rewardXP: number, streak: number }}
   */
  claimDailyReward() {
    const today = new Date().toISOString().split('T')[0];
    if (this.data.profile.lastStreakClaimDate === today) {
      return { success: false, rewardXP: 0, streak: this.data.profile.loginStreak };
    }

    const streakMultiplier = Math.min(this.data.profile.loginStreak, 7);
    const rewardXP = 100 * streakMultiplier;

    this.data.profile.lastStreakClaimDate = today;
    this.addXP(rewardXP);

    toastManager.show('Daily Reward Claimed! 🎁', `Earned +${rewardXP} XP for Day ${this.data.profile.loginStreak} streak!`, 'success');

    return {
      success: true,
      rewardXP,
      streak: this.data.profile.loginStreak
    };
  }
}

export const profileManager = new ProfileManager();
