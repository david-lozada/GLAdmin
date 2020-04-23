'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsForeignExchanges', ['idProduct', 'idForeignExchange'], {
      type: 'primary key',
      name: 'idProductIdForeignExchangePKey'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsForeignExchanges', 'PRIMARY');
  }
};