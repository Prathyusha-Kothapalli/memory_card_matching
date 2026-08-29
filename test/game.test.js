const DifficultyManager = require('../js/difficultyManager');
const AudioManager = require('../js/audioManager');

describe('Memory Card Matching Unit Tests', () => {
    test('DifficultyManager returns 4x4 for easy level', () => {
        const cfg = DifficultyManager.getGridConfig('easy');
        expect(cfg.pairs).toBe(8);
    });

    test('AudioManager toggles mute state correctly', () => {
        const audio = new AudioManager();
        expect(audio.toggleMute()).toBe(true);
        expect(audio.playSound('flip')).toBe(false);
    });
});