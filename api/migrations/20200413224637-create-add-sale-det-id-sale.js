'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'SalesDets', // name of Source model
      'idSale', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Sales', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'SalesDets',
      'idSale'
      );
  }
};