/**
 * Memory Match Arena - Card Class Model
 * Encapsulates card instance properties, state transitions, and DOM elements.
 */
import { createElement } from '../utils/helpers.js';

export class Card {
  /**
   * @param {string} id - Unique card instance identifier
   * @param {string} symbol - Card symbol/emoji/icon
   * @param {number} pairId - Pair identifier matching dual card
   */
  constructor(id, symbol, pairId) {
    this.id = id;
    this.symbol = symbol;
    this.pairId = pairId;
    this.isFlipped = false;
    this.isMatched = false;
    this.isLocked = false;
    this.element = null;
  }

  /**
   * Render HTML element for card
   * @returns {HTMLElement}
   */
  render() {
    const cardItem = createElement('div', {
      className: 'card-item',
      dataset: { id: this.id, pairId: this.pairId }
    });

    const inner = createElement('div', { className: 'card-inner' }, [
      createElement('div', { className: 'card-face card-back' }),
      createElement('div', { className: 'card-face card-front' }, this.symbol)
    ]);

    cardItem.appendChild(inner);
    this.element = cardItem;
    return cardItem;
  }

  /**
   * Flip card to front
   */
  flip() {
    if (this.isFlipped || this.isMatched || this.isLocked) return false;
    this.isFlipped = true;
    if (this.element) {
      this.element.classList.add('flipped');
    }
    return true;
  }

  /**
   * Unflip card back to hidden state
   */
  unflip() {
    if (!this.isFlipped || this.isMatched) return;
    this.isFlipped = false;
    if (this.element) {
      this.element.classList.remove('flipped');
      this.element.classList.remove('mismatched');
    }
  }

  /**
   * Mark card as successfully matched
   */
  setMatched() {
    this.isMatched = true;
    this.isFlipped = true;
    if (this.element) {
      this.element.classList.add('matched');
    }
  }

  /**
   * Trigger temporary mismatch error flash animation
   */
  setMismatched() {
    if (this.element) {
      this.element.classList.add('mismatched');
    }
  }

  /**
   * Toggle temporary hint highlight glow
   * @param {boolean} active 
   */
  setHint(active) {
    if (this.element) {
      if (active) {
        this.element.classList.add('hint-glow');
      } else {
        this.element.classList.remove('hint-glow');
      }
    }
  }
}
