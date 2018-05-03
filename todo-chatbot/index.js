const TelegramBot = require('telegram-node-bot');
const TodoController = require('./controller/TodoController');
const fs = require('fs');

const token = fs.readFileSync('./botToken.txt', 'utf-8');

const tg = new TelegramBot.Telegram(token);

const TextCommand = TelegramBot.TextCommand;
const todoCtrl = new TodoController();


tg.router
    .when(new TextCommand('/list', 'getCommand'), todoCtrl)
    .when(new TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new TextCommand('/done', 'doneCommand'), todoCtrl)
    .otherwise();