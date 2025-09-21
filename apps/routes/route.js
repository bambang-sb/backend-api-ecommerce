const r = require('express').Router();
const users = require('../controllers/user-controller');

//users
r.post('/users', users.register);

module.exports = r;