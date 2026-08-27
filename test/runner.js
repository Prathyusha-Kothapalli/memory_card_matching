/**
 * Memory Match Arena - Test Runner Engine (Node.js Compatible)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Minimal Assert Library
globalThis.assert = {
  strictEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Assertion Error: Expected ${expected}, got ${actual}`);
    }
  },
  isTrue(value, message) {
    if (value !== true) {
      throw new Error(message || `Assertion Error: Expected true, got ${value}`);
    }
  },
  isFalse(value, message) {
    if (value !== false) {
      throw new Error(message || `Assertion Error: Expected false, got ${value}`);
    }
  },
  isNotNull(value, message) {
    if (value === null || value === undefined) {
      throw new Error(message || `Assertion Error: Expected non-null value, got ${value}`);
    }
  }
};

let passCount = 0;
let failCount = 0;

globalThis.describe = (suiteName, fn) => {
  console.log(`\n📦 SUITE: ${suiteName}`);
  fn();
};

globalThis.it = async (testName, fn) => {
  try {
    await fn();
    console.log(`  ✅ PASS: ${testName}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
};

async function runAllTests() {
  console.log('🚀 Memory Match Arena - Test Runner Starting...\n');
  const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js'));

  for (const file of files) {
    const filePath = path.join(__dirname, file);
    await import(`file://${filePath}`);
  }

  console.log('\n========================================');
  console.log(`SUMMARY: ${passCount + failCount} Tests Executed`);
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('========================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runAllTests();
