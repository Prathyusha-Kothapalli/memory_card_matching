/**
 * Memory Match Arena - Leaderboards View
 */
import { $, $$, createElement } from '../utils/helpers.js';
import { leaderboardManager } from '../managers/leaderboard_manager.js';
import { formatTime, formatNumber } from '../utils/formatters.js';

export class LeaderboardView {
  constructor() {
    this.container = $('#view-leaderboard');
    this.difficultyFilter = 'all';
    this.modeFilter = 'all';
    this.sortBy = 'score';
  }

  render() {
    if (!this.container) return;

    const entries = leaderboardManager.getLeaderboard({
      difficulty: this.difficultyFilter,
      mode: this.modeFilter,
      sortBy: this.sortBy
    });

    this.container.innerHTML = `
      <div class="glass-card" style="margin-bottom: 1.5rem;">
        <h2>🏆 Local High Scores & Rankings</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">Filter and sort match records across difficulties and game modes</p>

        <!-- Filters Toolbar -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Difficulty</label>
            <select id="select-lb-diff" style="display: block; padding: 0.5rem 1rem; border-radius: 8px; background: #121829; color: #fff; border: 1px solid rgba(255,255,255,0.2);">
              <option value="all" ${this.difficultyFilter === 'all' ? 'selected' : ''}>All Difficulties</option>
              <option value="easy" ${this.difficultyFilter === 'easy' ? 'selected' : ''}>Easy (4x4)</option>
              <option value="medium" ${this.difficultyFilter === 'medium' ? 'selected' : ''}>Medium (6x6)</option>
              <option value="hard" ${this.difficultyFilter === 'hard' ? 'selected' : ''}>Hard (8x8)</option>
              <option value="expert" ${this.difficultyFilter === 'expert' ? 'selected' : ''}>Expert (10x10)</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Mode</label>
            <select id="select-lb-mode" style="display: block; padding: 0.5rem 1rem; border-radius: 8px; background: #121829; color: #fff; border: 1px solid rgba(255,255,255,0.2);">
              <option value="all" ${this.modeFilter === 'all' ? 'selected' : ''}>All Modes</option>
              <option value="classic" ${this.modeFilter === 'classic' ? 'selected' : ''}>Classic</option>
              <option value="timed" ${this.modeFilter === 'timed' ? 'selected' : ''}>Timed</option>
              <option value="limited_moves" ${this.modeFilter === 'limited_moves' ? 'selected' : ''}>Limited Moves</option>
              <option value="zen" ${this.modeFilter === 'zen' ? 'selected' : ''}>Zen</option>
              <option value="daily" ${this.modeFilter === 'daily' ? 'selected' : ''}>Daily Challenge</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Sort By</label>
            <select id="select-lb-sort" style="display: block; padding: 0.5rem 1rem; border-radius: 8px; background: #121829; color: #fff; border: 1px solid rgba(255,255,255,0.2);">
              <option value="score" ${this.sortBy === 'score' ? 'selected' : ''}>Highest Score</option>
              <option value="time" ${this.sortBy === 'time' ? 'selected' : ''}>Fastest Time</option>
              <option value="moves" ${this.sortBy === 'moves' ? 'selected' : ''}>Fewest Moves</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div class="glass-card leaderboard-table-container">
        ${entries.length === 0 ? `
          <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
            No high score records matching selected filters. Play a game to record scores!
          </div>
        ` : `
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Difficulty</th>
                <th>Mode</th>
                <th>Time</th>
                <th>Moves</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${entries.map((item, idx) => {
                const rank = idx + 1;
                let rankBadge = `${rank}`;
                if (rank === 1) rankBadge = `<span class="rank-badge-cell rank-gold">🥇</span>`;
                else if (rank === 2) rankBadge = `<span class="rank-badge-cell rank-silver">🥈</span>`;
                else if (rank === 3) rankBadge = `<span class="rank-badge-cell rank-bronze">🥉</span>`;

                return `
                  <tr>
                    <td>${rankBadge}</td>
                    <td><span style="margin-right: 0.5rem;">${item.avatar}</span> <strong>${item.username}</strong></td>
                    <td style="font-weight: 800; color: var(--accent-amber);">${formatNumber(item.score)}</td>
                    <td style="text-transform: capitalize;">${item.difficulty}</td>
                    <td style="text-transform: capitalize;">${item.mode.replace('_', ' ')}</td>
                    <td>${formatTime(item.time)}</td>
                    <td>${item.moves}</td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">${item.date}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;

    $('#select-lb-diff', this.container).addEventListener('change', (e) => {
      this.difficultyFilter = e.target.value;
      this.render();
    });

    $('#select-lb-mode', this.container).addEventListener('change', (e) => {
      this.modeFilter = e.target.value;
      this.render();
    });

    $('#select-lb-sort', this.container).addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.render();
    });
  }
}

export const leaderboardView = new LeaderboardView();
