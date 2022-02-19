'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Line_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Line_Item.belongsTo(models.Product);
      Line_Item.belongsTo(models.Shopping_Cart);
      Line_Item.belongsTo(models.Order);
    }
  };
  Line_Item.init({
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    ShoppingCartId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Line_Item',
  });
  return Line_Item;
};