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
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../dist')));
console.log('Serving static files from:', path.join(__dirname, '../dist'));

// Handle TypeScript files
app.use('/*.tsx', (req, res, next) => {
  res.type('application/javascript');
  next();
});

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://soft-truffle-020837.netlify.app';

  // Отправляем одинаковое сообщение для всех типов чатов
  await bot.sendMessage(chatId, 'Наблюдение за территорией:', {
    reply_markup: {
      inline_keyboard: [[
        { text: 'Открыть приложение', web_app: { url: webAppUrl } }
      ]]
    }
  });
});

// Обработка добавления бота в группу
bot.on('new_chat_members', async (msg) => {
  const newMembers = msg.new_chat_members;
  const botInfo = await bot.getMe();
  const botWasAdded = newMembers.some(member => member.id === botInfo.id);
  
  if (botWasAdded) {
    await bot.sendMessage(msg.chat.id, 'Похуй танки ми з Баштанки!Наблюдение продолжается...');
  }
});

// Обработка других команд
bot.on('message', async (msg) => {
  // Пропускаем команду /start, так как она обрабатывается отдельно
  if (msg.text === '/start') return;
  
  const chatId = msg.chat.id;
  
  // Здесь можно добавить обработку других команд
  if (msg.text && msg.text.startsWith('/')) {
    // Пример обработки других команд
    switch(msg.text) {
      case '/help':
        await bot.sendMessage(chatId, 'Доступные команды:\n/start - Начать наблюдение\n/help - Помощь');
        break;
      // Добавьте другие команды здесь
    }
  }
});

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});