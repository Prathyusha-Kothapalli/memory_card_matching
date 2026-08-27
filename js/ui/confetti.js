/**
 * Memory Match Arena - Confetti Helper Trigger
 */
import { particleEngine } from '../core/particle_engine.js';
import { eventBus } from '../core/event_bus.js';

export function setupConfettiTriggers() {
  eventBus.on('game:victory', () => {
    particleEngine.burst(150);
  });
}
