/**
 * Blazyn bot configuration.
 * Secrets belong in .env; this file contains safe defaults only.
 */

const path = require('path');

function intFromEnv(name, fallback = 0) {
  const value = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(value) ? value : fallback;
}

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '',
  OWNER_ID: intFromEnv('TELEGRAM_OWNER_ID', 0),
  OWNER_NAME: process.env.OWNER_NAME || 'ARNOLDT20',
  OWNER_NUMBER: process.env.OWNER_NUMBER || '255627417402',
  OWNER_HANDLE: process.env.OWNER_HANDLE || '@StarboyT20',
  BOT_NAME: process.env.BOT_NAME || 'Blazyn',
  DEFAULT_PREFIX: process.env.DEFAULT_PREFIX || '.',
  SESSIONS_DIR: process.env.SESSIONS_DIR || './sessions',
  PREMIUM_DB: process.env.PREMIUM_DB || './database/premium.json',
  MENU_IMAGE: process.env.MENU_IMAGE || path.join(__dirname, 'assets', 'blazyn-mask.jpeg'),
  REPORT_CHAT: intFromEnv('REPORT_CHAT_ID', 0),
  CHANNEL_LINK: 'https://whatsapp.com/channel/0029VbAjawl9MF8vQQa0ZT32',
  GROUP_LINK: process.env.GROUP_LINK || 'https://whatsapp.com/channel/0029VbAjawl9MF8vQQa0ZT32',
  BRAND_NAME: 'Blaze Tech',
};
