const TelegramBot = require('telegram-node-bot');
const TodoController = require('./controller/TodoController');

const tg = new TelegramBot.Telegram('576418687:AAF8sFe3oxDhOwsg965usBE5ToBBINOMWv4');

const TextCommand = TelegramBot.TextCommand;
const todoCtrl = new TodoController();


tg.router
    .when(new TextCommand('/list', 'getCommand'), todoCtrl)
    .when(new TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new TextCommand('/done', 'doneCommand'), todoCtrl)
    .otherwise();