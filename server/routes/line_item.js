const lineItemRoute = require("express").Router();
const LineItemControllers = require("../controllers/LineItemsController");
const { authentication } = require("../middleware/auth");

lineItemRoute.get("/", LineItemControllers.showLineItem);
lineItemRoute.get("/auth",authentication,LineItemControllers.showLineItemByUser);
lineItemRoute.get("/:id", LineItemControllers.showLineItemById);
lineItemRoute.post("/add", LineItemControllers.createLineItem);
lineItemRoute.put("/update/:id", LineItemControllers.updateLineItem);
lineItemRoute.delete("/delete/:id", LineItemControllers.deleteLineItem);

module.exports = lineItemRoute;
