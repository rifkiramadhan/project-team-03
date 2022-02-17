const { users, products, products_image } = require("../models");

class ProductController {
  static async showProduct(req, res) {
    try {
      let product = await products.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showProductByUser(req, res) {
    try {
      const { id } = req.userData;
      let product = await products.findAll({
        where: { userId: id },
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showProductById(req, res) {
    try {
      const id = +req.params.id;
      let product = await products.findOne({
        where: { id },
        include: [users],
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async createProduct(req, res) {
    try {
      const {
        name,
        desc,
        price,
        stock,
        expire,
        weight,
        category,
        brand,
        condition,
        total_sold,
        rating,
        views,
      } = req.body;

      const userId = req.userData.id;
      let product = await products.create({
        name,
        desc,
        price,
        stock,
        expire,
        weight,
        category,
        brand,
        condition,
        total_sold,
        rating,
        views,
        userId,
      });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateProduct(req, res) {
    try {
      const id = +req.params.id;
      const {
        name,
        desc,
        price,
        stock,
        expire,
        weight,
        category,
        brand,
        condition,
        total_sold,
        rating,
        views,
      } = req.body;

      let result = await products.update(
        {
          name,
          desc,
          price,
          stock,
          expire,
          weight,
          category,
          brand,
          condition,
          total_sold,
          rating,
          views,
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
  static async deleteProduct(req, res) {
    try {
      const id = +req.params.id;
      let result = await products.destroy({
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
  static async updateViews(req, res) {
    try {
      const id = +req.params.id;
      let product = await products.increment({ views: +1 }, { where: { id } });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateSold(req, res) {
    try {
      const id = +req.params.id;
      let product = await products.increment(
        { total_sold: +1 },
        { where: { id } }
      );
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ProductController;
