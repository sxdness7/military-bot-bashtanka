
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const token = '8035186242:AAEnO3k6G9T_0UCaMkVUD2XWzRtYKIGl5H0';
const bot = new TelegramBot(token, { polling: true });
const port = 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../dist')));

// Handle TypeScript files
app.use('/*.tsx', (req, res, next) => {
  res.type('application/javascript');
  next();
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  
  const welcomeMessage = msg.chat.type === 'private' 
    ? 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение:'
    : 'Привет всем в чате! Я бот для доступа к веб-приложению. Используйте кнопку ниже:';

  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть приложение', web_app: { url: webAppUrl } }
      ]]
    }
  });
});

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
