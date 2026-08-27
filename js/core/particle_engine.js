/**
 * Memory Match Arena - HTML5 Canvas Particle Engine
 * Handles victory confetti particle bursts and particle physics.
 */
import { $ } from '../utils/helpers.js';

export class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
  }

  init() {
    this.canvas = $('#confetti-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  /**
   * Launch celebratory confetti burst
   * @param {number} count 
   */
  burst(count = 120) {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

export const particleEngine = new ParticleEngine();
