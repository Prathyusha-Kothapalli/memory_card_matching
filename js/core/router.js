/**
 * Memory Match Arena - Hash SPA Router
 * Handles hash navigation, view switching, active navbar styling, and document title updates.
 */
import { $, $$ } from '../utils/helpers.js';
import { eventBus } from './event_bus.js';

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  /**
   * Register route mapping
   * @param {string} routeName - E.g. 'home', 'play', 'profile', 'achievements', 'leaderboard', 'daily', 'settings', 'help'
   * @param {Object} viewInstance - Object implementing render() method
   */
  register(routeName, viewInstance) {
    this.routes.set(routeName, viewInstance);
  }

  /**
   * Navigate to target route programmatically
   * @param {string} routeName 
   */
  navigate(routeName) {
    window.location.hash = `#${routeName}`;
  }

  /**
   * Handle hash change routing event
   */
  handleRoute() {
    const rawHash = window.location.hash.replace('#', '').trim();
    const routeName = rawHash || 'home';

    const targetView = this.routes.get(routeName) || this.routes.get('home');
    if (!targetView) return;

    this.currentRoute = routeName;

    // Toggle active view container
    $$('.view-container').forEach(el => el.classList.remove('active'));

    const activeContainer = $(`#view-${routeName}`) || $('#view-home');
    if (activeContainer) {
      activeContainer.classList.add('active');
    }

    // Update active nav items
    $$('.nav-item').forEach(el => {
      if (el.dataset.route === routeName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    // Render target view
    if (typeof targetView.render === 'function') {
      targetView.render();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    eventBus.emit('router:navigated', routeName);
  }

  /**
   * Initialize router on app startup
   */
  init() {
    this.handleRoute();
  }
}

export const router = new Router();
