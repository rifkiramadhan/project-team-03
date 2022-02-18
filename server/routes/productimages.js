const ProductImageRouter = require('express').Router();
const ProductImageController = require('../controllers/ProductImageController');
const { authentication, authorization } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

ProductImageRouter.get('/', authentication, ProductImageController.showImages);
ProductImageRouter.post('/upload/:id', authentication, authorization, upload.single('image'), ProductImageController.uploadImages);
ProductImageRouter.put('/update/:id', authentication, authorization, upload.single('image'), ProductImageController.updateImages);
ProductImageRouter.delete('/delete/:id', authentication, ProductImageController.deleteImages);

module.exports = ProductImageRouter;