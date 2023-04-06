const telegramApi = require("node-telegram-bot-api");

const {gameOptions, againOptions} = require('./options')

const token = "5435678116:AAFVFwYBKGxkaEZ2m_cJDnBevXQN2gvQHiA";

const bot = new telegramApi(token, { polling: true });

const chats = {};


const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Зараз я загадаю цифру від 1 до 9 а ти маєш відгадати її"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Відгадуй", gameOptions);
};

const start = () => {
  bot.on("message", async (msq) => {
    const text = msq.text;
    const chatId = msq.chat.id;

    bot.setMyCommands([
      { command: "/start", description: "Привітання" },
      { command: "/info", description: "Інформація про користувача" },
      { command: "/game", description: "Зіграти в гру" },
    ]);

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/MaincastUkraine/2510201.512.webp"
      );
      return bot.sendMessage(chatId, `Ласкаво просимо в мій телеграм бот`);
    }
    if (text === "/info") {
      let name = msq.from.first_name;
      if (msq.from.last_name) {
        name += ` ${msq.from.last_name}`;
      }
      return bot.sendMessage(chatId, `Твоє імя ${name}`);
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, "Я тебе не зрозумів");
  });

  bot.on("callback_query", async (msq) => {
    const data = msq.data;
    const chatId = msq.message.chat.id;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (parseInt(data) === chats[chatId]) {
      return await bot.sendMessage(
        chatId,
        `Вітаю ти відгадав цифру ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Нажаль ти не вгадав, бот загадав цифру ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
