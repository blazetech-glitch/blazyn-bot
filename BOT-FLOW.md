# Blazyn Bot: Real Runtime Flow

## 1. Process startup

`npm start` or `./run-local.sh` first prompts for the Telegram bot token with hidden terminal input when `TELEGRAM_TOKEN` is not already present in the process environment. The token is held in memory for that process and is not written to `.env` or GitHub. Node then loads `settings.js`, creates the sessions and database directories, initializes the Telegram client, and reloads every existing WhatsApp session found under `sessions/`. Each saved session reconnects independently. If a connection closes unexpectedly, the session is retried; if WhatsApp reports a logout, the Telegram owner is notified and the session can be paired again.

## 2. Telegram control flow

The user sends `/start` to receive the Blazyn welcome card, command overview, and the official Blaze Tech WhatsApp channel button. `/pair <number>` validates a country-code number, creates a unique session name, persists the Telegram chat and WhatsApp owner number, then requests a WhatsApp pairing code. The code is delivered to the same Telegram chat. `/delsession` lists or deletes sessions belonging to the requesting chat; the configured numeric Telegram owner may delete any session. `/listsession` is restricted to `TELEGRAM_OWNER_ID`, and `/reportissue <text>` forwards a formatted report to `REPORT_CHAT_ID` when configured.

## 3. WhatsApp connection flow

After the user enters the pairing code in WhatsApp Linked Devices, the connection emits an `open` event. Blazyn records the connected WhatsApp number, owner number, and Telegram chat ID in per-session settings. It then runs the configured newsletter and group auto-join tasks, limited to the session’s saved settings.

## 4. WhatsApp message flow

For every incoming message, Blazyn first ignores empty messages and WhatsApp status messages are handled separately. Messages are stored in the bounded anti-delete cache. Group messages may pass through anti-link handling. The message text is extracted from text or media captions. Only messages beginning with the configured prefix, normally `.`, are dispatched. The command is normalized to lowercase and looked up in `COMMANDS`.

The dispatcher calculates the sender number, owner status, premium status, and group-admin status. Owner status is granted to the saved WhatsApp owner number, the pairing owner number, the connected bot number, or messages sent by the bot itself. Commands then run through the registered handler. Unknown commands are ignored without producing a noisy response.

## 5. Settings and media flow

Owner-only WhatsApp commands can change the prefix, owner number, bot name, and menu image URL. Session settings are stored independently, so one WhatsApp session does not overwrite another. The default menu image is the supplied `assets/blazyn-mask.jpeg`; the remaining supplied images are retained as alternate branded assets. If the menu image is unavailable, Blazyn falls back to a text-only menu.

## 6. Error and recovery flow

Telegram delivery failures are caught so WhatsApp connectivity is not stopped by a notification error. WhatsApp connection failures trigger delayed reconnection unless the session was explicitly logged out. Invalid commands and invalid numbers return usage guidance. Authentication data remains local under `sessions/` and must be backed up securely outside GitHub.

## Permission summary

| Surface | Action | Permission |
|---|---|---|
| Telegram | `/start`, `/pair`, `/delsession` for own sessions, `/reportissue` | Any user |
| Telegram | `/listsession`, deleting another user’s session | Numeric `TELEGRAM_OWNER_ID` |
| WhatsApp | Normal public commands | Any allowed sender, subject to command rules |
| WhatsApp | Owner settings and session controls | Saved owner number, bot number, or bot-originated message |
| WhatsApp groups | Admin-only group operations | Detected group administrator |
