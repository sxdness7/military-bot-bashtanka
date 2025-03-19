
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const token = '8035186242:AAEnO3k6G9T_0UCaMkVUD2XWzRtYKIGl5H0';
const bot = new TelegramBot(token, { polling: true });
const port = 3000;

app.use(express.static('dist'));

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  
  bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение:', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть приложение', web_app: { url: webAppUrl } }
      ]]
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
