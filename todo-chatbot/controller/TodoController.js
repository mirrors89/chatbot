const TelegramBot = require('telegram-node-bot');
const CommandStr = require('../utils/CommandStr');
const CloudStorage = require('../db/CloudStorage');


class TodoController extends TelegramBot.TelegramBaseController {

    getHandler ($) {
        CloudStorage.getTodos()
            .then(todos => {
            $.sendMessage(this.paserTodos(todos), {parse_mode: 'Markdown'});
        });
    }

    addHandler ($) {
        const todo = CommandStr.getCommandArgs($.message.text);
        if(!todo) return $.sendMessage('todo를 입력해 주세요.');

        const addTodo = {
            desc: todo || '',
            due_date: new Date(),
            is_done: false
        };

        CloudStorage.insertTodo(addTodo)
            .then(result => {
               $.sendMessage(`${result.desc}가 할 일에 추가 됐습니다.`);
            });
    }

    doneHandler ($) {
        let id = CommandStr.getCommandArgs($.message.text);
        if (!id) return $.sendMessage('없는 번호 입니다.');

        CloudStorage.updateTodo(id, {is_done: true})
            .then(_ => {
                $.sendMessage(`완료했습니다.`);
            });

    }

    paserTodos (todos) {
        if(!todos.length) return '할일이 없습니다.';

        let result = `* 할일 목록 * \n\n`;
        todos.forEach((todo, i) => {
            result += `*${todo.id}* - ${todo.desc}\n`
        });
        return result;
    }

    get routes() {
        return {
            getCommand: 'getHandler',
            addCommand: 'addHandler',
            doneCommand: 'doneHandler'
        }
    }
}

module.exports = TodoController;