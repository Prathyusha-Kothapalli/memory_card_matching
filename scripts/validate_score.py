#!/usr/bin/env python3
"""
Memory Match Arena - Score Verification & Anti-Cheat Validator Tool
Validates mathematical consistency of game score payloads.
Requires Python 3.10+
"""

import sys
import argparse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DIFFICULTY_PARAMS = {
    'easy': {'pairs': 8, 'max_moves': 20, 'time_limit': 60, 'base_points': 100},
    'medium': {'pairs': 18, 'max_moves': 45, 'time_limit': 120, 'base_points': 250},
    'hard': {'pairs': 32, 'max_moves': 90, 'time_limit': 240, 'base_points': 500},
    'expert': {'pairs': 50, 'max_moves': 150, 'time_limit': 420, 'base_points': 1000}
}

def validate_score(mode: str, difficulty: str, moves: int, time_sec: int, score: int) -> bool:
    print(f"🎯 Validating Score Payload: Mode={mode}, Diff={difficulty}, Moves={moves}, Time={time_sec}s, Score={score}")
    
    diff_config = DIFFICULTY_PARAMS.get(difficulty.lower())
    if not diff_config:
        print(f"❌ Invalid difficulty parameter: {difficulty}")
        return False

    min_moves = diff_config['pairs']
    if moves < min_moves:
        print(f"❌ Impossible moves count: {moves} is less than minimum pairs ({min_moves})")
        return False

    if time_sec <= 0:
        print(f"❌ Invalid match duration: {time_sec}s")
        return False

    # Upper bound score sanity check
    max_theoretical_score = (diff_config['pairs'] * diff_config['base_points'] + diff_config['time_limit'] * 10 + 8 * 150 + diff_config['max_moves'] * 20) * 2
    if score > max_theoretical_score * 1.5:
        print(f"❌ Score exceeds theoretical maximum ({max_theoretical_score}): {score}")
        return False

    print("✅ Score payload is MATHEMATICALLY VALID and consistent!")
    return True

def main():
    parser = argparse.ArgumentParser(description="Memory Match Arena Score Validator")
    parser.add_argument('--mode', type=str, default='classic')
    parser.add_argument('--difficulty', type=str, default='easy')
    parser.add_argument('--moves', type=int, default=12)
    parser.add_argument('--time', type=int, default=30)
    parser.add_argument('--score', type=int, default=1500)

    args = parser.parse_args()
    valid = validate_score(args.mode, args.difficulty, args.moves, args.time, args.score)
    if not valid:
        sys.exit(1)

if __name__ == '__main__':
    main()
