'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'StockDets', // name of Source model
      'idStock', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stocks', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'StockDets',
      'idStock'
      );
  }
};