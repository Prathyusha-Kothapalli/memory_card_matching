/**
 * Memory Match Arena - Player Statistics Manager
 * Logs wins/losses, win rates, fastest completion times, fewest moves, combo records, total play time.
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';

export class StatsManager {
  constructor() {
    this.data = storage.load();
    this.setupListeners();
  }

  setupListeners() {
    eventBus.on('game:victory', (data) => this.recordMatchResult({ isWin: true, ...data }));
    eventBus.on('game:over', (data) => this.recordMatchResult({ isWin: false, ...data }));
  }

  getStats() {
    return this.data.stats;
  }

  recordMatchResult({ isWin, difficulty, theme, moves, elapsedSeconds, scoreResult, highestCombo }) {
    const stats = this.data.stats;

    stats.gamesPlayed += 1;
    if (isWin) {
      stats.wins += 1;
    } else {
      stats.losses += 1;
    }

    stats.winRate = Math.round((stats.wins / stats.gamesPlayed) * 100);
    stats.totalMoves += moves || 0;
    stats.totalPlayTimeSeconds += elapsedSeconds || 0;

    if (theme && stats.themePlayCounts) {
      stats.themePlayCounts[theme] = (stats.themePlayCounts[theme] || 0) + 1;
    }

    if (difficulty && stats.difficultyPlayCounts) {
      stats.difficultyPlayCounts[difficulty] = (stats.difficultyPlayCounts[difficulty] || 0) + 1;
    }

    if (isWin && scoreResult) {
      if (scoreResult.totalScore > stats.highestScore) {
        stats.highestScore = scoreResult.totalScore;
      }
      if (highestCombo > stats.highestCombo) {
        stats.highestCombo = highestCombo;
      }

      // Fastest Time record
      const currentFastest = stats.fastestTimeByDifficulty[difficulty];
      if (currentFastest === null || elapsedSeconds < currentFastest) {
        stats.fastestTimeByDifficulty[difficulty] = elapsedSeconds;
      }

      // Fewest Moves record
      const currentFewest = stats.fewestMovesByDifficulty[difficulty];
      if (currentFewest === null || moves < currentFewest) {
        stats.fewestMovesByDifficulty[difficulty] = moves;
      }
    }

    storage.save(this.data);
    eventBus.emit('stats:updated', stats);
  }
}

export const statsManager = new StatsManager();
