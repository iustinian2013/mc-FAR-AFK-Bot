const mineflayer = require('mineflayer');
const moment = require('moment-timezone');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'your-server.aternos.me',  // 🔁 CHANGE this to your Aternos IP
    port: 25565,                     // 🔁 Default Minecraft port, change if needed
    username: 'AFK_Bot_01',          // 🔁 Bot name (cracked-compatible)
    version: false                   // Auto-detect version
  });

  bot.on('login', () => {
    console.log('✅ Bot logged in.');

    // Optional: Login command for AuthMe
    // bot.chat('/login yourpassword');
  });

  bot.on('end', () => {
    console.log('❌ Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000); // Reconnect on kick/crash
  });

  bot.on('error', (err) => {
    console.error('⚠️ Bot error:', err);
  });

  // 🕛 Optional: Quit at midnight Bucharest time
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
