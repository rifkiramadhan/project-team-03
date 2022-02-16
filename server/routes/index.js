const {Router} = require('express');
const route = Router();

route.get('/',(req,res) =>{
    res.status(200).json({
        message:'home page'
    })
})

const userRoute = require('./users');
const productRoute = require('./products');
const orderRoute = require('./orders');
const shoppingCartRoute = require('./shopping_cart')
route.use('/users',userRoute);
route.use('/products',productRoute);
route.use('/orders',orderRoute);
route.use('/shoppingCarts',shoppingCartRoute)

module.exports = route
