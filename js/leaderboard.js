class Leaderboard {
    static saveScore(difficulty, moves, timeSeconds) {
        const key = leaderboard_\;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ moves, timeSeconds, date: new Date().toISOString() });
        existing.sort((a, b) => a.moves - b.moves || a.timeSeconds - b.timeSeconds);
        localStorage.setItem(key, JSON.stringify(existing.slice(0, 5)));
    }
}
if (typeof module !== 'undefined') module.exports = Leaderboard;