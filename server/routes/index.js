const router = require('express').Router();

router.get('/',(req, res) =>{
    res.status(200).json({
        message : "USERS ITEMS STORE"
    });
});

const UsersRoutes = require('./users');
const LineItemsRoutes = require('./lineitems');
const OrdersRoutes = require('./orders');
const ProductImagesRoutes = require('./productimages');
const ProductsRoutes = require('./products');
const ShoppingCartsRoutes = require('./shoppingcarts');

router.use('/users', UsersRoutes);
router.use('/line_items', LineItemsRoutes);
router.use('/orders', OrdersRoutes);
router.use('/productimages', ProductImagesRoutes);
router.use('/products', ProductsRoutes);
router.use('/shopping_carts', ShoppingCartsRoutes);

module.exports = router;