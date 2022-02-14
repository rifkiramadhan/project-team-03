'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shopping_carts', {
      shop_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_created_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shop_status: {
        type: Sequelize.STRING
      },
      shop_user_id: {
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shopping_carts');
  }
};