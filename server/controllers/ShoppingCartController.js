const { shopping_cart, users } = require("../models");

class ShoppingCartController {
  static async showCarts(req, res) {
    try {
      let cart = await shopping_cart.findAll({
        order: [["id", "ASC"]],
        include: { users },
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showCartByUser(req, res) {
    try {
      const { id } = req.userData;
      let cart = await shopping_cart.findAll({
        where: { userId: id },
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showCartById(req, res) {
    try {
      const id = +req.params.id;
      let cart = await shopping_cart.findOne({
        where: { id },
        include: [users],
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async createCart(req, res) {
    try {
      const { shop_status, shop_created_on } = req.body;

      const userId = req.userData.id;
      let cart = await shopping_cart.create({
        shop_status,
        shop_created_on: new Date(),
        userId,
      });
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteCart(req, res) {
    try {
      const id = +req.params.id;
      let result = await shopping_cart.destroy({
        where: { id },
      });
      result === 1
        ? res.status(200).json({
            message: `${id} has been deleted!`,
          })
        : res.status(403).json({
            message: `${id} has been not deleted!`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateCart(req, res) {
    try {
      const id = +req.params.id;
      const { shop_status, shop_created_on } = req.body;
      //const userId = req.userData.id;
      let result = await shopping_cart.update(
        {
          shop_status,
          shop_created_on: new Date(),
        },
        {
          where: { id },
        }
      );

      result[0] === 1
        ? res.status(200).json({
            message: `${id} has been updated!`,
          })
        : res.status(404)({
            message: `${id} has been not updated!`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ShoppingCartController;
