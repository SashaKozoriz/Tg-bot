const telegramApi = require("node-telegram-bot-api");

const { gameOptions, againOptions } = require("./options");

const token = "5435678116:AAFVFwYBKGxkaEZ2m_cJDnBevXQN2gvQHiA";

const bot = new telegramApi(token, { polling: true });

const chats = {};

const qoutes = require('./qoutes');

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Зараз я загадаю цифру від 1 до 9 а ти маєш відгадати її"
  );
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Відгадуй", gameOptions);
};


const keyboard = {
  resize_keyboard: true,
  keyboard: [[{ text: "Надіслати локацію", request_location: true }]],
};

bot.onText(/\/location/, (msg) => {
  bot.sendMessage(msg.chat.id, "Поділись локацією зі мною", {
    reply_markup: keyboard,
  });
});

const start = () => {
  bot.on("message", async (msq) => {
    const text = msq.text;
    const chatId = msq.chat.id;
    console.log(msq);
    bot.setMyCommands([
      { command: "/start", description: "Привітання" },
      { command: "/info", description: "Інформація про користувача" },
      { command: "/game", description: "Зіграти в гру" },
      { command: "/qoutes", description: "Випадкові цитати" },
      { command: "/location", description: "Надіслати локацію" },
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

    if (text === "/qoutes") {
      return bot.sendMessage(
        chatId,
        qoutes[Math.floor(Math.random() * qoutes.length)]
      );
    }

    if (text === "/location") {
      return bot.sendMessage(chatId,"")
    }

    if (msq.location) {
      const lat = msq.location.latitude;
      const lon = msq.location.longitude;
      bot.sendMessage(chatId, `Твоє місцезнаходження ${lat}, ${lon}`);
      return start
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
