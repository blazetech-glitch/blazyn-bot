#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "Missing .env. Copy .env.example to .env and add a replacement TELEGRAM_TOKEN locally."
  exit 1
fi

if ! grep -q '^TELEGRAM_TOKEN=[^[:space:]]' .env; then
  echo "TELEGRAM_TOKEN is empty in .env. Add the replacement token locally; do not commit or send it."
  exit 1
fi

if ! git check-ignore -q .env; then
  echo "Refusing to run until .env is ignored by Git. Add .env to .gitignore."
  exit 1
fi

npm run check
mkdir -p logs
set -a
. ./.env
set +a

if pgrep -f '[n]ode index.js' >/dev/null; then
  echo "Blazyn is already running."
  pgrep -af '[n]ode index.js'
  exit 0
fi

nohup node index.js >> logs/blazyn.log 2>&1 &
echo "Blazyn started with PID $!"
echo "Logs: $ROOT_DIR/logs/blazyn.log"
echo "Send /pair 255768418867 to the Telegram bot to request the WhatsApp pairing code."
