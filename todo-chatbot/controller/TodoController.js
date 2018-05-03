const TelegramBot = require('telegram-node-bot');

class TodoController extends TelegramBot.TelegramBaseController {

    getHandler ($) {
        $.getUserSession('todos').then(todos => {
            $.sendMessage(this.paserTodos(todos), {parse_mode: 'Markdown'});
        });
    }

    addHandler ($) {
        const todo = $.message.text.split(' ').splice(1).join(' ');
        if(!todo) return $.sendMessage('todo를 입력해 주세요.');

        $.getUserSession('todos')
            .then(todos=> {
               if(!Array.isArray(todos)) $.setUserSession('todos', [todo]);
               else $.setUserSession('todos', todos.concat([todo]));

               $.sendMessage(`${todo}가 할 일에 추가 됐습니다.`);
            });
    }

    doneHandler ($) {
        const index = parseInt($.message.text.split(' ').splice(1)[0]);
        if(isNaN(index)) return $.sendMessage('번호를 입력해 주세요.');

        $.getUserSession('todos')
            .then(todos => {
                const todo = todos[index];

                if(!todo) return $.sendMessage('없는 번호 입니다.');
                todos.splice(index, 1);

                $.setUserSession('todos', todos);
                $.sendMessage(`${todo}를 완료했습니다.`);
            })
    }

    paserTodos (todos) {
        let result = `* 할일 목록 * \n\n`;
        todos.forEach((todo, i) => {
            result += `*${i + 1}* - ${todo}\n`
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