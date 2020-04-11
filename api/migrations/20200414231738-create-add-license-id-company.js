'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Licenses', ['idCompany'], {
      type: 'foreign key',
      name: 'licensesIdCompanyFKey',
      references: { //Required field
        table: 'Companies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: (queryInterface, Sequelize) => {
    // return queryInterface.removeConstraint('Licenses', 'licensesIdCompanyFKey');
  }
};