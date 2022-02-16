const orderRoute = require("express").Router();
const { authentication } = require("../middleware/auth");
const OrderControllers = require("../controllers/OrderController");

orderRoute.get("/", OrderControllers.showOrders);
orderRoute.get("/auth",authentication, OrderControllers.showOrdersByUser);
orderRoute.get("/:id", OrderControllers.showOrdersById);
orderRoute.post("/add", authentication, OrderControllers.createOrder);
orderRoute.delete("/delete/:id",authentication, OrderControllers.deleteOrder);
orderRoute.put("/update/:id",authentication, OrderControllers.updateOrder);
orderRoute.put("/updateStatus/:id",authentication, OrderControllers.updateStatusOrder);

module.exports = orderRoute;
