// Dependencies

// Tax Model
var { Tax } = require('../models');

// Create Tax
exports.create = async function (req, res) {
    try {
        let tax = await Tax.create(req.body);
        if (tax) {
            return res.status(201).json({
                record: tax,
                en: 'Tax has been created',
                es: 'Impuesto creado'
            });
        } else {
            return res.status(500).json({
                en: 'Tax not created',
                es: 'El Impuesto no fué creado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get Tax
exports.getTax = async function(req, res) {
    try {
        let tax = await Tax.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'percentage']
        });
        if (tax) {
            return res.status(200).json(tax);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all taxes
exports.getAllTaxes = async function(req, res) {
    try {
        let taxes = await Tax.findAll();
        if (taxes) {
            return res.status(200).json(taxes);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete Tax
exports.delete = async function(req, res) {
    try {
        const tax = await Tax.findOne({
            where: { id: req.params.id }
        })
        const deleted = await tax.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Tax has been deleted',
                es: 'El Impuesto fue eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update Tax
exports.update = async function(req, res) {
    try {
        let tax = await Tax.findOne({
            where: { id: req.body.id },
        });
        if (tax) {
            tax.update(req.body);
            return res.status(200).json({
                record: tax,
                en: 'Tax has been updated',
                es: 'Impuesto actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}