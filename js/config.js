/**
 * Memory Match Arena - Global Configuration & Constants
 */
export const CONFIG = {
  APP_NAME: 'Memory Match Arena',
  VERSION: '1.0.0',
  STORAGE_KEY: 'mma_player_data_v1',
  
  // Game Modes
  MODES: {
    CLASSIC: 'classic',
    TIMED: 'timed',
    LIMITED_MOVES: 'limited_moves',
    ZEN: 'zen',
    DAILY: 'daily'
  },

  // Difficulty Grid Configurations
  DIFFICULTIES: {
    EASY: {
      id: 'easy',
      name: 'Easy',
      rows: 4,
      cols: 4,
      pairs: 8,
      timeLimit: 60, // seconds for timed mode
      maxMoves: 20,  // max moves for limited moves mode
      basePoints: 100,
      xpReward: 150,
      starThresholds: { time: 40, moves: 12, accuracy: 80 }
    },
    MEDIUM: {
      id: 'medium',
      name: 'Medium',
      rows: 6,
      cols: 6,
      pairs: 18,
      timeLimit: 120,
      maxMoves: 45,
      basePoints: 250,
      xpReward: 350,
      starThresholds: { time: 90, moves: 28, accuracy: 75 }
    },
    HARD: {
      id: 'hard',
      name: 'Hard',
      rows: 8,
      cols: 8,
      pairs: 32,
      timeLimit: 240,
      maxMoves: 90,
      basePoints: 500,
      xpReward: 750,
      starThresholds: { time: 180, moves: 55, accuracy: 70 }
    },
    EXPERT: {
      id: 'expert',
      name: 'Expert',
      rows: 10,
      cols: 10,
      pairs: 50,
      timeLimit: 420,
      maxMoves: 150,
      basePoints: 1000,
      xpReward: 1500,
      starThresholds: { time: 300, moves: 95, accuracy: 65 }
    }
  },

  // Theme Identifiers
  THEMES: {
    ANIMALS: 'animals',
    SPACE: 'space',
    NATURE: 'nature',
    FANTASY: 'fantasy',
    FOOD: 'food',
    SPORTS: 'sports'
  },

  // Level Progression Formula: XP required for level N = LEVEL_BASE_XP * (N ^ LEVEL_EXPONENT)
  LEVEL_BASE_XP: 200,
  LEVEL_EXPONENT: 1.5,

  // Rank Titles by Level Range
  RANK_TITLES: [
    { minLevel: 1, title: 'Novice Memory Trainee', badge: '🌱' },
    { minLevel: 3, title: 'Card Apprentice', badge: '🃏' },
    { minLevel: 5, title: 'Mind Specialist', badge: '🔮' },
    { minLevel: 8, title: 'Memory Tactician', badge: '⚡' },
    { minLevel: 12, title: 'Brainiac Master', badge: '🧠' },
    { minLevel: 16, title: 'Grandmaster Matcher', badge: '👑' },
    { minLevel: 20, title: 'Cosmic Memory God', badge: '🌌' }
  ],

  // Available Player Avatars
  AVATARS: [
    '🐱', '🐶', '🦊', '🐼', '🦁', '🤖', '👾', '👨‍🚀',
    '🧙‍♂️', '🥷', '🐲', '🦄', '🦅', '🦈', '👑', '🔥'
  ],

  // Default Player Data Template
  DEFAULT_PLAYER_DATA: {
    profile: {
      username: 'MemoryChamp',
      avatar: '🐱',
      level: 1,
      xp: 0,
      createdAt: new Date().toISOString(),
      lastLoginDate: new Date().toISOString().split('T')[0],
      loginStreak: 1,
      lastStreakClaimDate: '',
      unlockedThemes: ['animals', 'space']
    },
    settings: {
      sfxVolume: 0.8,
      musicVolume: 0.4,
      sfxEnabled: true,
      musicEnabled: true,
      currentTheme: 'space',
      cardBackStyle: 'default',
      highContrastMode: false
    },
    stats: {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      totalMoves: 0,
      totalPlayTimeSeconds: 0,
      highestScore: 0,
      highestCombo: 0,
      fastestTimeByDifficulty: {
        easy: null,
        medium: null,
        hard: null,
        expert: null
      },
      fewestMovesByDifficulty: {
        easy: null,
        medium: null,
        hard: null,
        expert: null
      },
      themePlayCounts: {
        animals: 0,
        space: 0,
        nature: 0,
        fantasy: 0,
        food: 0,
        sports: 0
      },
      difficultyPlayCounts: {
        easy: 0,
        medium: 0,
        hard: 0,
        expert: 0
      }
    },
    achievements: {},
    dailyChallengeHistory: {},
    leaderboards: []
  }
};
