/* App Controllers */

// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User } = require('../models');

// Register User
exports.create = async function (req, res) {
    // hash the password provided by the user with bcrypt so that
    // we are never storing plain text passwords. This is crucial
    // for keeping your db clean of sensitive data
    const hash = bcrypt.hashSync(req.body.password, 10);
    try {
    // create a new user with the password hash from bcrypt
    let [user, created] = await User.findOrCreate({
        where: { userName: req.body.userName },
        defaults: Object.assign(req.body, { password: hash })
      });
    if (created) {
        return res.status(201).json({
            en: 'User has been created',
            es: 'Usuario creado'
        });
    } else {
        return res.status(200).json({
            en: 'User already exists',
            es: 'El usuario ya existe'
        });
    }
    } catch(err) {
    return res.status(400).send(err);
    }
}