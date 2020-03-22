// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User, AuthToken } = require('../models');

exports.current = async function (req, res) {
    console.log(req)    
    if (req.headers.authorization !== undefined) {
        token = req.headers.authorization.split(' ')[1]
        let user = await AuthToken.findOne({
            where: { token },
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
            // console.log(user)
            // .then((res) => console.log(res))
            // .catch((err) => console.log(err))
            // let data = await user.authorize();
            return res.status(201).json({
                // data,
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

// Get all users
exports.getAllUsers = async function(req, res) {
    try {
        let users = await User.findAll({
            attributes: ['firstName', 'lastName', 'email', 'idRole', 'available']
        });
        if (users) {
            return res.status(302).json(users);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}