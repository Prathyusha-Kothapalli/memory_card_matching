/**
 * Memory Match Arena - Settings Page View
 */
import { $, createElement } from '../utils/helpers.js';
import { storage } from '../core/storage.js';
import { themeManager } from '../managers/theme_manager.js';
import { audioEngine } from '../core/audio_engine.js';
import { CONFIG } from '../config.js';
import { toastManager } from '../ui/toast.js';

export class SettingsView {
  constructor() {
    this.container = $('#view-settings');
  }

  render() {
    if (!this.container) return;

    const data = storage.load();
    const settings = data.settings;

    this.container.innerHTML = `
      <div class="glass-card" style="max-width: 750px; margin: 0 auto;">
        <h2 style="margin-bottom: 2rem;">⚙️ Settings & Audio Controls</h2>

        <!-- Audio Settings -->
        <div class="settings-group">
          <h3>🔊 Audio & Sound Effects</h3>
          <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-top: 1rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span>Sound Effects (SFX)</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-sfx" ${settings.sfxEnabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div>
              <span class="settings-label">SFX Volume</span>
              <div class="range-slider-wrapper">
                <input type="range" id="slider-sfx" class="range-slider" min="0" max="1" step="0.05" value="${settings.sfxVolume}">
                <span id="val-sfx">${Math.round(settings.sfxVolume * 100)}%</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.5rem;">
              <span>Ambient Background Music</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-music" ${settings.musicEnabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div>
              <span class="settings-label">Music Volume</span>
              <div class="range-slider-wrapper">
                <input type="range" id="slider-music" class="range-slider" min="0" max="1" step="0.05" value="${settings.musicVolume}">
                <span id="val-music">${Math.round(settings.musicVolume * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2rem 0;">

        <!-- Theme Selection -->
        <div class="settings-group">
          <h3>🎨 Visual Theme Selector</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem;">
            ${Object.values(CONFIG.THEMES).map(themeKey => `
              <button class="btn btn-secondary theme-opt-btn ${settings.currentTheme === themeKey ? 'active' : ''}" data-theme="${themeKey}" style="text-transform: capitalize; padding: 1rem;">
                ${themeKey}
              </button>
            `).join('')}
          </div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border-color); margin: 2rem 0;">

        <!-- Storage & Data Management -->
        <div class="settings-group">
          <h3>💾 Data & Backup Management</h3>
          <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
            <button id="btn-export-data" class="btn btn-secondary">
              📥 Export Data (JSON)
            </button>
            <button id="btn-import-data" class="btn btn-secondary">
              📤 Import Data (JSON)
            </button>
            <button id="btn-reset-data" class="btn btn-secondary" style="color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.3);">
              ⚠️ Reset All Data
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents(data);
  }

  bindEvents(data) {
    // SFX Toggle
    $('#toggle-sfx', this.container).addEventListener('change', (e) => {
      data.settings.sfxEnabled = e.target.checked;
      audioEngine.sfxEnabled = e.target.checked;
      storage.save(data);
    });

    // SFX Slider
    $('#slider-sfx', this.container).addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      data.settings.sfxVolume = val;
      audioEngine.sfxVolume = val;
      $('#val-sfx', this.container).textContent = `${Math.round(val * 100)}%`;
      storage.save(data);
    });

    // Music Toggle
    $('#toggle-music', this.container).addEventListener('change', (e) => {
      data.settings.musicEnabled = e.target.checked;
      audioEngine.toggleMusic(e.target.checked);
      storage.save(data);
    });

    // Music Slider
    $('#slider-music', this.container).addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      data.settings.musicVolume = val;
      audioEngine.musicVolume = val;
      $('#val-music', this.container).textContent = `${Math.round(val * 100)}%`;
      storage.save(data);
    });

    // Theme Selector Buttons
    this.container.querySelectorAll('.theme-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.theme-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedTheme = btn.dataset.theme;
        themeManager.setTheme(selectedTheme);
        toastManager.show('Theme Updated!', `Switched to ${selectedTheme} theme.`, 'success');
      });
    });

    // Export Data
    $('#btn-export-data', this.container).addEventListener('click', () => {
      const jsonStr = storage.exportJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `memory_match_arena_save_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toastManager.show('Data Exported!', 'Player save data exported to JSON file.', 'success');
    });

    // Import Data
    $('#btn-import-data', this.container).addEventListener('click', () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'application/json';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const ok = storage.importJSON(event.target.result);
          if (ok) {
            toastManager.show('Import Successful!', 'Player save data loaded. Refreshing...', 'success');
            setTimeout(() => window.location.reload(), 1200);
          } else {
            toastManager.show('Import Failed', 'Invalid or corrupt save file.', 'warning');
          }
        };
        reader.readAsText(file);
      };
      fileInput.click();
    });

    // Reset Data
    $('#btn-reset-data', this.container).addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all player data and stats? This cannot be undone!')) {
        storage.clear();
        toastManager.show('Data Reset', 'All data cleared. Resetting application...', 'info');
        setTimeout(() => window.location.reload(), 1200);
      }
    });
  }
}

export const settingsView = new SettingsView();
