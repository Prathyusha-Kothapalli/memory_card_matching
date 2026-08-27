/**
 * Card Engine & Pair Matching Unit Tests
 */
import { Card } from '../js/game/card.js';
import { CardDeck } from '../js/game/card_deck.js';

describe('Card Engine Tests', () => {
  it('should initialize card state correctly', () => {
    const card = new Card('c1', '🚀', 0);
    assert.strictEqual(card.id, 'c1');
    assert.strictEqual(card.symbol, '🚀');
    assert.isFalse(card.isFlipped);
    assert.isFalse(card.isMatched);
  });

  it('should generate correct number of cards for given grid pairs', () => {
    const deck4x4 = CardDeck.generateDeck('space', 8);
    assert.strictEqual(deck4x4.length, 16, '4x4 grid must have 16 cards');

    const deck6x6 = CardDeck.generateDeck('space', 18);
    assert.strictEqual(deck6x6.length, 36, '6x6 grid must have 36 cards');

    const deck8x8 = CardDeck.generateDeck('animals', 32);
    assert.strictEqual(deck8x8.length, 64, '8x8 grid must have 64 cards');

    const deck10x10 = CardDeck.generateDeck('nature', 50);
    assert.strictEqual(deck10x10.length, 100, '10x10 grid must have 100 cards');
  });

  it('should verify dual card pair matching equality', () => {
    const cardA = new Card('card_0_a', '🐶', 0);
    const cardB = new Card('card_0_b', '🐶', 0);
    const cardC = new Card('card_1_a', '🐱', 1);

    assert.strictEqual(cardA.pairId, cardB.pairId, 'Matching pair IDs must equal');
    assert.isFalse(cardA.pairId === cardC.pairId, 'Different pairs must not match');
  });
});
