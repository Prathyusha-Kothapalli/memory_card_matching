# Memory Match Arena - Automation Makefile

.PHONY: all setup test verify serve docker-build docker-run clean

all: setup test verify

setup:
	@echo "Installing project dependencies..."
	npm install

test:
	@echo "Running Node.js unit test suite..."
	node test/runner.js

verify:
	@echo "Running Python 3.10+ verification tools..."
	python3 scripts/verify_project.py
	python3 scripts/validate_score.py

serve:
	@echo "Launching local HTTP development server..."
	npx -y http-server . -p 8080 -c-1

docker-build:
	@echo "Building Docker production container image..."
	docker build -t memory-match-arena:latest .

docker-run:
	@echo "Running Memory Match Arena container via Docker Compose..."
	docker-compose up --build -d

clean:
	@echo "Cleaning temporary build files..."
	rm -rf node_modules package-lock.json
