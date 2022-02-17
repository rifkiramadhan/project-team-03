"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users);
      orders.hasMany(models.line_items);
    }
  }
  orders.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order name must be not empty!",
          },
        },
      },
      created_on: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            message: "Order name must be not empty!",
          },
        },
      },
      subtotal: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Order subtotal must be not empty!",
          },
        },
      },
      discount: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order discount must be not empty!",
          },
        },
      },
      tax: {
        type: DataTypes.DATEONLY,
        validate: {
          notEmpty: {
            message: "Order tax must be not empty!",
          },
        },
      },
      total_due: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order tax must be not empty!",
          },
        },
      },
      payt_trx_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order payment transaxsiont number must be not empty!",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order city must be not empty!",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order address must be not empty!",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Order status must be not empty!",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Order user id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
