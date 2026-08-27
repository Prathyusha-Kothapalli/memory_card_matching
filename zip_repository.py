#!/usr/bin/env python3
"""
Repository Packaging Tool for TrainPlex Compliance
Creates a ZIP archive explicitly preserving the .git directory, commits, PR merges, and source code,
while excluding node_modules and temporary build logs.
"""

import os
import sys
import zipfile

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def package_repository(output_zip="memory_match_arena_repo.zip"):
    print(f"📦 Packaging repository into {output_zip} (including .git folder)...")
    
    root_dir = os.path.abspath(".")
    count = 0

    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Exclude node_modules and scratch temporary files from zip
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            if '.system_generated' in dirs:
                dirs.remove('.system_generated')

            for file in files:
                if file == output_zip or file.endswith('.log') or file.endswith('.tmp'):
                    continue

                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, root_dir)

                zipf.write(abs_path, rel_path)
                count += 1

    print(f"✅ Successfully created {output_zip} with {count} files (including .git history)!")
    print(f"📂 Archive Location: {os.path.abspath(output_zip)}")

if __name__ == '__main__':
    package_repository()
