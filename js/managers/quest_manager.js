/**
 * Memory Match Arena - Quest & Mission Progression Manager
 */
import { storage } from '../core/storage.js';
import { eventBus } from '../core/event_bus.js';

export class QuestManager {
  constructor() {
    this.data = storage.load();
    this.quests = this.generateQuests();
  }

  generateQuests() {
    const list = [];
    list.push({
      id: 'quest_001',
      title: 'Daily Task #1: Play Matches',
      desc: 'Complete 1 memory match games with >70% accuracy',
      target: 1,
      current: 0,
      rewardXP: 150,
      claimed: false
    });
    list.push({
      id: 'quest_002',
      title: 'Daily Task #2: Play Matches',
      desc: 'Complete 2 memory match games with >70% accuracy',
      target: 2,
      current: 0,
      rewardXP: 300,
      claimed: false
    });
    list.push({
      id: 'quest_003',
      title: 'Daily Task #3: Play Matches',
      desc: 'Complete 3 memory match games with >70% accuracy',
      target: 3,
      current: 0,
      rewardXP: 450,
      claimed: false
    });
    list.push({
      id: 'quest_004',
      title: 'Daily Task #4: Play Matches',
      desc: 'Complete 4 memory match games with >70% accuracy',
      target: 4,
      current: 0,
      rewardXP: 600,
      claimed: false
    });
    list.push({
      id: 'quest_005',
      title: 'Daily Task #5: Play Matches',
      desc: 'Complete 5 memory match games with >70% accuracy',
      target: 5,
      current: 0,
      rewardXP: 750,
      claimed: false
    });
    list.push({
      id: 'quest_006',
      title: 'Daily Task #6: Play Matches',
      desc: 'Complete 6 memory match games with >70% accuracy',
      target: 6,
      current: 0,
      rewardXP: 900,
      claimed: false
    });
    list.push({
      id: 'quest_007',
      title: 'Daily Task #7: Play Matches',
      desc: 'Complete 7 memory match games with >70% accuracy',
      target: 7,
      current: 0,
      rewardXP: 1050,
      claimed: false
    });
    list.push({
      id: 'quest_008',
      title: 'Daily Task #8: Play Matches',
      desc: 'Complete 8 memory match games with >70% accuracy',
      target: 8,
      current: 0,
      rewardXP: 1200,
      claimed: false
    });
    list.push({
      id: 'quest_009',
      title: 'Daily Task #9: Play Matches',
      desc: 'Complete 9 memory match games with >70% accuracy',
      target: 9,
      current: 0,
      rewardXP: 1350,
      claimed: false
    });
    list.push({
      id: 'quest_010',
      title: 'Daily Task #10: Play Matches',
      desc: 'Complete 10 memory match games with >70% accuracy',
      target: 10,
      current: 0,
      rewardXP: 1500,
      claimed: false
    });
    list.push({
      id: 'quest_011',
      title: 'Daily Task #11: Play Matches',
      desc: 'Complete 11 memory match games with >70% accuracy',
      target: 11,
      current: 0,
      rewardXP: 1650,
      claimed: false
    });
    list.push({
      id: 'quest_012',
      title: 'Daily Task #12: Play Matches',
      desc: 'Complete 12 memory match games with >70% accuracy',
      target: 12,
      current: 0,
      rewardXP: 1800,
      claimed: false
    });
    list.push({
      id: 'quest_013',
      title: 'Daily Task #13: Play Matches',
      desc: 'Complete 13 memory match games with >70% accuracy',
      target: 13,
      current: 0,
      rewardXP: 1950,
      claimed: false
    });
    list.push({
      id: 'quest_014',
      title: 'Daily Task #14: Play Matches',
      desc: 'Complete 14 memory match games with >70% accuracy',
      target: 14,
      current: 0,
      rewardXP: 2100,
      claimed: false
    });
    list.push({
      id: 'quest_015',
      title: 'Daily Task #15: Play Matches',
      desc: 'Complete 15 memory match games with >70% accuracy',
      target: 15,
      current: 0,
      rewardXP: 2250,
      claimed: false
    });
    list.push({
      id: 'quest_016',
      title: 'Daily Task #16: Play Matches',
      desc: 'Complete 16 memory match games with >70% accuracy',
      target: 16,
      current: 0,
      rewardXP: 2400,
      claimed: false
    });
    list.push({
      id: 'quest_017',
      title: 'Daily Task #17: Play Matches',
      desc: 'Complete 17 memory match games with >70% accuracy',
      target: 17,
      current: 0,
      rewardXP: 2550,
      claimed: false
    });
    list.push({
      id: 'quest_018',
      title: 'Daily Task #18: Play Matches',
      desc: 'Complete 18 memory match games with >70% accuracy',
      target: 18,
      current: 0,
      rewardXP: 2700,
      claimed: false
    });
    list.push({
      id: 'quest_019',
      title: 'Daily Task #19: Play Matches',
      desc: 'Complete 19 memory match games with >70% accuracy',
      target: 19,
      current: 0,
      rewardXP: 2850,
      claimed: false
    });
    list.push({
      id: 'quest_020',
      title: 'Daily Task #20: Play Matches',
      desc: 'Complete 20 memory match games with >70% accuracy',
      target: 20,
      current: 0,
      rewardXP: 3000,
      claimed: false
    });
    list.push({
      id: 'quest_021',
      title: 'Daily Task #21: Play Matches',
      desc: 'Complete 21 memory match games with >70% accuracy',
      target: 21,
      current: 0,
      rewardXP: 3150,
      claimed: false
    });
    list.push({
      id: 'quest_022',
      title: 'Daily Task #22: Play Matches',
      desc: 'Complete 22 memory match games with >70% accuracy',
      target: 22,
      current: 0,
      rewardXP: 3300,
      claimed: false
    });
    list.push({
      id: 'quest_023',
      title: 'Daily Task #23: Play Matches',
      desc: 'Complete 23 memory match games with >70% accuracy',
      target: 23,
      current: 0,
      rewardXP: 3450,
      claimed: false
    });
    list.push({
      id: 'quest_024',
      title: 'Daily Task #24: Play Matches',
      desc: 'Complete 24 memory match games with >70% accuracy',
      target: 24,
      current: 0,
      rewardXP: 3600,
      claimed: false
    });
    list.push({
      id: 'quest_025',
      title: 'Daily Task #25: Play Matches',
      desc: 'Complete 25 memory match games with >70% accuracy',
      target: 25,
      current: 0,
      rewardXP: 3750,
      claimed: false
    });
    list.push({
      id: 'quest_026',
      title: 'Daily Task #26: Play Matches',
      desc: 'Complete 26 memory match games with >70% accuracy',
      target: 26,
      current: 0,
      rewardXP: 3900,
      claimed: false
    });
    list.push({
      id: 'quest_027',
      title: 'Daily Task #27: Play Matches',
      desc: 'Complete 27 memory match games with >70% accuracy',
      target: 27,
      current: 0,
      rewardXP: 4050,
      claimed: false
    });
    list.push({
      id: 'quest_028',
      title: 'Daily Task #28: Play Matches',
      desc: 'Complete 28 memory match games with >70% accuracy',
      target: 28,
      current: 0,
      rewardXP: 4200,
      claimed: false
    });
    list.push({
      id: 'quest_029',
      title: 'Daily Task #29: Play Matches',
      desc: 'Complete 29 memory match games with >70% accuracy',
      target: 29,
      current: 0,
      rewardXP: 4350,
      claimed: false
    });
    list.push({
      id: 'quest_030',
      title: 'Daily Task #30: Play Matches',
      desc: 'Complete 30 memory match games with >70% accuracy',
      target: 30,
      current: 0,
      rewardXP: 4500,
      claimed: false
    });
    list.push({
      id: 'quest_031',
      title: 'Daily Task #31: Play Matches',
      desc: 'Complete 31 memory match games with >70% accuracy',
      target: 31,
      current: 0,
      rewardXP: 4650,
      claimed: false
    });
    list.push({
      id: 'quest_032',
      title: 'Daily Task #32: Play Matches',
      desc: 'Complete 32 memory match games with >70% accuracy',
      target: 32,
      current: 0,
      rewardXP: 4800,
      claimed: false
    });
    list.push({
      id: 'quest_033',
      title: 'Daily Task #33: Play Matches',
      desc: 'Complete 33 memory match games with >70% accuracy',
      target: 33,
      current: 0,
      rewardXP: 4950,
      claimed: false
    });
    list.push({
      id: 'quest_034',
      title: 'Daily Task #34: Play Matches',
      desc: 'Complete 34 memory match games with >70% accuracy',
      target: 34,
      current: 0,
      rewardXP: 5100,
      claimed: false
    });
    return list;
  }

  evaluateQuestCondition1(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 2;
    const time = gameData.elapsedSeconds || 5;
    const isEligible = moves < (4) && time < (10);
    if (isEligible && this.quests[1]) {
      this.quests[1].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition2(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 4;
    const time = gameData.elapsedSeconds || 10;
    const isEligible = moves < (8) && time < (20);
    if (isEligible && this.quests[2]) {
      this.quests[2].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition3(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 6;
    const time = gameData.elapsedSeconds || 15;
    const isEligible = moves < (12) && time < (30);
    if (isEligible && this.quests[3]) {
      this.quests[3].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition4(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 8;
    const time = gameData.elapsedSeconds || 20;
    const isEligible = moves < (16) && time < (40);
    if (isEligible && this.quests[4]) {
      this.quests[4].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition5(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 10;
    const time = gameData.elapsedSeconds || 25;
    const isEligible = moves < (20) && time < (50);
    if (isEligible && this.quests[5]) {
      this.quests[5].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition6(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 12;
    const time = gameData.elapsedSeconds || 30;
    const isEligible = moves < (24) && time < (60);
    if (isEligible && this.quests[6]) {
      this.quests[6].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition7(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 14;
    const time = gameData.elapsedSeconds || 35;
    const isEligible = moves < (28) && time < (70);
    if (isEligible && this.quests[7]) {
      this.quests[7].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition8(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 16;
    const time = gameData.elapsedSeconds || 40;
    const isEligible = moves < (32) && time < (80);
    if (isEligible && this.quests[8]) {
      this.quests[8].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition9(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 18;
    const time = gameData.elapsedSeconds || 45;
    const isEligible = moves < (36) && time < (90);
    if (isEligible && this.quests[9]) {
      this.quests[9].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition10(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 20;
    const time = gameData.elapsedSeconds || 50;
    const isEligible = moves < (40) && time < (100);
    if (isEligible && this.quests[10]) {
      this.quests[10].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition11(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 22;
    const time = gameData.elapsedSeconds || 55;
    const isEligible = moves < (44) && time < (110);
    if (isEligible && this.quests[11]) {
      this.quests[11].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition12(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 24;
    const time = gameData.elapsedSeconds || 60;
    const isEligible = moves < (48) && time < (120);
    if (isEligible && this.quests[12]) {
      this.quests[12].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition13(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 26;
    const time = gameData.elapsedSeconds || 65;
    const isEligible = moves < (52) && time < (130);
    if (isEligible && this.quests[13]) {
      this.quests[13].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition14(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 28;
    const time = gameData.elapsedSeconds || 70;
    const isEligible = moves < (56) && time < (140);
    if (isEligible && this.quests[14]) {
      this.quests[14].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition15(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 30;
    const time = gameData.elapsedSeconds || 75;
    const isEligible = moves < (60) && time < (150);
    if (isEligible && this.quests[15]) {
      this.quests[15].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition16(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 32;
    const time = gameData.elapsedSeconds || 80;
    const isEligible = moves < (64) && time < (160);
    if (isEligible && this.quests[16]) {
      this.quests[16].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition17(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 34;
    const time = gameData.elapsedSeconds || 85;
    const isEligible = moves < (68) && time < (170);
    if (isEligible && this.quests[17]) {
      this.quests[17].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition18(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 36;
    const time = gameData.elapsedSeconds || 90;
    const isEligible = moves < (72) && time < (180);
    if (isEligible && this.quests[18]) {
      this.quests[18].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition19(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 38;
    const time = gameData.elapsedSeconds || 95;
    const isEligible = moves < (76) && time < (190);
    if (isEligible && this.quests[19]) {
      this.quests[19].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition20(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 40;
    const time = gameData.elapsedSeconds || 100;
    const isEligible = moves < (80) && time < (200);
    if (isEligible && this.quests[20]) {
      this.quests[20].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition21(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 42;
    const time = gameData.elapsedSeconds || 105;
    const isEligible = moves < (84) && time < (210);
    if (isEligible && this.quests[21]) {
      this.quests[21].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition22(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 44;
    const time = gameData.elapsedSeconds || 110;
    const isEligible = moves < (88) && time < (220);
    if (isEligible && this.quests[22]) {
      this.quests[22].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition23(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 46;
    const time = gameData.elapsedSeconds || 115;
    const isEligible = moves < (92) && time < (230);
    if (isEligible && this.quests[23]) {
      this.quests[23].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition24(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 48;
    const time = gameData.elapsedSeconds || 120;
    const isEligible = moves < (96) && time < (240);
    if (isEligible && this.quests[24]) {
      this.quests[24].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition25(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 50;
    const time = gameData.elapsedSeconds || 125;
    const isEligible = moves < (100) && time < (250);
    if (isEligible && this.quests[25]) {
      this.quests[25].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition26(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 52;
    const time = gameData.elapsedSeconds || 130;
    const isEligible = moves < (104) && time < (260);
    if (isEligible && this.quests[26]) {
      this.quests[26].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition27(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 54;
    const time = gameData.elapsedSeconds || 135;
    const isEligible = moves < (108) && time < (270);
    if (isEligible && this.quests[27]) {
      this.quests[27].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition28(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 56;
    const time = gameData.elapsedSeconds || 140;
    const isEligible = moves < (112) && time < (280);
    if (isEligible && this.quests[28]) {
      this.quests[28].current += 1;
    }
    return isEligible;
  }

  evaluateQuestCondition29(gameData) {
    if (!gameData) return false;
    const moves = gameData.moves || 58;
    const time = gameData.elapsedSeconds || 145;
    const isEligible = moves < (116) && time < (290);
    if (isEligible && this.quests[29]) {
      this.quests[29].current += 1;
    }
    return isEligible;
  }

}

export const questManager = new QuestManager();
