/**
 * Memory Match Arena - Power-Ups Controller
 * Manages Hint charges and Shuffle power-up actions during gameplay.
 */
import { CardDeck } from './card_deck.js';

export class PowerUpController {
  constructor() {
    this.hintCharges = 3;
    this.shuffleCharges = 2;
  }

  reset() {
    this.hintCharges = 3;
    this.shuffleCharges = 2;
  }

  /**
   * Use a Hint charge: briefly reveals 2 matching cards on the board
   * @param {Card[]} cards - Active deck cards
   * @returns {{ success: boolean, matchPair: Card[]|null }}
   */
  useHint(cards) {
    if (this.hintCharges <= 0) return { success: false, matchPair: null };

    // Find unmatched pairs
    const unmatched = cards.filter(c => !c.isMatched && !c.isFlipped);
    if (unmatched.length < 2) return { success: false, matchPair: null };

    // Find first available pair
    const pairMap = new Map();
    let foundPair = null;

    for (const card of unmatched) {
      if (pairMap.has(card.pairId)) {
        foundPair = [pairMap.get(card.pairId), card];
        break;
      }
      pairMap.set(card.pairId, card);
    }

    if (!foundPair) return { success: false, matchPair: null };

    this.hintCharges -= 1;
    return { success: true, matchPair: foundPair };
  }

  /**
   * Use a Shuffle powerup: re-arranges unmatched cards on the grid
   * @param {Card[]} cards - Active deck cards
   * @returns {{ success: boolean, reshuffledDeck: Card[] }}
   */
  useShuffle(cards) {
    if (this.shuffleCharges <= 0) return { success: false, reshuffledDeck: cards };

    const unmatchedIndices = [];
    const unmatchedCards = [];

    cards.forEach((card, index) => {
      if (!card.isMatched && !card.isFlipped) {
        unmatchedIndices.push(index);
        unmatchedCards.push(card);
      }
    });

    if (unmatchedCards.length < 4) return { success: false, reshuffledDeck: cards };

    this.shuffleCharges -= 1;
    const shuffled = CardDeck.shuffle(unmatchedCards);

    const newDeck = [...cards];
    unmatchedIndices.forEach((gridPos, i) => {
      newDeck[gridPos] = shuffled[i];
    });

    return { success: true, reshuffledDeck: newDeck };
  }
}
