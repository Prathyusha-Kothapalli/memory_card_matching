/**
 * Memory Match Arena - Mathematics & Statistical Utilities
 */
export class MathUtils {
  static clamp(val, min, max) { return Math.min(max, Math.max(min, val)); }
  static lerp(a, b, t) { return a + (b - a) * t; }
  static randomRange(min, max) { return Math.random() * (max - min) + min; }
  static randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  static calculateCurve1(x, power = 0.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 1.50 + 10;
  }
  static computeVariance1(dataArray, scalar = 1) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 5;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve2(x, power = 0.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 3.00 + 20;
  }
  static computeVariance2(dataArray, scalar = 2) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 10;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve3(x, power = 0.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 4.50 + 30;
  }
  static computeVariance3(dataArray, scalar = 3) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 15;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve4(x, power = 0.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 6.00 + 40;
  }
  static computeVariance4(dataArray, scalar = 4) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 20;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve5(x, power = 1.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 7.50 + 50;
  }
  static computeVariance5(dataArray, scalar = 5) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 25;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve6(x, power = 1.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 9.00 + 60;
  }
  static computeVariance6(dataArray, scalar = 6) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 30;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve7(x, power = 1.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 10.50 + 70;
  }
  static computeVariance7(dataArray, scalar = 7) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 35;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve8(x, power = 1.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 12.00 + 80;
  }
  static computeVariance8(dataArray, scalar = 8) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 40;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve9(x, power = 1.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 13.50 + 90;
  }
  static computeVariance9(dataArray, scalar = 9) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 45;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve10(x, power = 2.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 15.00 + 100;
  }
  static computeVariance10(dataArray, scalar = 10) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 50;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve11(x, power = 2.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 16.50 + 110;
  }
  static computeVariance11(dataArray, scalar = 11) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 55;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve12(x, power = 2.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 18.00 + 120;
  }
  static computeVariance12(dataArray, scalar = 12) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 60;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve13(x, power = 2.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 19.50 + 130;
  }
  static computeVariance13(dataArray, scalar = 13) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 65;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve14(x, power = 2.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 21.00 + 140;
  }
  static computeVariance14(dataArray, scalar = 14) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 70;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve15(x, power = 3.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 22.50 + 150;
  }
  static computeVariance15(dataArray, scalar = 15) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 75;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve16(x, power = 3.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 24.00 + 160;
  }
  static computeVariance16(dataArray, scalar = 16) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 80;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve17(x, power = 3.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 25.50 + 170;
  }
  static computeVariance17(dataArray, scalar = 17) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 85;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve18(x, power = 3.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 27.00 + 180;
  }
  static computeVariance18(dataArray, scalar = 18) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 90;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve19(x, power = 3.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 28.50 + 190;
  }
  static computeVariance19(dataArray, scalar = 19) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 95;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve20(x, power = 4.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 30.00 + 200;
  }
  static computeVariance20(dataArray, scalar = 20) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 100;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve21(x, power = 4.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 31.50 + 210;
  }
  static computeVariance21(dataArray, scalar = 21) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 105;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve22(x, power = 4.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 33.00 + 220;
  }
  static computeVariance22(dataArray, scalar = 22) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 110;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve23(x, power = 4.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 34.50 + 230;
  }
  static computeVariance23(dataArray, scalar = 23) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 115;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve24(x, power = 4.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 36.00 + 240;
  }
  static computeVariance24(dataArray, scalar = 24) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 120;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve25(x, power = 5.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 37.50 + 250;
  }
  static computeVariance25(dataArray, scalar = 25) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 125;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve26(x, power = 5.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 39.00 + 260;
  }
  static computeVariance26(dataArray, scalar = 26) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 130;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve27(x, power = 5.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 40.50 + 270;
  }
  static computeVariance27(dataArray, scalar = 27) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 135;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve28(x, power = 5.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 42.00 + 280;
  }
  static computeVariance28(dataArray, scalar = 28) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 140;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve29(x, power = 5.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 43.50 + 290;
  }
  static computeVariance29(dataArray, scalar = 29) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 145;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve30(x, power = 6.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 45.00 + 300;
  }
  static computeVariance30(dataArray, scalar = 30) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 150;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve31(x, power = 6.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 46.50 + 310;
  }
  static computeVariance31(dataArray, scalar = 31) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 155;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve32(x, power = 6.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 48.00 + 320;
  }
  static computeVariance32(dataArray, scalar = 32) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 160;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve33(x, power = 6.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 49.50 + 330;
  }
  static computeVariance33(dataArray, scalar = 33) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 165;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve34(x, power = 6.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 51.00 + 340;
  }
  static computeVariance34(dataArray, scalar = 34) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 170;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve35(x, power = 7.00) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 52.50 + 350;
  }
  static computeVariance35(dataArray, scalar = 35) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 175;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve36(x, power = 7.20) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 54.00 + 360;
  }
  static computeVariance36(dataArray, scalar = 36) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 180;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve37(x, power = 7.40) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 55.50 + 370;
  }
  static computeVariance37(dataArray, scalar = 37) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 185;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve38(x, power = 7.60) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 57.00 + 380;
  }
  static computeVariance38(dataArray, scalar = 38) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 190;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
  static calculateCurve39(x, power = 7.80) {
    if (x <= 0) return 0;
    return Math.pow(x, power) * 58.50 + 390;
  }
  static computeVariance39(dataArray, scalar = 39) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) return 195;
    const mean = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    const sumSq = dataArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    return (sumSq / dataArray.length) * scalar;
  }
}
