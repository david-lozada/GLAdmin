// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { User, AuthToken } = require('../models');

exports.current = async function (req, res) {
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
    try {
        // hash the password provided by the user with bcrypt so that
        // we are never storing plain text passwords. This is crucial
        // for keeping your db clean of sensitive data
        const hash = bcrypt.hashSync(req.body.password, 10);
        // create a new user with the password hash from bcrypt
        let [user, created] = await User.findOrCreate({
            where: { userName: req.body.userName },
            defaults: Object.assign(req.body, { password: hash })
            });
        if (created) {
            delete user.password
            return res.status(201).json({
                record: user,
                en: 'User has been created',
                es: 'Usuario creado'
            });
        } else {
            return res.status(301).json({
                record: user,
                en: 'User already exists',
                es: 'El usuario ya existe'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get user
exports.getUser = async function(req, res) {
    try {
        let user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'firstName', 'lastName', 'userName','email', 'idRole', 'available']
        });
        if (user) {
            return res.status(200).json(user);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all users
exports.getAllUsers = async function(req, res) {
    try {
        let users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName', 'email', 'idRole', 'available']
        });
        if (users) {
            return res.status(200).json(users);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all users
exports.delete = async function(req, res) {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        })
        const deleted = await user.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'User has been deleted',
                es: 'El usuario fué eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update user
exports.update = async function(req, res) {
    try {
        let user = await User.findOne({
            where: { id: req.body.id },
        });
        if (user) {
            user.update(req.body);
            return res.status(200).json({
                record: user,
                en: 'User has been updated',
                es: 'Usuario actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}