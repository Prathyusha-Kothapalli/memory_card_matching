/**
 * Score & Star Calculator Unit Tests
 */
import { ScoreCalculator } from '../js/game/score_calculator.js';

describe('ScoreCalculator Tests', () => {
  it('should calculate higher scores for faster times and fewer moves', () => {
    const fastScore = ScoreCalculator.calculateScore({
      difficultyKey: 'easy',
      matchedPairs: 8,
      totalMoves: 10,
      elapsedSeconds: 20,
      highestCombo: 3
    });

    const slowScore = ScoreCalculator.calculateScore({
      difficultyKey: 'easy',
      matchedPairs: 8,
      totalMoves: 30,
      elapsedSeconds: 55,
      highestCombo: 1
    });

    assert.isTrue(fastScore.totalScore > slowScore.totalScore, 'Fast game should yield higher total score');
  });

  it('should evaluate 3-star rating for perfect games', () => {
    const scoreResult = ScoreCalculator.calculateScore({
      difficultyKey: 'easy',
      matchedPairs: 8,
      totalMoves: 9,
      elapsedSeconds: 25,
      highestCombo: 4
    });

    assert.strictEqual(scoreResult.stars, 3, 'Perfect execution should award 3 stars');
  });
});
