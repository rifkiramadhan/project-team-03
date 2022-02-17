"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      products.belongsTo(models.users);
      products.hasMany(models.products_image);
      products.hasMany(models.line_items);
    }
  }
  products.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product name must be not empty!",
          },
        },
      },
      desc: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product description must be not empty!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product price must be not empty!",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product stock must be not empty!",
          },
        },
      },
      expire_date: DataTypes.DATE,
      weight: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product weight must be not empty!",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product category must be not empty!",
          },
        },
      },
      brand: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product brand must be not empty!",
          },
        },
      },
      condition: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Product condition must be not empty!",
          },
        },
      },
      total_sold: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product total sold must be not empty!",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product rating must be not empty!",
          },
        },
      },
      views: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product views must be not empty!",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Product user id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
