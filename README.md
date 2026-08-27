# 🧠 Memory Match Arena

**Memory Match Arena** is a production-quality, commercial-grade browser memory card matching game built using **Vanilla ES6+ JavaScript**, **CSS3 Design Systems**, and **HTML5**. It requires **zero external JS/CSS framework dependencies** (no React/Vue/Angular) and delivers a premium web experience with synthesized sound, 3D card flips, particle confetti, player progression, local leaderboards, 20+ achievements, and 6 custom visual themes.

---

## 🌟 Key Features & Highlights

- **9 Complete Application Screens**: Home, Play Game, Results Summary, Player Profile, Achievements Gallery, Local Leaderboards, Daily Challenge, Settings, and Help / How to Play.
- **5 Engaging Game Modes**:
  - **Classic**: Standard memory card matching with move efficiency scoring.
  - **Timed Mode**: Race against a ticking countdown clock before time expires.
  - **Limited Moves**: Complete the board within a strict move quota.
  - **Zen Mode**: Relaxed, pressure-free ambient play mode.
  - **Daily Challenge**: Date-seeded daily puzzle with custom modifiers.
- **4 Grid Difficulties**:
  - Easy (4×4 = 16 cards / 8 pairs)
  - Medium (6×6 = 36 cards / 18 pairs)
  - Hard (8×8 = 64 cards / 32 pairs)
  - Expert (10×10 = 100 cards / 50 pairs)
- **6 Visual Themes**: Animals 🐶, Space 🚀, Nature 🌲, Fantasy 🔮, Food 🍕, Sports ⚽.
- **Synthesized Web Audio Sound Engine**: Custom procedural Web Audio API synthesizer for card flips, match chimes, mismatch errors, combo streaks, victory fanfares, and ambient background music without external audio files.
- **HTML5 Canvas Confetti Engine**: Real-time physics particle renderer for victory celebrations.
- **Player Progression & Rewards**: Leveling system with XP formula, rank titles, avatar selection, daily login streak tracker, and persistent LocalStorage database.
- **20+ Achievements**: Badges, progress bars, unlock popups, and reward tracking.
- **Python 3.10+ Utilities**: Project verification, score payload validation, and player stats analysis.
- **Docker & Makefile Integration**: Complete Docker containerization and build targets.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** 16+
- **Python** 3.10+ (for utility verification tools)
- **Docker & Docker Compose** (optional for containerized deployment)

### 1. Running Locally
Clone or navigate to the project directory:
```bash
npm start
```
Then open your web browser at: `http://localhost:8080`

---

## 🧪 Testing & Verification

### Running Automated Test Suite
To execute the Node.js unit tests covering storage, card deck generation, Fisher-Yates shuffle, scoring formulas, timers, and statistics:
```bash
npm test
```
or
```bash
make test
```

### Running Python 3.10+ Utility Tools
1. **Verify Project Health**:
   ```bash
   python3 scripts/verify_project.py
   ```
2. **Validate Game Score Payload**:
   ```bash
   python3 scripts/validate_score.py --mode classic --difficulty hard --moves 25 --time 45 --score 8500
   ```
3. **Analyze Exported Player Stats**:
   ```bash
   python3 scripts/analyze_stats.py
   ```

---

## 🐳 Docker Deployment

To build and run the production application container:
```bash
make docker-run
```
Or using Docker Compose directly:
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:8080`.

---

## 🛠️ Makefile Commands

| Target | Description |
|---|---|
| `make setup` | Install dependencies |
| `make test` | Execute Node test runner |
| `make verify` | Run Python project verification scripts |
| `make serve` | Launch local HTTP web server |
| `make docker-build` | Build Docker container image |
| `make docker-run` | Run containerized app on port 8080 |
| `make clean` | Clean build artifacts |
