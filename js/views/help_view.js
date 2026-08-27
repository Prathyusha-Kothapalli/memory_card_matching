/**
 * Memory Match Arena - Help & How to Play Page View
 */
import { $, createElement } from '../utils/helpers.js';

export class HelpView {
  constructor() {
    this.container = $('#view-help');
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="glass-card help-section-card">
        <h2>❓ How to Play Memory Match Arena</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          Memory Match Arena is a high-octane card matching game. Test your memory speed, precision, and strategy!
        </p>

        <div class="help-grid-feature">
          <div class="help-feature-box">
            <h4>🎮 Game Modes</h4>
            <ul style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.4rem;">
              <li><strong>Classic:</strong> Standard gameplay. Match all pairs in fewest moves.</li>
              <li><strong>Timed Mode:</strong> Race against a countdown timer before time runs out!</li>
              <li><strong>Limited Moves:</strong> Complete the grid within a fixed move quota.</li>
              <li><strong>Zen Mode:</strong> Relaxed, pressure-free mode with soothing audio.</li>
              <li><strong>Daily Challenge:</strong> Custom date-seeded puzzle with special modifiers.</li>
            </ul>
          </div>

          <div class="help-feature-box">
            <h4>🔥 Combo Multipliers</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">
              Perform rapid consecutive matches within 5 seconds to escalate your combo multiplier up to 8x points! A mismatch resets your active combo streak.
            </p>
          </div>

          <div class="help-feature-box">
            <h4>💡 In-Game Power-Ups</h4>
            <ul style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.4rem;">
              <li><strong>Hint Charge:</strong> Briefly highlights a hidden matching pair on the grid.</li>
              <li><strong>Shuffle Power-up:</strong> Re-arranges remaining unmatched cards.</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

export const helpView = new HelpView();
