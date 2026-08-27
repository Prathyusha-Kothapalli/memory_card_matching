/**
 * Memory Match Arena - Main Game State Controller Engine
 */
import { CONFIG } from '../config.js';
import { CardDeck } from './card_deck.js';
import { GameTimer } from './timer.js';
import { ScoreCalculator } from './score_calculator.js';
import { ComboManager } from './combo_manager.js';
import { PowerUpController } from './powerups.js';
import { eventBus } from '../core/event_bus.js';

export class GameEngine {
  constructor() {
    this.mode = CONFIG.MODES.CLASSIC;
    this.difficulty = 'easy';
    this.theme = 'space';
    
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairsCount = 0;
    this.totalMoves = 0;
    
    this.isGameActive = false;
    this.isPaused = false;
    this.isProcessingTurn = false;

    this.comboManager = new ComboManager();
    this.powerups = new PowerUpController();
    this.timer = null;
  }

  /**
   * Start a new game match session
   * @param {Object} options 
   * @param {string} options.mode 
   * @param {string} options.difficulty 
   * @param {string} options.theme 
   */
  startNewGame({ mode = CONFIG.MODES.CLASSIC, difficulty = 'easy', theme = 'space' } = {}) {
    this.mode = mode;
    this.difficulty = difficulty;
    this.theme = theme;

    const diffConfig = CONFIG.DIFFICULTIES[difficulty.toUpperCase()] || CONFIG.DIFFICULTIES.EASY;

    // Reset game state
    this.matchedPairsCount = 0;
    this.totalMoves = 0;
    this.flippedCards = [];
    this.isGameActive = true;
    this.isPaused = false;
    this.isProcessingTurn = false;

    this.comboManager.reset();
    this.powerups.reset();

    // Generate Card Deck
    this.cards = CardDeck.generateDeck(theme, diffConfig.pairs);

    // Initialize Timer
    const isCountdown = mode === CONFIG.MODES.TIMED;
    const initialSeconds = isCountdown ? diffConfig.timeLimit : 0;

    this.timer = new GameTimer({
      isCountdown,
      initialSeconds,
      onTick: (displayTime) => {
        eventBus.emit('game:timer_tick', { displayTime, isCountdown });
      },
      onExpire: () => {
        this.handleGameOver('Time limit expired!');
      }
    });

    this.timer.start();

    eventBus.emit('game:started', {
      mode: this.mode,
      difficulty: this.difficulty,
      theme: this.theme,
      diffConfig,
      cards: this.cards
    });
  }

  /**
   * Handle card click user interaction
   * @param {string} cardId 
   */
  handleCardClick(cardId) {
    if (!this.isGameActive || this.isPaused || this.isProcessingTurn) return;

    const card = this.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const flippedSuccess = card.flip();
    if (!flippedSuccess) return;

    this.flippedCards.push(card);
    eventBus.emit('game:card_flipped', { card });

    if (this.flippedCards.length === 2) {
      this.evaluateTurn();
    }
  }

  /**
   * Evaluate turn match condition when 2 cards are flipped
   */
  evaluateTurn() {
    this.isProcessingTurn = true;
    this.totalMoves += 1;

    const [card1, card2] = this.flippedCards;
    const diffConfig = CONFIG.DIFFICULTIES[this.difficulty.toUpperCase()];

    // Check match
    if (card1.pairId === card2.pairId) {
      // MATCH SUCCESS
      card1.setMatched();
      card2.setMatched();
      this.matchedPairsCount += 1;
      
      const multiplier = this.comboManager.registerMatch();
      this.flippedCards = [];
      this.isProcessingTurn = false;

      eventBus.emit('game:match', {
        card1,
        card2,
        multiplier,
        matchedPairsCount: this.matchedPairsCount,
        totalPairs: diffConfig.pairs
      });

      // Check Victory Condition
      if (this.matchedPairsCount === diffConfig.pairs) {
        this.handleVictory();
      }
    } else {
      // MISMATCH
      card1.setMismatched();
      card2.setMismatched();
      this.comboManager.registerMismatch();

      eventBus.emit('game:mismatch', { card1, card2 });

      setTimeout(() => {
        card1.unflip();
        card2.unflip();
        this.flippedCards = [];
        this.isProcessingTurn = false;

        // Check Limited Moves Mode Loss Condition
        if (this.mode === CONFIG.MODES.LIMITED_MOVES && this.totalMoves >= diffConfig.maxMoves) {
          this.handleGameOver('Out of available moves!');
        }
      }, 900);
    }

    eventBus.emit('game:moves_updated', {
      totalMoves: this.totalMoves,
      maxMoves: diffConfig.maxMoves,
      mode: this.mode
    });
  }

  /**
   * Trigger Hint power-up action
   */
  triggerHint() {
    if (!this.isGameActive || this.isPaused || this.isProcessingTurn) return;

    const res = this.powerups.useHint(this.cards);
    if (res.success && res.matchPair) {
      const [cardA, cardB] = res.matchPair;
      cardA.setHint(true);
      cardB.setHint(true);

      setTimeout(() => {
        cardA.setHint(false);
        cardB.setHint(false);
      }, 1500);

      eventBus.emit('game:hint_used', { chargesRemaining: this.powerups.hintCharges });
    }
  }

  /**
   * Trigger Shuffle power-up action
   */
  triggerShuffle() {
    if (!this.isGameActive || this.isPaused || this.isProcessingTurn) return;

    const res = this.powerups.useShuffle(this.cards);
    if (res.success) {
      this.cards = res.reshuffledDeck;
      eventBus.emit('game:shuffled', {
        cards: this.cards,
        chargesRemaining: this.powerups.shuffleCharges
      });
    }
  }

  pause() {
    if (!this.isGameActive || this.isPaused) return;
    this.isPaused = true;
    if (this.timer) this.timer.pause();
    eventBus.emit('game:paused');
  }

  resume() {
    if (!this.isGameActive || !this.isPaused) return;
    this.isPaused = false;
    if (this.timer) this.timer.resume();
    eventBus.emit('game:resumed');
  }

  handleVictory() {
    this.isGameActive = false;
    if (this.timer) this.timer.stop();

    const elapsedSeconds = this.timer ? this.timer.elapsedSeconds : 0;
    const scoreResult = ScoreCalculator.calculateScore({
      difficultyKey: this.difficulty,
      matchedPairs: this.matchedPairsCount,
      totalMoves: this.totalMoves,
      elapsedSeconds,
      highestCombo: this.comboManager.highestCombo,
      gameMode: this.mode
    });

    eventBus.emit('game:victory', {
      mode: this.mode,
      difficulty: this.difficulty,
      theme: this.theme,
      moves: this.totalMoves,
      elapsedSeconds,
      scoreResult,
      highestCombo: this.comboManager.highestCombo
    });
  }

  handleGameOver(reason = 'Game Over') {
    this.isGameActive = false;
    if (this.timer) this.timer.stop();

    eventBus.emit('game:over', {
      reason,
      mode: this.mode,
      difficulty: this.difficulty,
      moves: this.totalMoves,
      elapsedSeconds: this.timer ? this.timer.elapsedSeconds : 0
    });
  }
}

export const gameEngine = new GameEngine();
