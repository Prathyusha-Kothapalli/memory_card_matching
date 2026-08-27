/**
 * Memory Match Arena - Toast Notification Queue
 */
import { createElement } from '../utils/helpers.js';

export class ToastManager {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = createElement('div', {
        id: 'toast-container',
        style: 'position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;'
      });
      document.body.appendChild(container);
    }
    this.container = container;
  }

  /**
   * Show floating toast notification
   * @param {string} title 
   * @param {string} message 
   * @param {string} type - 'success', 'info', 'warning', 'achievement'
   * @param {number} duration 
   */
  show(title, message = '', type = 'info', duration = 3500) {
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      achievement: '🏆',
      levelup: '⭐'
    };

    const toast = createElement('div', {
      className: `toast toast-${type}`,
      style: `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        background: #161e31;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-left: 4px solid ${type === 'achievement' ? '#f59e0b' : type === 'success' ? '#10b981' : '#6366f1'};
        border-radius: 12px;
        color: #f8fafc;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        pointer-events: auto;
        animation: slideInRight 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      `
    }, [
      createElement('span', { style: 'font-size: 1.5rem;' }, icons[type] || 'ℹ️'),
      createElement('div', {}, [
        createElement('div', { style: 'font-weight: 700; font-size: 0.95rem;' }, title),
        message ? createElement('div', { style: 'font-size: 0.82rem; color: #94a3b8; margin-top: 2px;' }, message) : null
      ])
    ]);

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 300ms ease-out forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }
}

export const toastManager = new ToastManager();
