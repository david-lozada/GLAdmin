'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsForeignExchanges', ['idForeignExchange'], {
      type: 'foreign key',
      name: 'idCurrencyProductsForeignExchangesFKey',
      references: { //Required field
        table: 'ForeignExchanges',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsForeignExchanges', 'idCurrencyProductsForeignExchangesFKey');
  }
};