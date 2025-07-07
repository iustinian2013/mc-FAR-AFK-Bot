const mineflayer = require('mineflayer');
const moment = require('moment-timezone');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'farcomunity.aternos.me',
    port: 25565,
    username: 'AFKBOT',
    version: false
  });

  const password = 'AFKFARBOT';

  bot.on('login', () => {
    console.log('✅ Bot connected. Waiting for login/register...');
  });

  bot.on('message', (message) => {
    const msg = message.toString().toLowerCase();

    if (msg.includes('/register') || msg.includes('please register')) {
      console.log('🟨 Registering...');
      bot.chat(`/register ${password} ${password}`);
    } else if (msg.includes('/login') || msg.includes('please login')) {
      console.log('🟩 Logging in...');
      bot.chat(`/login ${password}`);
    }
  });

  bot.on('end', () => {
    console.log('❌ Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.error('⚠️ Bot error:', err);
  });

  // Quit at midnight Bucharest time
  setInterval(() => {
    const now = moment().tz('Europe/Bucharest');
    if (now.format('HH:mm') === '00:00') {
      console.log('🕛 Midnight in Bucharest — quitting bot.');
      bot.quit();
      process.exit();
    }
  }, 60 * 1000);
}

createBot();
