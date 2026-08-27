/**
 * Memory Match Arena - Game Results & Victory Screen View
 */
import { $, createElement } from '../utils/helpers.js';
import { formatTime, formatNumber } from '../utils/formatters.js';
import { router } from '../core/router.js';
import { eventBus } from '../core/event_bus.js';
import { profileManager } from '../managers/profile_manager.js';

export class ResultsView {
  constructor() {
    this.container = $('#view-results');
    this.lastResultData = null;

    eventBus.on('game:victory', (data) => {
      this.lastResultData = { isWin: true, ...data };
      profileManager.addXP(data.scoreResult.xpEarned);
    });

    eventBus.on('game:over', (data) => {
      this.lastResultData = { isWin: false, ...data };
    });
  }

  render() {
    if (!this.container) return;

    if (!this.lastResultData) {
      router.navigate('play');
      return;
    }

    const res = this.lastResultData;
    const isWin = res.isWin;

    const starsHtml = isWin ? '⭐'.repeat(res.scoreResult.stars) : '❌';
    const score = isWin ? res.scoreResult.totalScore : 0;
    const xp = isWin ? res.scoreResult.xpEarned : 0;

    this.container.innerHTML = `
      <div class="glass-card" style="max-width: 620px; margin: 2rem auto; text-align: center; padding: 2.5rem 2rem;">
        <div style="font-size: 4rem; margin-bottom: 0.5rem;">${isWin ? '🎉🏆' : '💀💔'}</div>
        <h1 style="margin-bottom: 0.5rem;">${isWin ? 'VICTORY!' : 'GAME OVER'}</h1>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          ${isWin ? 'Outstanding memory performance!' : (res.reason || 'Better luck next time!')}
        </p>

        <div style="font-size: 2.5rem; margin-bottom: 1.5rem;">${starsHtml}</div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; background: rgba(0,0,0,0.2); padding: 1.25rem; border-radius: 14px;">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Score</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-amber);">${formatNumber(score)}</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">XP Earned</div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--accent-emerald);">+${formatNumber(xp)} XP</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Time Taken</div>
            <div style="font-size: 1.3rem; font-weight: 700;">${formatTime(res.elapsedSeconds)}</div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Moves</div>
            <div style="font-size: 1.3rem; font-weight: 700;">${res.moves}</div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button id="btn-play-again" class="btn btn-primary" style="font-size: 1.1rem; padding: 0.8rem 1.75rem;">
            🔄 Play Again
          </button>
          <button id="btn-results-home" class="btn btn-secondary" style="font-size: 1.1rem; padding: 0.8rem 1.75rem;">
            🏠 Home
          </button>
        </div>
      </div>
    `;

    $('#btn-play-again', this.container).addEventListener('click', () => router.navigate('play'));
    $('#btn-results-home', this.container).addEventListener('click', () => router.navigate('home'));
  }
}

export const resultsView = new ResultsView();
