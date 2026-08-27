/**
 * Memory Match Arena - Profile Page View
 */
import { $, $$, createElement } from '../utils/helpers.js';
import { profileManager } from '../managers/profile_manager.js';
import { CONFIG } from '../config.js';
import { modalManager } from '../ui/modal.js';
import { toastManager } from '../ui/toast.js';
import { validateUsername } from '../utils/validators.js';

export class ProfileView {
  constructor() {
    this.container = $('#view-profile');
  }

  render() {
    if (!this.container) return;

    const profile = profileManager.getProfile();
    const rank = profileManager.getRankTitle();
    const nextLevelXP = profileManager.getXPForLevel(profile.level);
    const xpPercent = Math.min(100, Math.floor((profile.xp / nextLevelXP) * 100));

    const today = new Date().toISOString().split('T')[0];
    const canClaimDaily = profile.lastStreakClaimDate !== today;

    this.container.innerHTML = `
      <div class="profile-header-card">
        <div class="profile-avatar-container">
          <div class="profile-avatar-large">${profile.avatar}</div>
          <button class="avatar-edit-btn" id="btn-change-avatar" title="Change Avatar">✏️</button>
        </div>

        <div class="profile-info">
          <div class="profile-title-row">
            <h2 class="profile-username" id="display-username">${profile.username}</h2>
            <button class="btn btn-icon" id="btn-edit-username" title="Edit Username">✏️</button>
          </div>
          <div class="profile-rank-title">
            ${rank.badge} Level ${profile.level} — ${rank.title}
          </div>

          <div class="xp-progress-wrapper">
            <div class="xp-labels">
              <span>Experience Points (XP)</span>
              <span>${profile.xp} / ${nextLevelXP} XP (${xpPercent}%)</span>
            </div>
            <div class="xp-progress-track">
              <div class="xp-progress-fill" style="width: ${xpPercent}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-grid-layout">
        <!-- Daily Streak & Rewards Card -->
        <div class="glass-card daily-rewards-card">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <h3>Daily Login Rewards</h3>
            <div class="streak-counter-badge">
              🔥 ${profile.loginStreak} Day Streak
            </div>
          </div>

          <p style="font-size: 0.9rem; color: var(--text-secondary);">
            Log in every day to claim bonus XP rewards and keep your streak alive!
          </p>

          <div class="rewards-streak-grid">
            ${Array.from({ length: 7 }).map((_, idx) => {
              const dayNum = idx + 1;
              const isClaimed = profile.loginStreak >= dayNum && !canClaimDaily;
              const isCurrent = profile.loginStreak === dayNum;
              const bonusXP = 100 * dayNum;

              return `
                <div class="streak-day-item ${isClaimed ? 'claimed' : ''} ${isCurrent ? 'today' : ''}">
                  <div>Day ${dayNum}</div>
                  <div class="streak-day-icon">${isClaimed ? '✅' : '🎁'}</div>
                  <div style="font-weight: 700;">+${bonusXP}</div>
                </div>
              `;
            }).join('')}
          </div>

          <button id="btn-claim-daily" class="btn ${canClaimDaily ? 'btn-emerald' : 'btn-secondary'}" style="margin-top: 1rem; width: 100%;" ${canClaimDaily ? '' : 'disabled'}>
            ${canClaimDaily ? '🎁 Claim Today\'s Reward' : '✅ Reward Claimed for Today'}
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Change Avatar Modal
    $('#btn-change-avatar', this.container).addEventListener('click', () => {
      const grid = createElement('div', { className: 'avatar-selection-grid' });
      CONFIG.AVATARS.forEach(emoji => {
        const item = createElement('div', {
          className: `avatar-option-item ${profileManager.getProfile().avatar === emoji ? 'selected' : ''}`,
          onClick: () => {
            profileManager.setAvatar(emoji);
            modalManager.close();
            this.render();
            toastManager.show('Avatar Updated!', `Your avatar has been updated to ${emoji}`, 'success');
          }
        }, emoji);
        grid.appendChild(item);
      });

      modalManager.open({
        title: 'Choose Avatar',
        content: grid
      });
    });

    // Edit Username
    $('#btn-edit-username', this.container).addEventListener('click', () => {
      const currentName = profileManager.getProfile().username;
      const input = createElement('input', {
        type: 'text',
        value: currentName,
        style: 'width: 100%; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: #121829; color: #fff;'
      });

      modalManager.open({
        title: 'Edit Username',
        content: input,
        buttons: [
          {
            text: 'Save',
            type: 'primary',
            onClick: () => {
              const val = input.value.trim();
              const check = validateUsername(val);
              if (!check.valid) {
                toastManager.show('Invalid Username', check.message, 'warning');
                return;
              }
              profileManager.setUsername(val);
              this.render();
              toastManager.show('Profile Saved', 'Username updated successfully.', 'success');
            }
          }
        ]
      });
    });

    // Claim Daily Reward
    const claimBtn = $('#btn-claim-daily', this.container);
    if (claimBtn && !claimBtn.disabled) {
      claimBtn.addEventListener('click', () => {
        const res = profileManager.claimDailyReward();
        if (res.success) {
          this.render();
        }
      });
    }
  }
}

export const profileView = new ProfileView();
