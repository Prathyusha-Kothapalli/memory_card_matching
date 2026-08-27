/**
 * Memory Match Arena - Card Deck Generator & Fisher-Yates Shuffle
 */
import { Card } from './card.js';

export const THEME_SYMBOLS = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', 'crab', '🐡', '🐠', '🐟', '🐬', '🐳'],
  space: ['🚀', '🛸', '🛰', '🪐', '🌟', '⭐', '🌙', '☀️', '☄️', '🌌', '🌠', '👽', '👨‍🚀', '👩‍🚀', '🔭', '💥', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌚', '🌝', '🔮', '📡', '👾', '🌀', '🛸', '🛰', '💫', '🎆', '✨', '🪐', '☄️', '🌌', '🌠', '👨‍🚀', '👩‍🚀', '👽', '🚀', '🔭', '💥', '🌑', '🌔', '🌕'],
  nature: ['🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌺', '🌸', '🌼', '🌻', '🌹', '🌷', '🥀', '🪷', '🪵', '🪨', '🌊', '🌋', '🗻', '🏕', '🌄', '🌅', '🌈', '☀️', '🌤', '⛅', '☁️', '🌧', '🌩', '❄️', '☃️', '💧', '⚡', '🌟', '🌱', '🎍', '🪵', '🍄', '🌺', '🌸', '🌼', '🌻', '🌹', '🌷'],
  fantasy: ['🧙‍♂️', '🧙‍♀️', '🧝‍♂️', '🧝‍♀️', '🧚‍♂️', '🧚‍♀️', '🧜‍♂️', '🧜‍♀️', '🧛‍♂️', '🧛‍♀️', '🧟‍♂️', '🧞‍♂️', '🧞‍♀️', '🐲', '🐉', '🦄', '⚔️', '🛡', '🗡', '👑', '💎', '🔮', '📜', '🏰', '⛩', '🎆', '🧪', '🪄', '🧿', '🏹', '🔱', '🦹‍♂️', '🦹‍♀️', '🧙‍♂️', '🐲', '🐉', '🦄', '⚔️', '🛡', '🗡', '👑', '💎', '🔮', '📜', '🏰', '🧪', '🪄', '🧿', '🏹', '🔱'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🧇', '🥞', '🧀', '🍞', '🥐', '🥨', '🍳', '🥩', '🍗', '🥪', '🌮', '🌯', '🥗', '🥘', '🍝', '🍜', '🍲', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍩', '🍪', '🌰', '🍯', '🍼', '🥛', '☕', '🧃', '🧉'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🎯', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸', '🌁', '🏋️‍♂️', '🏋️‍♀️', '🤺', '🤼‍♂️', '🤼‍♀️', '🤸‍♂️', '🤸‍♀️', '⛹️‍♂️', '⛹️‍♀️', '🧗‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖', '🎟', '🎫', '⚽', '🏀']
};

export class CardDeck {
  /**
   * Fisher-Yates (Knuth) Shuffle Algorithm
   * @template T
   * @param {T[]} array 
   * @returns {T[]} Shuffled array in-place
   */
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Generate card deck for given theme and pair count
   * @param {string} themeKey 
   * @param {number} pairCount 
   * @returns {Card[]} Array of Card instances
   */
  static generateDeck(themeKey = 'animals', pairCount = 8) {
    const symbolPool = THEME_SYMBOLS[themeKey] || THEME_SYMBOLS['animals'];
    const selectedSymbols = symbolPool.slice(0, pairCount);

    const cards = [];
    selectedSymbols.forEach((symbol, pairId) => {
      // Create dual cards for each pair
      const cardA = new Card(`card_${pairId}_a`, symbol, pairId);
      const cardB = new Card(`card_${pairId}_b`, symbol, pairId);
      cards.push(cardA, cardB);
    });

    return CardDeck.shuffle(cards);
  }
}
