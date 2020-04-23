// Dependencies
const Sequelize = require('sequelize');

// User Model
var { Role, AuthToken } = require('../models');


// Get User Info
exports.getCurrentRole = async function (req, res) {
  const token = req.headers.authorization.split(' ')[1]
  let user = await AuthToken.findOne({
    where: { token },
    include: 'User'
  })
  const role = await Role.findOne({
    where: { id: user.User.idRole }
  })
  var names = ['common', role.slug]
  return res.status(200).json(names);
}

// Get all roles
exports.getAllRoles = async function (req, res) {
  try {
      let roles = await Role.findAll({
          attributes: ['id', 'name', 'slug']
      });
      if (roles) {
          return res.status(200).json(roles);
      }
  } catch(err) {
      return res.status(400).send(err);
  }
}