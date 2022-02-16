const userRoute = require('express').Router();
const UserControllers = require('../controllers/UserController'); 
const { authentication } = require('../middleware/auth');

userRoute.get('/',UserControllers.showUser);
userRoute.get('/:id',authentication, UserControllers.showUserById);
userRoute.delete('/delete/:id',UserControllers.deleteUser);
userRoute.post('/login',UserControllers.loginUser);
userRoute.post('/register',UserControllers.registerUser);
userRoute.put('/update',authentication, UserControllers.updateUser);

module.exports=userRoute
