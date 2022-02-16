'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_name: {
        type: Sequelize.STRING
      },
      order_created_on: {
        type: Sequelize.DATE
      },
      order_subtotal: {
        type: Sequelize.INTEGER
      },
      order_discount: {
        type: Sequelize.STRING
      },
      order_tax: {
        type: Sequelize.DATEONLY
      },
      order_total_due: {
        type: Sequelize.STRING
      },
      order_payt_trx_number: {
        type: Sequelize.STRING
      },
      order_city: {
        type: Sequelize.STRING
      },
      order_address: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.STRING
      },
      userId: {
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
    await queryInterface.dropTable('orders');
  }
};