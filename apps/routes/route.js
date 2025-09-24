const r = require('express').Router();
const users = require('../controllers/user-controller');
const categories = require('../controllers/categori-controller');
const authMiddleware = require('../middleware/auth-middleware');

//users
r.post('/users', users.register);
r.post('/users/login', users.login);

//middleware
r.use(authMiddleware)
r.delete('/users', users.logout);

//categories
r.get('/categories',categories.read)
r.get('/categories/:id',categories.readId)
r.post('/categories',categories.create)
r.put('/categories/:id',categories.update)

r.get('/test', (req, res) => {
  res.json('API is running....');
});
module.exports = r;