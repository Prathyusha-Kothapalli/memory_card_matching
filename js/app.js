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
import { $, $$ } from './utils/helpers.js';

class App {
  init() {
    console.log('[App] Initializing Memory Match Arena v1.0.0');

    // Register routes
    router.register('home', homeView);
    router.register('play', gameView);
    router.register('results', resultsView);
    router.register('profile', profileView);

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
