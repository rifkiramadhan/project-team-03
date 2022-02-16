const orderRoute = require('express').Router();
const { authentication } = require('../middleware/auth');
const OrderControllers = require('../controllers/OrderController');

orderRoute.get('/auth',OrderControllers.showOrdersByUser)
orderRoute.get('/:id',OrderControllers.showOrdersById)
orderRoute.post('/add', OrderControllers.createOrder)
orderRoute.delete('/delete/:id',OrderControllers.deleteOrder)
orderRoute.put('/update/:id',OrderControllers.updateOrder)
orderRoute.put('/updateStatus/:id',OrderControllers.updateStatusOrder)

module.exports = orderRoute