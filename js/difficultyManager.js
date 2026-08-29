class DifficultyManager {
    static getGridConfig(level) {
        const configs = {
            easy: { rows: 4, cols: 4, pairs: 8 },
            medium: { rows: 6, cols: 6, pairs: 18 },
            hard: { rows: 8, cols: 8, pairs: 32 }
        };
        return configs[level.toLowerCase()] || configs.easy;
    }
}
if (typeof module !== 'undefined') module.exports = DifficultyManager;