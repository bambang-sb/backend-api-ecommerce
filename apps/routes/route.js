const r = require('express').Router();
const users = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');

//users
r.post('/users', users.register);
r.post('/users/login', users.login);

r.use(authMiddleware)
r.delete('/users', users.logout);

r.get('/test', (req, res) => {
  res.json('API is running....');
});
module.exports = r;