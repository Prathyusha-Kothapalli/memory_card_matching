/**
 * Memory Match Arena - Daily Challenge Screen View
 */
import { $, createElement } from '../utils/helpers.js';
import { dailyChallengeManager } from '../managers/daily_challenge_manager.js';
import { gameEngine } from '../game/game_engine.js';
import { router } from '../core/router.js';

export class DailyView {
  constructor() {
    this.container = $('#view-daily');
  }

  render() {
    if (!this.container) return;

    const challenge = dailyChallengeManager.getTodayChallenge();

    this.container.innerHTML = `
      <div class="daily-hero-card glass-card">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">📅⚡</div>
        <h1 style="margin-bottom: 0.5rem;">Daily Challenge</h1>
        <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 1.5rem auto;">
          Test your skill on today's custom date-seeded memory puzzle. Win to earn +${challenge.rewardXP} XP bonus!
        </p>

        <div class="daily-modifier-box">
          <span>🔥 Special Modifier:</span> ${challenge.modifierName} — ${challenge.modifierDesc}
        </div>

        <div style="margin: 2rem 0; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Grid Size</div>
            <div style="font-size: 1.4rem; font-weight: 800; text-transform: capitalize;">${challenge.difficulty}</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Visual Theme</div>
            <div style="font-size: 1.4rem; font-weight: 800; text-transform: capitalize;">${challenge.theme}</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Status</div>
            <div style="font-size: 1.4rem; font-weight: 800; color: ${challenge.isCompleted ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
              ${challenge.isCompleted ? '✅ Completed' : '⏳ Available'}
            </div>
          </div>
        </div>

        <button id="btn-start-daily-puzzle" class="btn btn-gold" style="font-size: 1.2rem; padding: 1rem 2.5rem;" ${challenge.isCompleted ? 'disabled' : ''}>
          ${challenge.isCompleted ? '✅ Today\'s Challenge Complete' : '🚀 Play Today\'s Challenge'}
        </button>
      </div>
    `;

    const startBtn = $('#btn-start-daily-puzzle', this.container);
    if (startBtn && !challenge.isCompleted) {
      startBtn.addEventListener('click', () => {
        gameEngine.startNewGame({
          mode: 'daily',
          difficulty: challenge.difficulty,
          theme: challenge.theme
        });
        router.navigate('play');
      });
    }
  }
}

export const dailyView = new DailyView();
