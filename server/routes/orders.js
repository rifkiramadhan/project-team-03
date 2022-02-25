const OrderRouter = require('express').Router();
const OrderController = require('../controllers/OrderController');
const { authentication } = require('../middlewares/auth');

OrderRouter.get('/', OrderController.showOrders);
OrderRouter.get('/auth', authentication, OrderController.showOrdersUsers);
OrderRouter.get('/:id', OrderController.showOrdersById);
OrderRouter.post('/add', authentication, OrderController.addOrders);
OrderRouter.delete('/delete/:id', authentication, OrderController.deleteOrders);
OrderRouter.put('/update/:id', authentication, OrderController.updateOrders);
OrderRouter.put('/updateStatus/:id', authentication, OrderController.updateStatus);

module.exports = OrderRouter;