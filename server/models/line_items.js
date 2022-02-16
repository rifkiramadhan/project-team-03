"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class line_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      line_items.belongsTo(models.products);
      line_items.belongsTo(models.shoppingcart);
      line_items.belongsTo(models.orders);
    }
  }
  line_items.init(
    {
      lite_qty: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "line item quantity must be not empty!",
          },
        },
      },
      lite_status: DataTypes.STRING,
      productId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "line item product id must be not empty!",
          },
        },
      },
      shoppingCartId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "line item shop id must be not empty!",
          },
        },
      },
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "line_items",
    }
  );
  return line_items;
};
