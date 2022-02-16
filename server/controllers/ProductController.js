const {users, products,products_image } = require("../models");

class ProductController {
  static async showProduct(req, res) {
    try {
      let product = await products.findAll({
        order:[["id","ASC"]]
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
        include:[users]
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async createProduct(req, res) {
    try {
      const {
        prod_name,
        prod_desc,
        prod_price,
        prod_stock,
        prod_expire,
        prod_weight,
        prod_category,
        prod_brand,
        prod_condition,
        prod_total_sold,
        prod_rating,
        prod_views,
      } = req.body;

      const userId = req.userData.id;
      let product = await products.create(
        {
          prod_name,
          prod_desc,
          prod_price,
          prod_stock,
          prod_expire,
          prod_weight,
          prod_category,
          prod_brand,
          prod_condition,
          prod_total_sold,
          prod_rating,
          prod_views,
          userId,
        }
      );
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateProduct(req, res) {
    try {
      const id = +req.params.id;
      const {
        prod_name,
        prod_desc,
        prod_price,
        prod_stock,
        prod_expire,
        prod_weight,
        prod_category,
        prod_brand,
        prod_condition,
        prod_total_sold,
        prod_rating,
        prod_views,
      } = req.body;
      //const userId = req.userData.id;
      let result = await products.update(
        {
          prod_name,
          prod_desc,
          prod_price,
          prod_stock,
          prod_expire,
          prod_weight,
          prod_category,
          prod_brand,
          prod_condition,
          prod_total_sold,
          prod_rating,
          prod_views,
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
}

module.exports = ProductController;
