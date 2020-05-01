// Dependencies

// Stock Model
var { Stock, Product, Batch } = require('../models');

// Create Stock
exports.create = async function (req, res) {
    try {
        const data = req.body
        console.log(data)
        const [stock, created] = await User.findOrCreate({
            where: { 
                idProduct: data.idProduct, 
                idSupplier: data.idSupplier, 
                idBatch: data.idBatch 
            },
            defaults: data
        });
        if (created) {
            return res.status(201).json({
                record: stock,
                en: 'Stock has been created',
                es: 'Inventario creado'
            });
        } else {
            return res.status(200).json({
                en: 'Stock already exists',
                es: 'Inventario ya existente'
            });
        }
    } catch(err) {
        return res.status(500).send(err);
    }
}

entry = function(stock) {

}

// Get Stock
exports.getStock = async function(req, res) {
    try {
        let stock = await Stock.findOne({
            where: { id: req.params.id, available: true }
        });
        if (stock) {
            return res.status(200).json(stock);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all stocks
exports.getAllStock = async function(req, res) {
    try {
        let stocks = await Stock.findAll({
          include: [ 
            { model: Product, as: 'product' },
            { model: Batch, as: 'batch' }
          ]
        });
        if (stocks) {
            return res.status(200).json(stocks);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

/**
 *  Function used to add ralated model fields to main object
 */
/*joinModelFields = function(model, fields) {
    const jointObject = {}
    for(let row of model) {
        
    }
}*/

// Delete Stock
exports.delete = async function(req, res) {
    try {
        const stock = await Stock.findOne({
            where: { id: req.params.id }
        })
        const deleted = await stock.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Stock has been deleted',
                es: 'El Inventario fue eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update Stock
exports.update = async function(req, res) {
    try {
        let stock = await Stock.findOne({
            where: { id: req.body.id },
        });
        if (stock) {
            const data = req.body
            stock.update(data);
            return res.status(200).json({
                record: stock,
                en: 'Stock has been updated',
                es: 'Inventario actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}