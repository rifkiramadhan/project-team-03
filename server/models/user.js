'use strict';
const {
  Model
} = require('sequelize');
const { encrypter } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
      User.hasMany(models.Shopping_Cart);
      User.hasMany(models.Order);
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      validate:{
        notEmpty : {
          message : "TIDAK BOLEH KOSONG"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate:{
        notEmpty : {
          message : "TIDAK BOLEH KOSONG"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate:{
        notEmpty : {
          message : "TIDAK BOLEH KOSONG"
        }
      }
    },
    salt: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: {
      type : DataTypes.STRING,
      validate:{
        notEmpty : {
          message : "TIDAK BOLEH KOSONG"
        }
      }
    },
    avatar: {
      type : DataTypes.STRING,
      validate:{
        notEmpty : {
          message : "TIDAK BOLEH KOSONG"
        }
      }
    },
    type: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user,option){
        user.password = encrypter(user.password)
        user.salt = encrypter(user.password)
      }
    }, 
    sequelize,
    modelName: 'User',
  });
  return User;
};