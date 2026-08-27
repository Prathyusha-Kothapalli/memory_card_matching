/**
 * Fisher-Yates Shuffle Algorithm Unit Tests
 */
import { CardDeck } from '../js/game/card_deck.js';

describe('Shuffle Algorithm Tests', () => {
  it('should maintain array length and elements during shuffle', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = CardDeck.shuffle(input);

    assert.strictEqual(shuffled.length, input.length, 'Shuffled length must match input');
    input.forEach(item => {
      assert.isTrue(shuffled.includes(item), `Shuffled array must contain element ${item}`);
    });
  });

  it('should produce random permutation distribution across multiple runs', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let identicalCount = 0;

    for (let i = 0; i < 20; i++) {
      const shuffled = CardDeck.shuffle(original);
      if (shuffled.every((val, idx) => val === original[idx])) {
        identicalCount++;
      }
    }

    assert.isTrue(identicalCount < 2, 'Probability of identical shuffle 20 times is virtually 0');
  });
});
