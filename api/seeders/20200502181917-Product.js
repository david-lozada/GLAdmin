'use strict';
var faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [
        {
          code: '001',
          name: 'Harina',
          price: faker.commerce.price(),
          dollarPrice: 1,
          idTax: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: '002',
          name: 'Arroz',
          price: faker.commerce.price(),
          dollarPrice: 1,
          idTax: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: '003',
          name: 'Pasta',
          price: faker.commerce.price(),
          dollarPrice: 1,
          idTax: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: '004',
          name: 'Atún',
          price: faker.commerce.price(),
          dollarPrice: 2,
          idTax: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: '005',
          name: 'Queso',
          price: faker.commerce.price(),
          dollarPrice: 3,
          idTax: 1,
          available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
