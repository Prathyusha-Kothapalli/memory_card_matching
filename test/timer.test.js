/**
 * Game Timer Unit Tests
 */
import { GameTimer } from '../js/game/timer.js';

describe('GameTimer Tests', () => {
  it('should count elapsed seconds correctly in count-up mode', (done) => {
    let tickCount = 0;
    const timer = new GameTimer({
      isCountdown: false,
      onTick: (elapsed) => {
        tickCount = elapsed;
      }
    });

    timer.start();
    setTimeout(() => {
      timer.stop();
      assert.isTrue(tickCount >= 1, 'Timer tick should increment elapsed seconds');
    }, 1150);
  });

  it('should countdown and expire in countdown mode', () => {
    let expired = false;
    const timer = new GameTimer({
      isCountdown: true,
      initialSeconds: 1,
      onExpire: () => {
        expired = true;
      }
    });

    timer.start();
    setTimeout(() => {
      assert.isTrue(expired, 'Countdown timer should fire expiration callback');
    }, 1200);
  });
});
