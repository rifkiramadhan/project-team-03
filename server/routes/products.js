const ProductRouter = require('express').Router();
const ProductController = require('../controllers/ProductController');
const {authentication,authorization} = require('../middlewares/auth');

ProductRouter.get('/',ProductController.showProducts);
ProductRouter.get('/auth',authentication,ProductController.showProductsUsers);
ProductRouter.get('/:id',ProductController.showProductsById);
ProductRouter.post('/add',authentication,ProductController.addProducts);
ProductRouter.delete('/delete/:id',authentication,authorization,ProductController.deleteProducts);
ProductRouter.put('/update/:id',authentication,authorization,ProductController.updateProducts);

ProductRouter.put('/updateViews/:id',ProductController.updateViews);
ProductRouter.put('/updateSold/:id',ProductController.updateSold);
ProductRouter.put('/updateRating/:id',ProductController.updateRating);

module.exports = ProductRouter;