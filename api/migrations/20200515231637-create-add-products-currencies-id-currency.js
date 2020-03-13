'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsCurrencies', ['idCurrency'], {
      type: 'foreign key',
      name: 'idCurrencyProductsCurrenciesFKey',
      references: { //Required field
        table: 'Currencies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsCurrencies', 'idCurrencyProductsCurrenciesFKey');
  }
};