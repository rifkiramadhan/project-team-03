const { Router } = require("express");
const route = Router();

route.get("/", (req, res) => {
  res.status(200).json({
    message: "home page",
  });
});

const userRoute = require("./users");
const productRoute = require("./products");
const orderRoute = require("./orders");
const shoppingCartRoute = require("./shopping_cart");
const productImageRoute = require("./products_image");
const lineItemRoute = require("./line_item");
route.use("/users", userRoute);
route.use("/products", productRoute);
route.use("/orders", orderRoute);
route.use("/shoppingCarts", shoppingCartRoute);
route.use("/productImages", productImageRoute);
route.use("/lineItems", lineItemRoute);

module.exports = route;
