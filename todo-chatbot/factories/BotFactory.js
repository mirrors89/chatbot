const TelegramBot = require('telegram-node-bot');
const fs = require('fs');


let tg = null;
class BotFactory {
    static getBot(type) {
        switch (type) {
            case BotType.TELEGRAM:
                return getTelegramBot();
                break;
            default:
                throw new Error('not supported bot.');

        }
    }
}

const getTelegramBot = () => {
    if(!!tg) return tg;

    const token = fs.readFileSync('./botToken.txt', 'utf-8');

    tg = new TelegramBot.Telegram(token);
    return tg;
};

const BotType = {
    TELEGRAM: 'telegram'
};



module.exports = {BotFactory, BotType};