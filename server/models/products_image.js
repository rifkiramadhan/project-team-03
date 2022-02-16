"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products_image.belongsTo(models.products);
    }
  }
  products_image.init(
    {
      prim_filename: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product image file name must be not empty!",
          },
        },
      },
      prim_filesize: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product image file size must be not empty!",
          },
        },
      },
      prim_filetype: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product image file type must be not empty!",
          },
        },
      },
      prim_primary: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: {
            message: "Product image primary must be not empty!",
          },
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "products_image",
    }
  );
  return products_image;
};
