const readline = require('readline');

function promptForToken() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return new Promise((resolve) => {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question('Enter Telegram bot token: ', (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }

  return new Promise((resolve, reject) => {
    const stdin = process.stdin;
    const stdout = process.stdout;
    let value = '';

    stdout.write('Enter Telegram bot token (input hidden): ');
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
      stdout.write('\n');
    };

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === '\u0003') {
          cleanup();
          reject(new Error('Startup cancelled.'));
          return;
        }
        if (char === '\r' || char === '\n') {
          cleanup();
          resolve(value.trim());
          return;
        }
        if (char === '\u007f' || char === '\b') {
          value = value.slice(0, -1);
        } else {
          value += char;
        }
      }
    };

    stdin.on('data', onData);
  });
}

async function main() {
  if (!process.env.TELEGRAM_TOKEN) {
    process.env.TELEGRAM_TOKEN = await promptForToken();
  }
  if (!process.env.TELEGRAM_TOKEN) {
    throw new Error('A Telegram bot token is required to start Blazyn.');
  }
  require('./index');
}

main().catch((error) => {
  console.error(`[STARTUP ERROR] ${error.message}`);
  process.exitCode = 1;
});
