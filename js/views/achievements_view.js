/**
 * Memory Match Arena - Achievements Page View
 */
import { $, $$, createElement } from '../utils/helpers.js';
import { achievementManager } from '../managers/achievement_manager.js';

export class AchievementsView {
  constructor() {
    this.container = $('#view-achievements');
    this.filterTab = 'all';
  }

  render() {
    if (!this.container) return;

    const list = achievementManager.getAchievements();
    const unlockedCount = list.filter(a => a.unlocked).length;
    const percent = Math.round((unlockedCount / list.length) * 100);

    const filtered = list.filter(a => {
      if (this.filterTab === 'unlocked') return a.unlocked;
      if (this.filterTab === 'locked') return !a.unlocked;
      return true;
    });

    this.container.innerHTML = `
      <div class="glass-card" style="margin-bottom: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2>🏅 Achievements & Badges</h2>
          <p style="color: var(--text-secondary);">Unlock 20+ unique memory badges and earn bonus XP</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-amber);">${unlockedCount} / ${list.length} (${percent}%)</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Unlocked Badges</div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
        <button class="btn btn-secondary tab-filter-btn ${this.filterTab === 'all' ? 'active' : ''}" data-tab="all">All Badges</button>
        <button class="btn btn-secondary tab-filter-btn ${this.filterTab === 'unlocked' ? 'active' : ''}" data-tab="unlocked">Unlocked (${unlockedCount})</button>
        <button class="btn btn-secondary tab-filter-btn ${this.filterTab === 'locked' ? 'active' : ''}" data-tab="locked">Locked (${list.length - unlockedCount})</button>
      </div>

      <!-- Achievements Grid -->
      <div class="achievements-grid">
        ${filtered.map(ach => {
          const progPct = Math.min(100, Math.floor((ach.progress / ach.maxProgress) * 100));
          return `
            <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-icon-box">${ach.icon}</div>
              <div class="achievement-details">
                <div class="achievement-title">${ach.name}</div>
                <div class="achievement-desc">${ach.desc}</div>
                <div class="achievement-progress-track">
                  <div class="achievement-progress-fill" style="width: ${progPct}%;"></div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    $$('.tab-filter-btn', this.container).forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterTab = btn.dataset.tab;
        this.render();
      });
    });
  }
}

export const achievementsView = new AchievementsView();
