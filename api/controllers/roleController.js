// Dependencies
const Sequelize = require('sequelize');

// User Model
var { Role, AuthToken } = require('../models');


// Get User Info
exports.getAll = async function (req, res) {
  const token = req.headers.authorization.split(' ')[1]
  console.log(token)
  let user = await AuthToken.findOne({
    where: { token },
    include: 'User'
  })
  const role = await Role.findOne({
    where: { id: user.User.idRole }
  })
  var names = [role.slug, 'common']
  return res.status(200).json(names);
}