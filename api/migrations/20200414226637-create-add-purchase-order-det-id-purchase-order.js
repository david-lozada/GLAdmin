'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'PurchaseOrderDets', // name of Source model
      'idPurchaseOrder', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'PurchaseOrders', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'PurchaseOrderDets',
      'idPurchaseOrder'
      );
  }
};