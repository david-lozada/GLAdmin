/* App Controllers */

// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User, AuthToken } = require('../models');

exports.current = async function (req, res) {
    if (req.headers.authorization !== undefined) {
        token = req.headers.authorization.split(' ')[1]
        let user = await AuthToken.findAll({
            where: {token},
            include: 'User'
        })
        if (user) {
            return res.status(200).json({
                user,
                en: 'User found',
                es: 'Usuario encontrado'
            });
        }
        return res.status(200).json({
            en: 'User does not exists',
            es: 'El usuario no existe'
        });
    }
}

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
        let data = await user.authorize();
        return res.status(201).json({
            data,
            en: 'User has been created',
            es: 'Usuario creado'
        });
    } else {
        return res.status(301).json({
            user,
            en: 'User already exists',
            es: 'El usuario ya existe'
        });
    }
    } catch(err) {
    return res.status(400).send(err);
    }
}