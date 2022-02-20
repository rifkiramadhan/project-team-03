const ShoppingCartsRouter = require('express').Router();
const ShoppingCartController = require('../controllers/ShoppingCartController');
const { authentication } = require('../middlewares/auth');

ShoppingCartsRouter.get('/', ShoppingCartController.showCarts);
ShoppingCartsRouter.get('/auth', authentication, ShoppingCartController.showCartsUsers);
ShoppingCartsRouter.get('/:id', ShoppingCartController.showCartsById);
ShoppingCartsRouter.post('/add', authentication, ShoppingCartController.addCarts);
ShoppingCartsRouter.delete('/delete/:id', authentication, ShoppingCartController.deleteCarts);
ShoppingCartsRouter.put('/update/:id', authentication, ShoppingCartController.updateCarts);

module.exports = ShoppingCartsRouter;