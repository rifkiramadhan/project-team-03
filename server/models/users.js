'use strict';
const {
  Model
} = require('sequelize');

const {encrypter} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.products);
      users.hasMany(models.shopping_cart);
      users.hasMany(models.orders);
    }
  }
  users.init({
    user_name: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Name has not be empty!"
      }
    }},
    user_email: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Email has not be empty!"
      },
      isEmail:{
        message:"Must be email!"
      }
    }},
    user_password: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Password has not be empty!"
      }
    }},
    user_salt: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Salt has not be empty!"
      }
    }},
    user_birthdate: {
      type: DataTypes.DATEONLY,
    validate:{
      notEmpty:{
        message:"User Birthdate has not be empty!"
      }
    }},
    user_gender: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Gender has not be empty!"
      }
    }},
    user_avatar: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Name has not be empty!"
      }
    }},
    user_type: {
      type: DataTypes.STRING,
    validate:{
      notEmpty:{
        message:"User Name has not be empty!"
      }
    }}
  }, {
    hooks :{
      beforeCreate : function(users,options) {
        users.user_password = encrypter(users.user_password);
      }
    },
    sequelize,
    modelName: 'users',
  });
  return users;
};