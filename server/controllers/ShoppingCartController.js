const { Shopping_Cart, 
        User 
} = require('../models');

class ShoppingCartController {
  static async showCarts(req, res) {
    try {
      let cart = await Shopping_Cart.findAll({
        order: [['id', 'ASC']],
      });

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    };
  };

  static async showCartsUsers(req, res) {
    try {
      const { id } = req.UserDetail;
      let cart = await Shopping_Cart.findAll({
        where: { UserId: id },
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    };
  };

  static async showCartsById(req, res) {
    try {
      const id = +req.params.id;
      let cart = await Shopping_Cart.findOne({
        where: { id },
        include: [User],
      });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    };
  };

  static async addCarts(req, res) {
    try {
      const UserId = req.UserDetail.id;
      let cart = await Shopping_Cart.create({
        created_on: new Date(),
        status: 'Open',
        UserId,
      });

      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json(err);
    };
  };

  static async deleteCarts(req, res) {
    try {
      const id = +req.params.id;
      let result = await Shopping_Cart.destroy({
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
    };
  };

  static async updateCarts(req, res) {
    try {
      const id = +req.params.id;
      const { status, UserId } = req.body;
      let cart = await Shopping_Cart.update(
        {
          created_on: new Date(),
          status,
          UserId,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: 'Data Has Been Update'
      });
    } catch (err) {
      res.status(500).json(err);
    };
  };
};

module.exports = ShoppingCartController;
