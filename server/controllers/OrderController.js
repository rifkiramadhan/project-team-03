const { users, orders } = require("../models");

class OrderController {
  static async showOrders(req, res) {
    try {
      let order = await orders.findAll({
        order: [["userId", "ASC"]],
            include: 
              [
                users
              ] 
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showOrdersByUser(req, res) {
    try {
      const { id } = req.userData;
      let order = await orders.findAll({
        where: { userId: id },
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showOrdersById(req, res) {
    try {
      const id = +req.params.id;
      let order = await orders.findOne({
        where: { id },
        include: [users],
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async createOrder(req, res) {
    try {
      const {
        name,
        created_on,
        subtotal,
        discount,
        tax,
        total_due,
        total_qty,
        payt_trx_number,
        city,
        address,
        status,
      } = req.body;

      const userId = req.userData.id;
      let order = await orders.create({
        name,
        created_on: new Date(),
        subtotal,
        discount,
        tax,
        total_due,
        total_qty,
        payt_trx_number,
        city,
        address,
        status,
        userId,
      });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateOrder(req, res) {
    try {
      const id = +req.params.id;
      const {
        name,
        created_on,
        subtotal,
        discount,
        tax,
        total_due,
        total_qty,
        payt_trx_number,
        city,
        address,
        status,
      } = req.body;

      let result = await orders.update(
        {
          name,
          created_on: new Date(),
          subtotal,
          discount,
          tax,
          total_due,
          total_qty,
          payt_trx_number,
          city,
          address,
          status,
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
  static async deleteOrder(req, res) {
    try {
      const id = +req.params.id;
      let result = await orders.destroy({
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
  static async updateStatusOrder(req, res) {
    try {
      const id = +req.params.id;
      const { status } = req.body;
      let order = await orders.update(
        { status },
        {
          where: { id },
        }
      );

      res.status(200).json({
        message: "Status Has Been Update",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = OrderController;
