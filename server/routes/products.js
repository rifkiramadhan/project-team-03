const productRoute = require("express").Router();
const ProductControllers = require("../controllers/ProductController");
const { authentication, authorization } = require("../middleware/auth");

productRoute.get("/", ProductControllers.showProduct);
productRoute.get("/auth", authentication, ProductControllers.showProductByUser);
productRoute.get("/:id", ProductControllers.showProductById);
productRoute.put("/update/:id",authentication,authorization,ProductControllers.updateProduct);
productRoute.post("/add", authentication, ProductControllers.createProduct);
productRoute.delete("/delete/:id",authentication,authorization,ProductControllers.deleteProduct);

productRoute.put("/updateViews/:id", ProductControllers.updateViews);
productRoute.put("/updateSold/:id", ProductControllers.updateSold);

module.exports = productRoute;
