#!/usr/bin/env python3
"""
Memory Match Arena - Player Stats Analysis Utility
Parses JSON player save exports and outputs analytical summaries.
Requires Python 3.10+
"""

import sys
import json
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def analyze_save(file_path: str):
    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        sys.exit(1)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        profile = data.get('profile', {})
        stats = data.get('stats', {})
        achievements = data.get('achievements', {})

        print("==================================================")
        print("📊 MEMORY MATCH ARENA - PLAYER STATS REPORT")
        print("==================================================")
        print(f"Player Name:     {profile.get('username', 'N/A')}")
        print(f"Avatar:          {profile.get('avatar', '🐱')}")
        print(f"Level:           Level {profile.get('level', 1)}")
        print(f"Login Streak:    {profile.get('loginStreak', 1)} Days")
        print("--------------------------------------------------")
        print(f"Games Played:    {stats.get('gamesPlayed', 0)}")
        print(f"Wins:            {stats.get('wins', 0)}")
        print(f"Losses:          {stats.get('losses', 0)}")
        print(f"Win Rate:        {stats.get('winRate', 0)}%")
        print(f"Highest Score:   {stats.get('highestScore', 0)}")
        print(f"Highest Combo:   {stats.get('highestCombo', 1)}x")
        print("--------------------------------------------------")
        unlocked_ach = sum(1 for a in achievements.values() if a.get('unlocked'))
        print(f"Achievements:    {unlocked_ach} / 20 Unlocked")
        print("==================================================\n")

    except Exception as e:
        print(f"❌ Error analyzing save file: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/analyze_stats.py <save_file.json>")
        # If sample default data requested
        sample_path = 'sample_save.json'
        sample_data = {
            "profile": {"username": "DemoPlayer", "avatar": "🦊", "level": 8, "loginStreak": 5},
            "stats": {"gamesPlayed": 20, "wins": 18, "losses": 2, "winRate": 90, "highestScore": 8500, "highestCombo": 6},
            "achievements": {"first_win": {"unlocked": True}, "speed_master": {"unlocked": True}}
        }
        with open(sample_path, 'w', encoding='utf-8') as f:
            json.dump(sample_data, f, indent=2)
        analyze_save(sample_path)
        if os.path.exists(sample_path):
            os.remove(sample_path)
    else:
        analyze_save(sys.argv[1])

if __name__ == '__main__':
    main()
