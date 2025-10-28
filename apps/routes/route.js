const r = require('express').Router();
const users = require('../controllers/user-controller');
const categories = require('../controllers/categori-controller');
const products = require('../controllers/product-controller');
const productImage = require('../controllers/product-image-controller');
const {upload} = require('../helpers/uploadfile');
const brands = require('../controllers/brand-controller');
const address = require('../controllers/address-controller');
const inventory = require('../controllers/inventory-controller');
const cart = require('../controllers/cart-controller');
const order = require('../controllers/order-controller');
const authMiddleware = require('../middleware/auth-middleware');

//users
r.post('/users', users.register);
r.post('/users/login', users.login);

//global
r.get('/categories',categories.read)
r.get('/products',products.read)
r.get('/products/:id',products.readId)
r.get('/brands',brands.read)

//middleware
r.use(authMiddleware)
r.delete('/users', users.logout);

//address
r.get('/users/address/:id',address.read);
r.post('/users/address/:id',address.create);
r.put('/users/address/:id',address.update);

//categories

r.get('/categories/:id',categories.readId)
r.post('/categories',categories.create)
r.put('/categories/:id',categories.update)

//products


r.post('/products',products.create)
r.put('/products/:id',products.update)

//product image
r.get('/product-image',productImage.read)
r.get('/product-image/:id',productImage.readId)
r.post('/product-image',upload.array('image',3),productImage.create)
r.put('/product-image/:id',upload.single('image'),productImage.update)
r.put('/product-image/active/:id',productImage.activeImage)
r.delete('/product-image/:id',productImage.imageDelete)

//brands

r.get('/brands/:id',brands.readId)
r.post('/brands',brands.create)
r.put('/brands/:id',brands.update)

//stock
r.get('/inventorys',inventory.read)
r.get('/inventorys/:id',inventory.readId)
r.put('/inventorys/:id',inventory.updatePlus)

//cart
r.get('/carts',cart.readId)
r.post('/carts',cart.create)
r.put('/cart/:id',cart.updateCartItem)

//order
r.post('/order',order.create)

r.get('/test', (req, res) => {
  res.json('API is running....');
});
module.exports = r;