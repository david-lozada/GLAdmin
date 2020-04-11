// Dependencies
const bcrypt = require('bcrypt');

// Supplier Model
var { Supplier } = require('../models');

// Create Supplier
exports.create = async function (req, res) {
    try {
        let supplier = await Supplier.create(req.body);
        if (supplier) {
            return res.status(201).json({
                record: supplier,
                en: 'Supplier has been created',
                es: 'Proveedor creado'
            });
        } else {
            return res.status(500).json({
                en: 'Supplier not created',
                es: 'El Proveedor no fué creado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get supplier
exports.getSupplier = async function(req, res) {
    try {
        let supplier = await Supplier.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'documentNumber', 'companyName', 'firstName', 'lastName','email', 'phoneNumber', 'address', 'available']
        });
        if (supplier) {
            return res.status(200).json(supplier);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all suppliers
exports.getAllSuppliers = async function(req, res) {
    try {
        let suppliers = await Supplier.findAll();
        if (suppliers) {
            return res.status(200).json(suppliers);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete supplier
exports.delete = async function(req, res) {
    try {
        const supplier = await Supplier.findOne({
            where: { id: req.params.id }
        })
        const deleted = await supplier.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Supplier has been deleted',
                es: 'El proveedor fué eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update supplier
exports.update = async function(req, res) {
    try {
        let supplier = await Supplier.findOne({
            where: { id: req.body.id },
        });
        if (supplier) {
            supplier.update(req.body);
            return res.status(200).json({
                record: supplier,
                en: 'Supplier has been updated',
                es: 'Proveedor actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}