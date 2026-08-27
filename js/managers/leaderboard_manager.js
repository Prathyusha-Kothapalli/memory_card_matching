/**
 * Memory Match Arena - Local Leaderboard Repository
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';

export class LeaderboardManager {
  constructor() {
    this.data = storage.load();
    this.setupListeners();
  }

  setupListeners() {
    eventBus.on('game:victory', (data) => this.addEntry(data));
  }

  /**
   * Add high score match entry
   * @param {Object} data 
   */
  addEntry({ mode, difficulty, theme, moves, elapsedSeconds, scoreResult }) {
    const profile = this.data.profile;
    const newEntry = {
      id: `lb_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      username: profile.username,
      avatar: profile.avatar,
      score: scoreResult ? scoreResult.totalScore : 100,
      moves,
      time: elapsedSeconds,
      difficulty,
      mode,
      theme,
      date: new Date().toISOString().split('T')[0]
    };

    if (!Array.isArray(this.data.leaderboards)) {
      this.data.leaderboards = [];
    }

    this.data.leaderboards.push(newEntry);

    // Keep top 100 entries max
    this.data.leaderboards.sort((a, b) => b.score - a.score);
    if (this.data.leaderboards.length > 100) {
      this.data.leaderboards = this.data.leaderboards.slice(0, 100);
    }

    storage.save(this.data);
    eventBus.emit('leaderboard:updated', this.data.leaderboards);
  }

  /**
   * Filter and sort leaderboard entries
   * @param {Object} filters 
   * @param {string} filters.difficulty - 'all' or specific diff
   * @param {string} filters.mode - 'all' or specific mode
   * @param {string} filters.sortBy - 'score', 'time', 'moves'
   * @returns {Array} Filtered list
   */
  getLeaderboard({ difficulty = 'all', mode = 'all', sortBy = 'score' } = {}) {
    let entries = [...(this.data.leaderboards || [])];

    if (difficulty !== 'all') {
      entries = entries.filter(e => e.difficulty === difficulty);
    }
    if (mode !== 'all') {
      entries = entries.filter(e => e.mode === mode);
    }

    if (sortBy === 'score') {
      entries.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'time') {
      entries.sort((a, b) => a.time - b.time);
    } else if (sortBy === 'moves') {
      entries.sort((a, b) => a.moves - b.moves);
    }

    return entries;
  }
}

export const leaderboardManager = new LeaderboardManager();
