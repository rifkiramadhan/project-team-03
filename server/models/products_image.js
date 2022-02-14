'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products_image.init({
    prim_filename: DataTypes.STRING,
    prim_filesize: DataTypes.STRING,
    prim_filetype: DataTypes.STRING,
    prim_primary: DataTypes.BOOLEAN,
    prim_prod_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products_image',
  });
  return products_image;
};