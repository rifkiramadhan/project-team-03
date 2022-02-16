const productImageRoute = require("express").Router();
const ProductImageControllers = require("../controllers/ProductImageController");
const { authentication, authorization } = require("../middleware/auth");
const upload = require("../middleware/multer");

productImageRoute.get("/",authentication, ProductImageControllers.showProductImage);
productImageRoute.post("/upload/:id",authentication,authorization,upload.single("image"), ProductImageControllers.uploadProductImage);
productImageRoute.put("/update/:id",authentication,authorization,upload.single("image"), ProductImageControllers.updateProductImage);
productImageRoute.delete("/delete/:id",authentication, ProductImageControllers.deleteProductImage);

module.exports = productImageRoute;
