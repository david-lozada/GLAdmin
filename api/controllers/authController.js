// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User } = require('../models');


// Login User
exports.login = async function (req, res) {
  
    const { userName, password } = req.body;
  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!userName || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }
  try {
    let user = await User.authenticate(userName, password)
    console.log(user);
    user = await user.authorize();
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
    // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const { user, cookies: { auth_token: authToken } } = req

  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send()
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send(
    { errors: [{ message: 'not authenticated' }] }
  );
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