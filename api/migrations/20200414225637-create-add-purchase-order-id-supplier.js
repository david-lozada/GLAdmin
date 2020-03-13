'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'PurchaseOrders', // name of Source model
      'idSupplier', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Suppliers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'PurchaseOrders',
      'idSupplier'
      );
  }
};