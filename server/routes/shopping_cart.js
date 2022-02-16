const shoppingCartRoute = require('express').Router();
const ShoppingCartControllers = require('../controllers/ShoppingCartController');
const { authentication } = require('../middleware/auth');

shoppingCartRoute.get('/auth',ShoppingCartControllers.showCartByUser);
shoppingCartRoute.get('/:id',ShoppingCartControllers.showCartById);
shoppingCartRoute.post('/add',authentication,ShoppingCartControllers.createCart);
shoppingCartRoute.put('/update/:id',ShoppingCartControllers.updateCart);
shoppingCartRoute.delete('/delete/:id',ShoppingCartControllers.deleteCart);

module.exports = shoppingCartRoute