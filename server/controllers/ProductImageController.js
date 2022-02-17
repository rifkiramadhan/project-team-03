const { products_image } = require("../models");

class ProductImageController {
  static async showProductImage(req, res) {
    try {
      let image = await products_image.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(image);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async uploadProductImage(req, res) {
    try {
      const productId = +req.params.id;
      let filename = req.file.filename;
      let filesize = req.file.size;
      let filetype = req.file.mimetype;
      let img = await products_image.create({
        filename,
        filesize,
        filetype,
        primary: true,
        productId,
      });

      res.status(200).json(img);
    } catch (err) {
      res.status(403).json(err);
    }
  }
  static async updateProductImage(req, res) {
    try {
      const productId = +req.params.id;
      let filename = req.file.filename;
      let filesize = req.file.size;
      let filetype = req.file.mimetype;
      let result = await products_image.update(
        { filename, filesize, filetype },
        {
          where: { productId },
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
      res.status(403).json(err);
    }
  }
  static async deleteProductImage(req, res) {
    try {
      const id = +req.params.id;
      let result = await products_image.destroy({
        where: { id },
      });
      res.status(200).json(result);
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

module.exports = ProductImageController;
