/**
 * Memory Match Arena - Validation Utilities
 */

/**
 * Validate username parameter
 * @param {string} username 
 * @returns {{ valid: boolean, message: string }}
 */
export function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    return { valid: false, message: 'Username cannot be empty.' };
  }
  const trimmed = username.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Username must be at least 2 characters.' };
  }
  if (trimmed.length > 20) {
    return { valid: false, message: 'Username cannot exceed 20 characters.' };
  }
  if (!/^[a-zA-Z0-9_\- ]+$/.test(trimmed)) {
    return { valid: false, message: 'Username can only contain letters, numbers, spaces, underscores, and hyphens.' };
  }
  return { valid: true, message: 'Valid username.' };
}
