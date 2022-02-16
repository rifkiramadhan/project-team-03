const userRoute = require("express").Router();
const UserControllers = require("../controllers/UserController");
const { authentication } = require("../middleware/auth");
const upload = require("../middleware/multer");

userRoute.get("/", UserControllers.showUser);
userRoute.get("/:id", authentication, UserControllers.showUserById);
userRoute.delete("/delete/:id", UserControllers.deleteUser);
userRoute.post("/login", UserControllers.loginUser);
userRoute.post("/register",upload.single("avatar"),UserControllers.registerUser);
userRoute.put("/update",authentication,upload.single("avatar"),UserControllers.updateUser);

module.exports = userRoute;
