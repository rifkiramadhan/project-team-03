const { line_items } = require("../models");

class LineItemsController {
  static async showLineItem(req, res) {
    try {
      let line_item = await line_items.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(line_item);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showLineItemByUser(req, res) {
    try {
      const { id } = req.userData;
      let line_item = await line_items.findAll({
        where: { userId: id },
      });
      res.status(200).json(line_item);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showLineItemById(req, res) {
    try {
      const id = +req.params.id;
      let line_item = await line_items.findOne({
        where: { id },
        include: [users],
      });
      res.status(200).json(line_item);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async createLineItem(req, res) {
    try {
      const { lite_qty, lite_status, productId, shoppingCartId, orderId } =
        req.body;

      let line_item = await line_items.create({
        lite_qty,
        lite_status,
        productId,
        shoppingCartId,
        orderId,
      });
      res.status(201).json(line_item);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateLineItem(req, res) {
    try {
      const id = +req.params.id;
      const { lite_qty, lite_status } = req.body;
      let result = await line_items.update(
        {
          lite_qty,
          lite_status,
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
  static async deleteLineItem(req, res) {
    try {
      const id = +req.params.id;
      let result = await line_items.destroy({
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
}

module.exports = LineItemsController;
