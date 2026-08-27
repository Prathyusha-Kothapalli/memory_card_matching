/**
 * Memory Match Arena - Quests & Daily Missions View
 */
import { $, createElement } from '../utils/helpers.js';
import { questManager } from '../managers/quest_manager.js';

export class QuestsView {
  constructor() {
    this.container = $('#view-quests');
  }

  render() {
    if (!this.container) return;
    const quests = questManager.quests;
    this.container.innerHTML = `
      <div class="glass-card" style="margin-bottom: 2rem;">
        <h2>📜 Daily & Weekly Quests</h2>
        <p style="color: var(--text-secondary);">Complete challenges to claim extra XP bonuses</p>
      </div>
      <div class="quests-list-grid">
        ${quests.map(q => `
          <div class="glass-card quest-item-box">
            <div>
              <div style="font-weight: 700; font-size: 1.1rem;">\${q.title}</div>
              <div style="font-size: 0.9rem; color: var(--text-secondary);">\${q.desc}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 800; color: var(--accent-emerald);">+\${q.rewardXP} XP</div>
              <button class="btn btn-emerald btn-sm" \${q.claimed ? 'disabled' : ''}>
                \${q.claimed ? 'Claimed' : 'Claim Reward'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

export const questsView = new QuestsView();
