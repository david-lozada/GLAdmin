'use strict';
var { Currency } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('ForeignExchanges', [
      {
        value: 150000,
        idCurrency: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ForeignExchanges', null, {});
  }
};
