'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'Master',
        slug: 'master',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Administrador',
        slug: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Empleado',
        slug: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
