// Dependencies
const bcrypt = require('bcrypt');

// User Model
var { Customer } = require('../models');

// Register User
exports.create = async function (req, res) {
    try {
        let customer = await Customer.create(req.body);
        if (customer) {
            return res.status(201).json({
                record: customer,
                en: 'Customer has been created',
                es: 'Cliente creado'
            });
        } else {
            return res.status(500).json({
                en: 'Customer not created',
                es: 'El cliente no fué creado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get customer
exports.getCustomer = async function(req, res) {
    try {
        let customer = await Customer.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'idCardNumber', 'firstName', 'lastName','email', 'phoneNumber', 'address', 'available']
        });
        if (customer) {
            return res.status(200).json(customer);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all customers
exports.getAllCustomers = async function(req, res) {
    try {
        let customers = await Customer.findAll();
        if (customers) {
            return res.status(200).json(customers);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete record
exports.delete = async function(req, res) {
    try {
        const customer = await Customer.findOne({
            where: { id: req.params.id }
        })
        const deleted = await customer.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Customer has been deleted',
                es: 'El cliente fué eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update customer
exports.update = async function(req, res) {
    try {
        let customer = await Customer.findOne({
            where: { id: req.body.id },
        });
        if (customer) {
            customer.update(req.body);
            return res.status(200).json({
                record: customer,
                en: 'Customer has been updated',
                es: 'Cliente actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}