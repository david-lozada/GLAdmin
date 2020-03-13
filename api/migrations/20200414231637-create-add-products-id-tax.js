'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Products', // name of Source model
      'idTax', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Taxes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Products',
      'idTax'
      );
  }
};