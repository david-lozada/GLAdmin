'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ForeignExchanges', // name of Source model
      'idCurrency', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Currencies', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ForeignExchanges',
      'idCurrency'
      );
  }
};