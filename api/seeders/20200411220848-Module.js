'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Modules', [
      {
        name: 'Users',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Customers',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Suppliers',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Users',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'AccountsPayables',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'AccountsReceivables',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Products',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'PurchaseOrders',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sales',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Taxes',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Modules', null, {});
    
  }
};
