'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Stocks', // name of Source model
      'idBatch', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Batches', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Stocks',
      'idBatch'
      );
  }
};