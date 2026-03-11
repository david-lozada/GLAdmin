'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Batches', [
        {
          code: faker.hacker.abbreviation(),
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: faker.hacker.abbreviation(),
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          code: faker.hacker.abbreviation(),
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Batches', null, {});
  }
};
