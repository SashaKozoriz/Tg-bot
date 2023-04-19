# Telegram Bot Readme

This is a Telegram Bot designed using the `node-telegram-bot-api` library in Node.js.

## Installation
```bash
$ npm install node-telegram-bot-api
```

## Usage
1. Set the Telegram Bot API token in the following line:
```javascript
const token = "<API-TOKEN>";
```
2. Run the bot using the following command:
```bash
$ npm start
```
Bot commands:
- `/start`: Greets the user.
- `/info`: Displays the user's name.
- `/game`: Plays a number guessing game.
- `/location` : Show user location.
- `/qoutes` : Generate random qoutes.
## Overview
This bot utilizes the following functions:
- `bot.sendMessage(chatId, message, options)`: Sends a text message to a user.
- `bot.sendSticker(chatId, sticker)`: Sends a sticker to a user.
- `bot.setMyCommands(commands)`: Sets the commands available to the user.
- `bot.on("message", async (msg))`: Listens to message events.
- `bot.on("callback_query", async (query))`: Listens to query events.
- `startGame(chatId)`: Starts a number guessing game.

## Contributors
- Sasha Kozoriz(https://github.com/SashaKozoriz)
