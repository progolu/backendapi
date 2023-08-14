module.exports = (app) => {
    const express = require('express')
    const router = express.Router()
    const users = require('../controllers/user.controller.js');

    router.route('/').get(users.findAll).post(users.create)
   // router.route('/:id').delete(deleteGoal).put(updateGoal)

    // app.post('/users', users.create);
    // app.get('/users', users.findAll);
    // app.get('/users/:id', users.findOne);
    // app.put('/users/:id', users.update);
    // app.delete('/users/:id', users.delete);
}