'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Currencies', [
        {
          code: 'USD',
          name: 'Dolar',
          symbol: '$',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: 'COP',
          name: 'Peso Colombiano',
          symbol: '$',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: 'MXN',
          name: 'Peso Mexicano',
          symbol: '$',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: 'BRL',
          name: 'Real Brasileño',
          symbol: 'R$',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: 'ARS',
          name: 'Peso Argentino',
          symbol: '$',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
   
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Currencies', null, {});
   
  }
};
