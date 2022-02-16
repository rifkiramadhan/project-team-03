const { decrypter } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");
const { users } = require("../models");

class UserController {
  static async showUser(req, res) {
    try {
      let user = await users.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async loginUser(req, res) {
    try {
      const { user_email, user_password } = req.body;
      let user = await users.findOne({
        where: { user_email },
      });

      if (user) {
        if (decrypter(user_password, user.user_password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Password",
          });
        }
      } else {
        res.status(404).json({
          message: "User Not Found!",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async registerUser(req, res) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_salt,
        user_birthdate,
        user_gender,
        user_avatar,
        user_type,
      } = req.body;

      let findEmail = await users.findOne({
        where: { user_email },
      });
      if (findEmail) {
        res.status(403).json({
          message: "Email already used!",
        });
      } else {
        let user = await users.create({
          user_name,
          user_email,
          user_password,
          user_salt,
          user_birthdate,
          user_gender,
          user_avatar,
          user_type,
        });
        res.status(201).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async showUserById(req, res) {
    try {
      const id = req.userData.id;
      let user = await users.findByPk(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      let result = await users.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updateUser(req, res) {
    try {
      const id = req.userData.id;
      const {
        user_name,
        user_email,
        user_password,
        user_salt,
        user_birthdate,
        user_gender,
        user_avatar,
        user_type,
      } = req.body;

      let user = await users.update(
        {
          user_name,
          user_email,
          user_password,
          user_salt,
          user_birthdate,
          user_gender,
          user_avatar,
          user_type,
        },
        { where: { id }, }
      );

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
