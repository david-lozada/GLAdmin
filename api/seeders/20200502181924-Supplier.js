'use strict';
var faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Suppliers', [
      {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        documentNumber: faker.random.number(),
        companyName: faker.company.companyName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
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
