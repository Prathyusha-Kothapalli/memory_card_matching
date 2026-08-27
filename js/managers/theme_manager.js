/**
 * Memory Match Arena - Theme Manager Controller
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';

export class ThemeManager {
  constructor() {
    this.data = storage.load();
    this.currentTheme = this.data.settings.currentTheme || 'space';
  }

  /**
   * Apply active theme to document root
   * @param {string} themeKey 
   */
  setTheme(themeKey) {
    if (!themeKey) return;
    document.body.setAttribute('data-theme', themeKey);
    this.currentTheme = themeKey;

    this.data.settings.currentTheme = themeKey;
    storage.save(this.data);

    eventBus.emit('theme:changed', themeKey);
  }

  /**
   * Get active theme key
   * @returns {string}
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Initialize theme settings on startup
   */
  init() {
    this.setTheme(this.currentTheme);
  }
}

export const themeManager = new ThemeManager();
