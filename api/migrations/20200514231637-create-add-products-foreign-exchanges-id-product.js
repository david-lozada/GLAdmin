'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ProductsForeignExchanges', ['idProduct'], {
      type: 'foreign key',
      name: 'idProductProductsForeignExchangesFKey',
      references: { //Required field
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ProductsForeignExchanges', 'idProductProductsForeignExchangesFKey');
  }
};