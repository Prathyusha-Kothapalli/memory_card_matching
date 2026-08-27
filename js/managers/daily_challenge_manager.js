/**
 * Memory Match Arena - Daily Challenge Manager
 * Generates date-seeded deterministic puzzles with unique daily modifiers.
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';
import { CONFIG } from '../config.js';

export class DailyChallengeManager {
  constructor() {
    this.data = storage.load();
    this.setupListeners();
  }

  setupListeners() {
    eventBus.on('game:victory', (data) => {
      if (data.mode === CONFIG.MODES.DAILY) {
        this.recordDailyCompletion(data);
      }
    });
  }

  getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Generate today's deterministic challenge params
   */
  getTodayChallenge() {
    const today = this.getTodayString();
    const history = this.data.dailyChallengeHistory || {};
    const isCompleted = history[today] ? history[today].completed : false;

    // Seeded parameters based on date string
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }

    const difficulties = ['medium', 'hard'];
    const themes = ['space', 'animals', 'fantasy', 'nature'];
    const selectedDiff = difficulties[seed % difficulties.length];
    const selectedTheme = themes[(seed * 3) % themes.length];

    return {
      date: today,
      difficulty: selectedDiff,
      theme: selectedTheme,
      isCompleted,
      rewardXP: 500,
      modifierName: 'Speed Match Bonus',
      modifierDesc: 'Earn 2x combo multipliers for fast consecutive matches!'
    };
  }

  recordDailyCompletion(data) {
    const today = this.getTodayString();
    if (!this.data.dailyChallengeHistory) {
      this.data.dailyChallengeHistory = {};
    }

    this.data.dailyChallengeHistory[today] = {
      completed: true,
      score: data.scoreResult ? data.scoreResult.totalScore : 0,
      time: data.elapsedSeconds,
      moves: data.moves
    };

    storage.save(this.data);
    eventBus.emit('daily:completed', today);
  }
}

export const dailyChallengeManager = new DailyChallengeManager();
