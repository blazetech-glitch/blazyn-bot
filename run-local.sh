#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

if ! git check-ignore -q .env 2>/dev/null && [[ -e .env ]]; then
  echo "Refusing to run until .env is ignored by Git. Add .env to .gitignore or remove it."
  exit 1
fi

npm run check
mkdir -p logs

if pgrep -f '[n]ode start.js|[n]ode index.js' >/dev/null; then
  echo "Blazyn is already running."
  pgrep -af '[n]ode start.js|[n]ode index.js'
  exit 0
fi

read -r -s -p "Enter Telegram bot token (input hidden): " TELEGRAM_TOKEN
printf '\n'
if [[ -z "$TELEGRAM_TOKEN" ]]; then
  echo "A Telegram bot token is required. Nothing was started."
  exit 1
fi

export TELEGRAM_TOKEN
nohup node start.js >> logs/blazyn.log 2>&1 &
PID=$!
unset TELEGRAM_TOKEN

echo "Blazyn started with PID $PID"
echo "Logs: $ROOT_DIR/logs/blazyn.log"
echo "Send /pair 255768418867 to the Telegram bot to request the WhatsApp pairing code."
