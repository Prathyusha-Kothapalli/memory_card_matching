/**
 * Memory Match Arena - Score & Star Rating Calculator
 * Computes base score, speed bonus, combo multiplier, accuracy, difficulty scalar, and 1-3 star ratings.
 */
import { CONFIG } from '../config.js';

export class ScoreCalculator {
  /**
   * Calculate final score for game outcome
   * @param {Object} params 
   * @param {string} params.difficultyKey - 'easy', 'medium', 'hard', 'expert'
   * @param {number} params.matchedPairs
   * @param {number} params.totalMoves
   * @param {number} params.elapsedSeconds
   * @param {number} params.highestCombo
   * @param {string} params.gameMode
   * @returns {Object} Score breakdown details
   */
  static calculateScore({ difficultyKey = 'easy', matchedPairs = 0, totalMoves = 0, elapsedSeconds = 0, highestCombo = 1, gameMode = 'classic' }) {
    const diffConfig = CONFIG.DIFFICULTIES[difficultyKey.toUpperCase()] || CONFIG.DIFFICULTIES.EASY;

    const basePointsPerPair = diffConfig.basePoints;
    const baseScore = matchedPairs * basePointsPerPair;

    // Speed bonus: Faster completion relative to timeLimit yields higher bonus
    const targetTime = diffConfig.timeLimit;
    const timeSaved = Math.max(0, targetTime - elapsedSeconds);
    const speedBonus = Math.floor(timeSaved * 10 * (matchedPairs / diffConfig.pairs));

    // Combo bonus
    const comboBonus = highestCombo * 150;

    // Move efficiency calculation & accuracy
    const minMovesPossible = diffConfig.pairs;
    const accuracy = totalMoves > 0 ? Math.min(100, Math.floor((minMovesPossible / totalMoves) * 100)) : 100;
    const moveBonus = Math.max(0, (diffConfig.maxMoves - totalMoves) * 20);

    // Final total score
    let totalScore = Math.floor((baseScore + speedBonus + comboBonus + moveBonus) * (accuracy / 100));
    if (gameMode === CONFIG.MODES.ZEN) {
      totalScore = Math.floor(totalScore * 0.7); // Zen mode score scaling
    }

    // Star rating (1 to 3 stars)
    const stars = ScoreCalculator.calculateStars({
      elapsedSeconds,
      totalMoves,
      accuracy,
      starThresholds: diffConfig.starThresholds
    });

    return {
      totalScore: Math.max(100, totalScore),
      baseScore,
      speedBonus,
      comboBonus,
      moveBonus,
      accuracy,
      stars,
      xpEarned: diffConfig.xpReward * stars
    };
  }

  /**
   * Determine 1-3 star rating based on performance metrics
   * @param {Object} params 
   * @returns {number} 1, 2, or 3
   */
  static calculateStars({ elapsedSeconds, totalMoves, accuracy, starThresholds }) {
    let stars = 1;
    if (accuracy >= starThresholds.accuracy || totalMoves <= starThresholds.moves) {
      stars = 2;
    }
    if (elapsedSeconds <= starThresholds.time && totalMoves <= starThresholds.moves && accuracy >= starThresholds.accuracy) {
      stars = 3;
    }
    return stars;
  }
}
