const LineItemRouter = require('express').Router();
const LineItemsController = require('../controllers/LineItemsController');
const { authentication } = require('../middlewares/auth');

LineItemRouter.get('/', LineItemsController.showLineItems);
LineItemRouter.get('/auth', authentication, LineItemsController.showItemsUsers);
LineItemRouter.get('/:id', LineItemsController.showItemsById);
LineItemRouter.post('/add', authentication, LineItemsController.addLineItem);
LineItemRouter.delete('/delete/:id', authentication, LineItemsController.deleteLineItem);
LineItemRouter.put('/update/:id', authentication, LineItemsController.updateLineItem);

module.exports = LineItemRouter;