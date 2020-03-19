// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User, AuthToken } = require('../models');


// Login User
exports.login = async function (req, res) {
  const { userName, password } = req.body;
  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!userName || !password) {
    return res.status(400).json({
      en: 'Request missing username or password param',
      es: 'Petición no cuenta con usuario o contraseña'
    });
  }
  try {
    let user = await User.authenticate(userName, password)
    return res.json(user);
  } catch (err) {
    return res.status(400).json({
      en: 'invalid username or password',
      es: 'Usuario o contraseña incorrecta'
    });
  }
};

// Logout User
exports.logout = async function(req, res) {
  const token = req.headers.authorization.split(' ')[1]
  if (token) {
    try {
      const authToken = await AuthToken.findOne({
        where: { token }
      })
      await authToken.destroy()
    } catch (error) {
      console.log(error)
    }
  }
}

// Get User Info
exports.me = async function (req, res) {
    if (req.user) {
        return res.send(req.user);
    }
    res.status(404).send(
        { errors: [{ message: 'missing auth token' }] }
    );
}