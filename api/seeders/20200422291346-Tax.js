'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Taxes', [
        {
          name: 'IVA 5%',
          percentage: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: 'IVA 12%',
          percentage: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          name: 'Alícuota 10%',
          percentage: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Taxes', null, {});
  }
};
