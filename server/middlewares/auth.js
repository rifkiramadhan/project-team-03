const { tokenVerifier } = require("../helpers/jwt");
const { Product, User } = require('../models')

function authentication(req, res, next) {
  let access_token = req.headers.access_token;

  console.log('On MiddleWare Authentication');
  
  if (access_token) {
    try {
      const decoded = tokenVerifier(access_token);
      req.UserDetail = decoded;
      next();
    } catch (err) {
      res.status(500).json({
        message: 'User not Authenticated',
      });
    };
  } else {
    res.status(404).json({
      message: 'Token Not Found',
    });
  };
};

function authorization(req, res, next) {
  const id = +req.params.id;
  const UserId = +req.UserDetail.id;
  
  console.log('On MiddleWare Authorization');

  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        res.status(404).json({
          message: 'Not Found',
        });
      } else if (product.UserId !== UserId) {
        res.status(401).json({
          message: 'User Not Authorized',
        });
      } else {
        next();
      };
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = { authentication, authorization };