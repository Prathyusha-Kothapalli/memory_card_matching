/**
 * Memory Match Arena - Modal Dialog Manager
 */
import { $, createElement } from '../utils/helpers.js';

export class ModalManager {
  constructor() {
    this.activeModal = null;
  }

  /**
   * Open modal dialog with custom title, body content, and action buttons
   * @param {Object} options 
   * @param {string} options.title
   * @param {string|HTMLElement} options.content
   * @param {Array<{ text: string, type: string, onClick: Function }>} options.buttons
   */
  open({ title, content, buttons = [] }) {
    this.close();

    const backdrop = createElement('div', { className: 'modal-backdrop active' });
    const container = createElement('div', { className: 'modal-container' });

    // Header
    const header = createElement('div', { className: 'modal-header' }, [
      createElement('h3', { className: 'modal-title' }, title),
      createElement('button', {
        className: 'modal-close-btn',
        onClick: () => this.close()
      }, '✕')
    ]);

    // Body
    const body = createElement('div', { className: 'modal-body' });
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      body.appendChild(content);
    }

    container.appendChild(header);
    container.appendChild(body);

    // Footer buttons
    if (buttons.length > 0) {
      const footer = createElement('div', { className: 'modal-footer' });
      buttons.forEach(btn => {
        const buttonEl = createElement('button', {
          className: `btn btn-${btn.type || 'secondary'}`,
          onClick: () => {
            if (btn.onClick) btn.onClick();
            this.close();
          }
        }, btn.text);
        footer.appendChild(buttonEl);
      });
      container.appendChild(footer);
    }

    backdrop.appendChild(container);
    document.body.appendChild(backdrop);
    this.activeModal = backdrop;

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.close();
      }
    });
  }

  close() {
    if (this.activeModal && this.activeModal.parentNode) {
      this.activeModal.parentNode.removeChild(this.activeModal);
      this.activeModal = null;
    }
  }
}

export const modalManager = new ModalManager();
