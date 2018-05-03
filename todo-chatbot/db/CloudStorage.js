const admin = require('firebase-admin');
const serviceAccount = require('../../fc-chatbot-chris-firebase-adminsdk-oiyur-25da66dffe');
const credential = admin.credential.cert(serviceAccount);
admin.initializeApp({
    credential
});

const db = admin.firestore();

class CloudStorage {
    static getTodos() {
        return db.collection('todos')
            .where('is_done', '==', false)
            .get()
            .then(results => {
                const todos = [];

                if(!results || !results.size) return todos;

                results.forEach(doc => {
                    todos.push(Object.assign({id: doc.id}, doc.data()));
                });
                return todos;
            })
            .catch(err => {
                throw new Error('error occured when get todos');
            });
    }

    static insertTodo(todo) {
        return db.collection('todos')
            .add(todo)
            .then(result => {
                return todo;
            })
            .catch(err => {
                throw new Error('error occured when insert todos');
            });
    }

    static updateTodo(key, todo) {
        return db.collection('todos')
            .doc(key)
            .update(todo)
            .then(result => {
                return 'success to update todo';
            }).catch(err => {
                throw new Error('error occured when update todos');
            })
    }
}

module.exports = CloudStorage;