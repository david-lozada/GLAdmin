'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsCurrencies', ['idProduct'], {
      type: 'foreign key',
      name: 'idProductProductsCurrenciesFKey',
      references: { //Required field
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsCurrencies', 'idProductProductsCurrenciesFKey');
  }
};