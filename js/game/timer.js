/**
 * Memory Match Arena - High-Precision Game Timer
 * Supports count-up (Classic/Zen) and countdown (Timed mode) with pause/resume ticks.
 */
export class GameTimer {
  /**
   * @param {Object} options 
   * @param {boolean} options.isCountdown 
   * @param {number} options.initialSeconds 
   * @param {Function} options.onTick 
   * @param {Function} options.onExpire 
   */
  constructor({ isCountdown = false, initialSeconds = 0, onTick = null, onExpire = null } = {}) {
    this.isCountdown = isCountdown;
    this.initialSeconds = initialSeconds;
    this.elapsedSeconds = 0;
    this.remainingSeconds = initialSeconds;
    this.isRunning = false;
    this.isPaused = false;
    this.timerId = null;
    this.onTick = onTick;
    this.onExpire = onExpire;
  }

  start() {
    this.stop();
    this.isRunning = true;
    this.isPaused = false;

    this.timerId = setInterval(() => {
      if (this.isPaused) return;

      if (this.isCountdown) {
        this.remainingSeconds -= 1;
        this.elapsedSeconds += 1;
        if (this.onTick) this.onTick(this.remainingSeconds, this.elapsedSeconds);

        if (this.remainingSeconds <= 0) {
          this.stop();
          if (this.onExpire) this.onExpire();
        }
      } else {
        this.elapsedSeconds += 1;
        if (this.onTick) this.onTick(this.elapsedSeconds);
      }
    }, 1000);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.elapsedSeconds = 0;
    this.remainingSeconds = this.initialSeconds;
  }

  getTimeDisplay() {
    return this.isCountdown ? this.remainingSeconds : this.elapsedSeconds;
  }
}
