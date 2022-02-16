'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('line_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lite_qty: {
        type: Sequelize.INTEGER
      },
      lite_status: {
        type: Sequelize.STRING
      },
      lite_prod_id: {
        type: Sequelize.INTEGER
      },
      lite_shop_id: {
        type: Sequelize.INTEGER
      },
      lite_order_name: {
        type: Sequelize.STRING
      },
      lite_shop_id: {
        type: Sequelize.INTEGER
      },
      lite_prod_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('line_items');
  }
};