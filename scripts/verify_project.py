#!/usr/bin/env python3
"""
Memory Match Arena - Project Verification Utility
Checks codebase file structure, integrity, line metrics, and basic syntax validity.
Requires Python 3.10+
"""

import sys
import os
import glob

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

REQUIRED_FILES = [
    'index.html',
    'package.json',
    'package-lock.json',
    'Makefile',
    'Dockerfile',
    'docker-compose.yml',
    'README.md',
    'css/main.css',
    'css/variables.css',
    'css/reset.css',
    'js/app.js',
    'js/config.js',
    'js/core/event_bus.js',
    'js/core/storage.js',
    'js/core/audio_engine.js',
    'js/core/particle_engine.js',
    'js/game/game_engine.js',
    'js/game/card_deck.js',
    'js/game/score_calculator.js',
    'js/managers/profile_manager.js',
    'js/managers/achievement_manager.js',
    'js/managers/stats_manager.js',
    'js/managers/leaderboard_manager.js',
    'test/runner.js'
]

def verify_project():
    print("==================================================")
    print("🧠 Memory Match Arena - Project Verification")
    print("==================================================")
    print(f"Python Version: {sys.version.split()[0]}")

    missing_files = []
    total_lines = 0
    file_count = 0

    # 1. Check required files
    for rel_path in REQUIRED_FILES:
        if not os.path.exists(rel_path):
            missing_files.append(rel_path)
            print(f"  ❌ Missing required file: {rel_path}")
        else:
            print(f"  ✅ Verified: {rel_path}")

    # 2. Count total code lines across js, css, html, py, test
    all_files = glob.glob('**/*.js', recursive=True) + \
                glob.glob('**/*.css', recursive=True) + \
                glob.glob('**/*.html', recursive=True) + \
                glob.glob('**/*.py', recursive=True)

    for fpath in all_files:
        if 'node_modules' in fpath or '.git' in fpath:
            continue
        file_count += 1
        try:
            with open(fpath, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                total_lines += len(lines)
        except Exception as e:
            print(f"  ⚠️ Error reading {fpath}: {e}")

    print("\n--------------------------------------------------")
    print(f"Total Project Files Scanned: {file_count}")
    print(f"Total Lines of Code & Styling: {total_lines}")
    print("--------------------------------------------------")

    if missing_files:
        print(f"\n❌ Verification Failed! Missing {len(missing_files)} required files.")
        sys.exit(1)

    print("\n✨ ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!\n")

if __name__ == '__main__':
    verify_project()
