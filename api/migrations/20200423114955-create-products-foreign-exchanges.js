'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductsForeignExchanges', {
      idProduct: {
        type: Sequelize.INTEGER,
      },
      idForeignExchange: { //This one shouldn't be notNull, the user may input default price (Not dollar)
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductsForeignExchanges');
  }
};