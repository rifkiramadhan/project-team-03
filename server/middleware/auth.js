const { tokenVerifier } = require("../helpers/jwt");
const { products, users } = require("../models");

const authentication = (req, res, next) => {
  console.log("Authentication Middleware");
  const { access_token } = req.headers;

  if (access_token) {
    try {
      let verify = tokenVerifier(access_token);
      req.userData = verify;
      next();
    } catch (err) {
      res.status(500).json({
        message: "User not Authenticated",
      });
    }
  } else {
    res.status(404).json({
      message: "Token Not Found",
    });
  }
};

const authorization = (req,res,next) => {
    console.log("On Middleware Authorization");
    const id = +req.params.id;
    const userId = req.userData.id;

  products.findByPk(id)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: "Not Found",
        });
      } else if (product.userId !== userId) {
        res.status(401).json({
          message: "User Not Authorized",
        });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

module.exports = {authentication, authorization};
