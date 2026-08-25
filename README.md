# Blazyn Bot

**Blazyn** is a Telegram-controlled WhatsApp multi-session bot built with Node.js, Telegraf, and Baileys. The project is branded for **Blaze Tech** and uses the owner identity **ARNOLDT20**.

> Official channel: [꧁༺ 𝐁𝐋𝐀𝐙𝐄 𝐓𝐄𝐂𝐇 ༻꧂ on WhatsApp](https://whatsapp.com/channel/0029VbAjawl9MF8vQQa0ZT32)

## Features

Blazyn provides Telegram commands for pairing WhatsApp numbers, restoring sessions, deleting sessions, listing sessions for the configured Telegram owner, and reporting issues. On WhatsApp, it dispatches prefixed commands, supports owner and group-admin permissions, maintains per-session settings, provides menu and utility commands, and includes optional anti-delete, anti-link, premium, media, and group-management functionality already present in the codebase.

## Requirements

Use Node.js 18 or newer and npm. A Telegram bot token is required. WhatsApp pairing requires a phone that can link a companion device. The bot stores authentication state locally under `sessions/`, so that directory must be backed up securely and must never be committed.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `TELEGRAM_TOKEN`. Set `TELEGRAM_OWNER_ID` to the numeric Telegram ID of the owner if owner-only Telegram commands are required. The public owner handle is configured as `@StarboyT20`; Telegram usernames are for display and discovery, while numeric IDs are used for authorization.

Start the bot with:

```bash
npm start
```

Run the syntax check before publishing changes:

```bash
npm run check
```

## First-use flow

1. Open the Telegram bot and send `/start`.
2. Select the official Blaze Tech channel button or send `/pair 255627417402` with the WhatsApp number to be linked.
3. Blazyn creates a unique session, requests a WhatsApp pairing code, and returns it in Telegram.
4. On WhatsApp, open **Linked devices**, choose **Link a device**, and enter the code.
5. After connection, Blazyn persists the session owner and Telegram chat ID, then restores the session automatically on the next process start.
6. Send `.menu` from WhatsApp to view the active commands. Owner-only settings include `.setprefix`, `.setowner`, `.setbotname`, `.setmenuimg`, and session controls.

## Configuration

| Variable | Purpose | Default |
|---|---|---|
| `TELEGRAM_TOKEN` | Telegram Bot API secret | Empty; required |
| `TELEGRAM_OWNER_ID` | Numeric Telegram ID allowed to list all sessions | `0` |
| `REPORT_CHAT_ID` | Telegram chat receiving issue reports | `0` |
| `OWNER_NAME` | Display owner name | `ARNOLDT20` |
| `OWNER_NUMBER` | Default WhatsApp owner number | `255627417402` |
| `OWNER_HANDLE` | Public owner Telegram handle | `@StarboyT20` |
| `BOT_NAME` | Bot display name | `Blazyn` |
| `MENU_IMAGE` | Menu image path or URL | `assets/blazyn-mask.jpeg` |

## Asset organization

The supplied images are stored in `assets/` with descriptive names: `blazyn-mask.jpeg`, `blazyn-portrait.jpeg`, `blazyn-joker.jpeg`, and `blazyn-ninja.jpeg`. The default menu uses `blazyn-mask.jpeg`; the other images are retained as branded alternatives for future menu or status features.

## Security and release notes

Do not commit `.env`, `sessions/`, Telegram tokens, WhatsApp credentials, or user settings. The repository uses environment variables for secrets and safe defaults for public branding. Before creating a GitHub release, run `npm run check`, review `git diff`, and confirm that no secret or authentication directory is tracked.
