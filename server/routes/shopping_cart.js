const shoppingCartRoute = require("express").Router();
const ShoppingCartControllers = require("../controllers/ShoppingCartController");
const { authentication, authorization } = require("../middleware/auth");

shoppingCartRoute.get("/", ShoppingCartControllers.showCarts);
shoppingCartRoute.get("/auth",authentication,ShoppingCartControllers.showCartByUser);
shoppingCartRoute.get("/:id", ShoppingCartControllers.showCartById);
shoppingCartRoute.post("/add",authentication,ShoppingCartControllers.createCart);
shoppingCartRoute.put("/update/:id",authentication,authorization,ShoppingCartControllers.updateCart);
shoppingCartRoute.delete("/delete/:id",authentication,authorization,ShoppingCartControllers.deleteCart);

module.exports = shoppingCartRoute;
