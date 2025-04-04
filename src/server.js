
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

app.use(express.static(path.join(__dirname, '../dist')));
console.log('Serving static files from:', path.join(__dirname, '../dist'));

app.use('/*.tsx', (req, res, next) => {
  res.type('application/javascript');
  next();
});

// Handle /start command
bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'Наблюдение за территорией:', {
      reply_markup: {
        inline_keyboard: [[
          {
            text: 'Открыть приложение',
            web_app: { url: 'https://soft-truffle-020837.netlify.app' }
          }
        ]]
      }
    });
  } catch (error) {
    console.error('Error in /start command:', error);
  }
});

// Handle bot being added to group
bot.on('new_chat_members', async (msg) => {
  try {
    const botInfo = await bot.getMe();
    const newMembers = msg.new_chat_members;
    const botWasAdded = newMembers.some(member => member.id === botInfo.id);
    
    if (botWasAdded) {
      await bot.sendMessage(msg.chat.id, 'Похуй танки ми з Баштанки!Наблюдение продолжается...', {
        reply_markup: {
          inline_keyboard: [[
            {
              text: 'Открыть приложение',
              web_app: { url: 'https://soft-truffle-020837.netlify.app' }
            }
          ]]
        }
      });
    }
  } catch (error) {
    console.error('Error handling new chat members:', error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
