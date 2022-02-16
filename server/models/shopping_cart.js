"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shopping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shopping_cart.belongsTo(models.users);
      shopping_cart.hasMany(models.line_items);
    }
  }
  shopping_cart.init(
    {
      shop_status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Shop Status must be not empty!",
          },
        },
      },
      shop_created_on: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            message: "Shop Created on must be not empty!",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Shop User Id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "shopping_cart",
    }
  );
  return shopping_cart;
};
