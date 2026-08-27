/**
 * Memory Match Arena - Home Page View
 */
import { $, createElement } from '../utils/helpers.js';
import { profileManager } from '../managers/profile_manager.js';
import { router } from '../core/router.js';

export class HomeView {
  constructor() {
    this.container = $('#view-home');
  }

  render() {
    if (!this.container) return;

    const profile = profileManager.getProfile();
    const rank = profileManager.getRankTitle();

    this.container.innerHTML = `
      <div class="home-hero glass-card" style="text-align: center; padding: 3rem 2rem; margin-bottom: 2rem; background: radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%);">
        <div style="font-size: 3.5rem; margin-bottom: 1rem; animation: pulse 2s infinite;">🧠⚡🃏</div>
        <h1 style="margin-bottom: 0.75rem;">Welcome to <span class="text-gradient">Memory Match Arena</span></h1>
        <p style="font-size: 1.15rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto 2rem auto;">
          Test your cognitive memory speed, build massive match combos, unlock epic visual themes, and climb the leaderboards!
        </p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button id="btn-quick-play" class="btn btn-primary" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
            <span>🎮</span> Play Now
          </button>
          <button id="btn-daily-challenge-home" class="btn btn-gold" style="font-size: 1.1rem; padding: 0.9rem 2rem;">
            <span>📅</span> Daily Challenge
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <!-- Player Overview Card -->
        <div class="glass-card" style="display: flex; align-items: center; gap: 1.25rem;">
          <div style="font-size: 3rem; width: 70px; height: 70px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-glow);">
            ${profile.avatar}
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Welcome Back</div>
            <div style="font-size: 1.3rem; font-weight: 700;">${profile.username}</div>
            <div style="font-size: 0.9rem; color: var(--accent-amber); font-weight: 600;">
              ${rank.badge} Level ${profile.level} • ${rank.title}
            </div>
          </div>
        </div>

        <!-- Daily Streak Card -->
        <div class="glass-card" style="display: flex; align-items: center; gap: 1.25rem;">
          <div style="font-size: 2.8rem; width: 70px; height: 70px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.3); display: flex; align-items: center; justify-content: center;">
            🔥
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Login Streak</div>
            <div style="font-size: 1.3rem; font-weight: 700;">${profile.loginStreak} Day Streak!</div>
            <div style="font-size: 0.85rem; color: var(--accent-emerald);">Play daily for bonus XP multipliers</div>
          </div>
        </div>

        <!-- How to Play Quick Link -->
        <div class="glass-card" style="display: flex; align-items: center; gap: 1.25rem; cursor: pointer;" id="btn-learn-rules">
          <div style="font-size: 2.8rem; width: 70px; height: 70px; border-radius: 50%; background: rgba(6, 182, 212, 0.2); border: 1px solid rgba(6, 182, 212, 0.3); display: flex; align-items: center; justify-content: center;">
            📖
          </div>
          <div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">New Here?</div>
            <div style="font-size: 1.3rem; font-weight: 700;">How to Play</div>
            <div style="font-size: 0.85rem; color: var(--accent-cyan);">Learn game modes, scoring & combos →</div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    $('#btn-quick-play', this.container).addEventListener('click', () => router.navigate('play'));
    $('#btn-daily-challenge-home', this.container).addEventListener('click', () => router.navigate('daily'));
    $('#btn-learn-rules', this.container).addEventListener('click', () => router.navigate('help'));
  }
}

export const homeView = new HomeView();
