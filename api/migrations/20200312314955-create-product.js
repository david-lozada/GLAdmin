'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(20,2)
      },
      dollarPrice: {
        type: Sequelize.DECIMAL(20,2)
      },
      existence: {
        type: Sequelize.INTEGER
      },
      entryDate: {
        type: Sequelize.DATE
      },
      observation: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      available: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        default: true
      },
      image: {
        allowNull: true,
        type: Sequelize.JSON
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};