'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsCurrencies', ['idProduct', 'idCurrency'], {
      type: 'primary key',
      name: 'idProductIdCurrencyPKey'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsCurrencies', 'PRIMARY');
  }
};