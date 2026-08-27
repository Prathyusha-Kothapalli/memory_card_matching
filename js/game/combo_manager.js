/**
 * Memory Match Arena - Combo Streak Manager
 * Tracks consecutive matches within time windows to escalate combo multipliers (1x to 8x).
 */
export class ComboManager {
  constructor(comboWindowMs = 5000) {
    this.comboWindowMs = comboWindowMs;
    this.currentCombo = 0;
    this.highestCombo = 0;
    this.lastMatchTime = 0;
  }

  /**
   * Register a successful pair match
   * @returns {number} New combo multiplier
   */
  registerMatch() {
    const now = Date.now();
    if (this.lastMatchTime > 0 && (now - this.lastMatchTime) <= this.comboWindowMs) {
      this.currentCombo += 1;
    } else {
      this.currentCombo = 1;
    }

    this.lastMatchTime = now;
    if (this.currentCombo > this.highestCombo) {
      this.highestCombo = this.currentCombo;
    }

    return this.getMultiplier();
  }

  /**
   * Register a mismatch error (resets current combo streak)
   */
  registerMismatch() {
    this.currentCombo = 0;
  }

  /**
   * Get current active multiplier scalar
   * @returns {number} 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x
   */
  getMultiplier() {
    return Math.min(8, Math.max(1, this.currentCombo));
  }

  reset() {
    this.currentCombo = 0;
    this.highestCombo = 0;
    this.lastMatchTime = 0;
  }
}
