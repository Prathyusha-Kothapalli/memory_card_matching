/**
 * Memory Match Arena - Formatting Utilities
 */

/**
 * Format time in seconds to MM:SS display format
 * @param {number} totalSeconds 
 * @returns {string} Formatted string "MM:SS"
 */
export function formatTime(totalSeconds) {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00';
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  const padMins = String(mins).padStart(2, '0');
  const padSecs = String(secs).padStart(2, '0');
  return `${padMins}:${padSecs}`;
}

/**
 * Format numbers with comma thousand separators
 * @param {number} num 
 * @returns {string} E.g. 10,500
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return Number(num).toLocaleString('en-US');
}

/**
 * Format ratio to percentage string with 1 decimal place
 * @param {number} value 
 * @param {number} total 
 * @returns {string} E.g. "85.5%"
 */
export function formatPercentage(value, total) {
  if (!total || total <= 0) return '0%';
  const pct = (value / total) * 100;
  return `${pct.toFixed(1)}%`;
}

/**
 * Capitalize first letter of a string
 * @param {string} str 
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
