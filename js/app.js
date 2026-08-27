/**
 * Memory Match Arena - Application Bootstrap & Initializer
 */
import { router } from './core/router.js';
import { eventBus } from './core/event_bus.js';
import { profileManager } from './managers/profile_manager.js';
import { homeView } from './views/home_view.js';
import { profileView } from './views/profile_view.js';
import { gameView } from './views/game_view.js';
import { resultsView } from './views/results_view.js';
import { settingsView } from './views/settings_view.js';
import { achievementsView } from './views/achievements_view.js';
import { leaderboardView } from './views/leaderboard_view.js';
import { dailyView } from './views/daily_view.js';
import { helpView } from './views/help_view.js';
import { themeManager } from './managers/theme_manager.js';
import { achievementManager } from './managers/achievement_manager.js';
import { statsManager } from './managers/stats_manager.js';
import { leaderboardManager } from './managers/leaderboard_manager.js';
import { dailyChallengeManager } from './managers/daily_challenge_manager.js';
import { particleEngine } from './core/particle_engine.js';
import { setupConfettiTriggers } from './ui/confetti.js';
import { $, $$ } from './utils/helpers.js';

class App {
  init() {
    console.log('[App] Initializing Memory Match Arena v1.0.0');

    // Initialize Theme & Particles
    themeManager.init();
    particleEngine.init();
    setupConfettiTriggers();

    // Register routes
    router.register('home', homeView);
    router.register('play', gameView);
    router.register('results', resultsView);
    router.register('profile', profileView);
    router.register('settings', settingsView);
    router.register('achievements', achievementsView);
    router.register('leaderboard', leaderboardView);
    router.register('daily', dailyView);
    router.register('help', helpView);

    // Initial Navbar User Badge Update
    this.updateUserBadge();

    // Listen to profile updates
    eventBus.on('profile:updated', () => this.updateUserBadge());
    eventBus.on('profile:level_up', () => this.updateUserBadge());

    // Setup navbar brand click & user badge click
    $('#nav-brand-logo')?.addEventListener('click', () => router.navigate('home'));
    $('#nav-user-profile-badge')?.addEventListener('click', () => router.navigate('profile'));

    // Mobile menu toggle
    $('#mobile-menu-toggle')?.addEventListener('click', () => {
      $('#nav-links-menu')?.classList.toggle('mobile-open');
    });

    // Initialize SPA Router
    router.init();
  }

  updateUserBadge() {
    const profile = profileManager.getProfile();
    const avatarEl = $('#nav-avatar-display');
    const usernameEl = $('#nav-username-display');
    const levelEl = $('#nav-level-display');

    if (avatarEl) avatarEl.textContent = profile.avatar;
    if (usernameEl) usernameEl.textContent = profile.username;
    if (levelEl) levelEl.textContent = `Lv.${profile.level}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
