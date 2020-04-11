'use strict';
var { Role } = require('../models');
const bcrypt = require('bcrypt');



module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hash = bcrypt.hashSync('000000', 10);
    const role = await Role.findOne({
      where: { slug: 'master' }
    })
    return await queryInterface.bulkInsert('Users', [{
      firstName: 'Greuddy',
      lastName: 'Lozada',
      userName: 'glozada',
      email: 'greuddydlp16@gmail.com',
      password: hash,
      available: true,
      idRole: role.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};