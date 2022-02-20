'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
      Product.hasMany(models.Products_Image);
      Product.hasMany(models.Line_Item);
    }
  };
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    expire_date: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    condition: DataTypes.STRING,
    total_sold: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  },
  {
    hooks: {
      beforeCreate(product,option){
        product.stock= 1,
        product.total_sold= 0,
        product.rating = 0,
        product.views = 0
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};