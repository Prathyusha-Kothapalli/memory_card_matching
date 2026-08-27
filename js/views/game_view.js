/**
 * Memory Match Arena - Play Game Screen View
 */
import { $, $$, createElement } from '../utils/helpers.js';
import { gameEngine } from '../game/game_engine.js';
import { CONFIG } from '../config.js';
import { formatTime } from '../utils/formatters.js';
import { eventBus } from '../core/event_bus.js';
import { router } from '../core/router.js';

export class GameView {
  constructor() {
    this.container = $('#view-play');
    this.setupListeners();
  }

  setupListeners() {
    eventBus.on('game:started', (data) => this.renderBoard(data));
    eventBus.on('game:timer_tick', ({ displayTime }) => {
      const timerVal = $('#hud-timer-val', this.container);
      if (timerVal) timerVal.textContent = formatTime(displayTime);
    });
    eventBus.on('game:moves_updated', ({ totalMoves }) => {
      const movesVal = $('#hud-moves-val', this.container);
      if (movesVal) movesVal.textContent = totalMoves;
    });
    eventBus.on('game:match', ({ multiplier }) => {
      const comboVal = $('#hud-combo-val', this.container);
      if (comboVal) comboVal.textContent = `${multiplier}x`;
    });
    eventBus.on('game:shuffled', ({ cards }) => {
      this.rebindCardGrid(cards);
    });
    eventBus.on('game:victory', (data) => {
      router.navigate('results');
    });
    eventBus.on('game:over', (data) => {
      router.navigate('results');
    });
  }

  render() {
    if (!this.container) return;

    // Render Game Launcher Config options if game not active
    if (!gameEngine.isGameActive) {
      this.renderLauncher();
    }
  }

  renderLauncher() {
    this.container.innerHTML = `
      <div class="glass-card" style="max-width: 720px; margin: 0 auto; text-align: center;">
        <h2 style="margin-bottom: 1.5rem;">🎮 Launch Game Arena</h2>

        <!-- Mode Select -->
        <div style="margin-bottom: 1.5rem; text-align: left;">
          <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase;">Game Mode</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; margin-top: 0.5rem;">
            ${Object.values(CONFIG.MODES).map(m => `
              <button class="btn btn-secondary mode-select-btn ${m === 'classic' ? 'active' : ''}" data-mode="${m}" style="text-transform: capitalize;">
                ${m.replace('_', ' ')}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Difficulty Select -->
        <div style="margin-bottom: 1.5rem; text-align: left;">
          <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase;">Difficulty (Grid Size)</label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-top: 0.5rem;">
            ${Object.keys(CONFIG.DIFFICULTIES).map(d => {
              const diff = CONFIG.DIFFICULTIES[d];
              return `
                <button class="btn btn-secondary diff-select-btn ${d === 'EASY' ? 'active' : ''}" data-diff="${diff.id}">
                  ${diff.name} (${diff.rows}x${diff.cols})
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Theme Select -->
        <div style="margin-bottom: 2rem; text-align: left;">
          <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase;">Visual Theme</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-top: 0.5rem;">
            ${Object.values(CONFIG.THEMES).map(t => `
              <button class="btn btn-secondary theme-select-btn ${t === 'space' ? 'active' : ''}" data-theme="${t}" style="text-transform: capitalize;">
                ${t}
              </button>
            `).join('')}
          </div>
        </div>

        <button id="btn-start-match" class="btn btn-primary" style="width: 100%; font-size: 1.2rem; padding: 1rem;">
          🚀 Start Match
        </button>
      </div>
    `;

    // Button Listeners
    let selectedMode = 'classic';
    let selectedDiff = 'easy';
    let selectedTheme = 'space';

    $$('.mode-select-btn', this.container).forEach(btn => {
      btn.addEventListener('click', (e) => {
        $$('.mode-select-btn', this.container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedMode = btn.dataset.mode;
      });
    });

    $$('.diff-select-btn', this.container).forEach(btn => {
      btn.addEventListener('click', (e) => {
        $$('.diff-select-btn', this.container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedDiff = btn.dataset.diff;
      });
    });

    $$('.theme-select-btn', this.container).forEach(btn => {
      btn.addEventListener('click', (e) => {
        $$('.theme-select-btn', this.container).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTheme = btn.dataset.theme;
      });
    });

    $('#btn-start-match', this.container).addEventListener('click', () => {
      gameEngine.startNewGame({
        mode: selectedMode,
        difficulty: selectedDiff,
        theme: selectedTheme
      });
    });
  }

  renderBoard({ mode, difficulty, cards }) {
    const diffConfig = CONFIG.DIFFICULTIES[difficulty.toUpperCase()];
    const gridClass = `grid-${diffConfig.rows}x${diffConfig.cols}`;

    this.container.innerHTML = `
      <div class="game-header-bar">
        <div class="hud-stat-box">
          <span class="hud-stat-label">Mode / Grid</span>
          <span class="hud-stat-value" style="font-size: 1.1rem; text-transform: capitalize;">${mode} (${diffConfig.rows}x${diffConfig.cols})</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-stat-label">Timer</span>
          <span class="hud-stat-value" id="hud-timer-val">00:00</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-stat-label">Moves</span>
          <span class="hud-stat-value" id="hud-moves-val">0</span>
        </div>
        <div class="hud-stat-box">
          <span class="hud-stat-label">Combo</span>
          <span class="hud-stat-value combo-badge" id="hud-combo-val">1x</span>
        </div>
        <div>
          <button id="btn-pause-game" class="btn btn-secondary">⏸ Pause</button>
        </div>
      </div>

      <!-- Card Grid -->
      <div class="gameboard-grid ${gridClass}" id="gameboard-grid-container"></div>

      <!-- Power-Ups Bar -->
      <div class="powerups-bar">
        <button id="btn-powerup-hint" class="powerup-btn">
          <span>💡 Hint</span>
          <span class="powerup-count" id="hint-count-val">3</span>
        </button>
        <button id="btn-powerup-shuffle" class="powerup-btn">
          <span>🔀 Shuffle</span>
          <span class="powerup-count" id="shuffle-count-val">2</span>
        </button>
      </div>
    `;

    const gridContainer = $('#gameboard-grid-container', this.container);
    cards.forEach(card => {
      const cardEl = card.render();
      cardEl.addEventListener('click', () => gameEngine.handleCardClick(card.id));
      gridContainer.appendChild(cardEl);
    });

    // Powerup button handlers
    $('#btn-powerup-hint', this.container).addEventListener('click', () => {
      gameEngine.triggerHint();
      $('#hint-count-val', this.container).textContent = gameEngine.powerups.hintCharges;
    });

    $('#btn-powerup-shuffle', this.container).addEventListener('click', () => {
      gameEngine.triggerShuffle();
      $('#shuffle-count-val', this.container).textContent = gameEngine.powerups.shuffleCharges;
    });

    $('#btn-pause-game', this.container).addEventListener('click', () => {
      gameEngine.pause();
      alert('Game Paused. Click OK to Resume.');
      gameEngine.resume();
    });
  }

  rebindCardGrid(cards) {
    const gridContainer = $('#gameboard-grid-container', this.container);
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    cards.forEach(card => {
      const cardEl = card.render();
      cardEl.addEventListener('click', () => gameEngine.handleCardClick(card.id));
      gridContainer.appendChild(cardEl);
    });
  }
}

export const gameView = new GameView();
