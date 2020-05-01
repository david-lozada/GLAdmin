// Dependencies

// Batch Model
var { Batch } = require('../models');

// Create Batch
exports.create = async function (req, res) {
    try {
        let batch = await Batch.create(req.body);
        if (batch) {
            return res.status(201).json({
                record: batch,
                en: 'Batch has been created',
                es: 'Lote creado'
            });
        } else {
            return res.status(500).json({
                en: 'Batch not created',
                es: 'El Lote no fué creado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get Batch
exports.getBatch = async function(req, res) {
    try {
        let batch = await Batch.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'code', 'description']
        });
        if (batch) {
            return res.status(200).json(batch);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all batches
exports.getAllBatches = async function(req, res) {
    try {
        let batches = await Batch.findAll();
        if (batches) {
            return res.status(200).json(batches);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete Batch
exports.delete = async function(req, res) {
    try {
        const batch = await Batch.findOne({
            where: { id: req.params.id }
        })
        const deleted = await batch.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Batch has been deleted',
                es: 'El Lote fue eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update Batch
exports.update = async function(req, res) {
    try {
        let batch = await Batch.findOne({
            where: { id: req.body.id },
        });
        if (batch) {
            batch.update(req.body);
            return res.status(200).json({
                record: batch,
                en: 'Batch has been updated',
                es: 'Lote actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}