'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [
      {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.number.int(),
        companyName: faker.company.name(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Suppliers', null, {});
  }
};
