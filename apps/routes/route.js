const r = require('express').Router();
const users = require('../controllers/user-controller');
const categories = require('../controllers/categori-controller');
const products = require('../controllers/product-controller');
const brands = require('../controllers/brand-controller');
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

//products
r.get('/products',products.read)
r.get('/products/:id',products.readId)
r.post('/products',products.create)
r.put('/products/:id',products.update)

//brands
r.get('/brands',brands.read)
r.get('/brands/:id',brands.readId)
r.post('/brands',brands.create)
r.put('/brands/:id',brands.update)

r.get('/test', (req, res) => {
  res.json('API is running....');
});
module.exports = r;