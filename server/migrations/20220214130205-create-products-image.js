'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prim_filename: {
        type: Sequelize.STRING
      },
      prim_filesize: {
        type: Sequelize.STRING
      },
      prim_filetype: {
        type: Sequelize.STRING
      },
      prim_primary: {
        type: Sequelize.BOOLEAN
      },
      productId: {
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
    await queryInterface.dropTable('products_images');
  }
};