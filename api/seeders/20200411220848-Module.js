'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Modules', [
      {
        name: 'Users',
        available: true
      }, {
        name: 'Customers',
        available: true
      }, {
        name: 'Suppliers',
        available: true
      }, {
        name: 'Users',
        available: true
      }, {
        name: 'AccountsPayables',
        available: true
      }, {
        name: 'AccountsReceivables',
        available: true
      }, {
        name: 'Products',
        available: true
      }, {
        name: 'PurchaseOrders',
        available: true
      }, {
        name: 'Sales',
        available: true
      }, {
        name: 'Taxes',
        available: true
      },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Modules', null, {});
    
  }
};
