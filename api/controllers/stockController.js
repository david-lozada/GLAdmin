// Dependencies

// Stock Model
var { Stock, Product, Batch, Supplier, StockDet } = require('../models');

// Create Stock
exports.create = async function (req, res) {
    try {
        const data = req.body
        //This async function returns batch id (either created or found) 
        batchCodeToId(data.idBatch).then(async(idBatch) => { 
            createStockWithDetail(data).then((stock) => {
                return res.status(201).json({
                    record: stock,
                    en: 'Stock has been created',
                    es: 'Inventario creado'
                });
            })
            /*try{
                const [stock, created] = await Stock.findOrCreate({
                    where: { idProduct: data.idProduct, idSupplier: data.idSupplier, idBatch: data.idBatch },
                     //Adds id of batch to object
                    defaults: Object.assign(data, { idBatch }),
                });
                if (created) {
                    //Async method to create first detail of stock
                    createStockDetail(res, stock, data).then(async(detail) => {  
                        // Get just created stock in order to get related models
                        const createdStock = await Stock.findOne({
                            where: { id: stock.id },
                            include: [ 
                                { model: Product, as: 'product' },
                                { model: Supplier, as: 'supplier' },
                                { model: Batch, as: 'batch' }
                            ]
                        })
                        Object.assign(createdStock, detail)
                        return res.status(201).json({
                            record: createdStock,
                            en: 'Stock has been created',
                            es: 'Inventario creado'
                        });
                    })
                } else {
                    return res.status(200).json({
                        en: 'Stock already exists',
                        es: 'Inventario ya existente'
                    });
                }
            } catch (err) {
                return res.status(500).send(err);
            }*/
        })
    } catch(err) {
        return res.status(500).send(err);
    }
}

batchCodeToId = async function(code) {
    console.log(code)
    if (!code || code === '') return null
    const [batch, created] = await Batch.findOrCreate({
      where: { code },
      defaults: { code }
    })
    return batch.id
}

createStockWithDetail = async function(data) {
    try {
        const stock = await Stock.create({
            idProduct: data.idProduct,
            idSupplier: data.idSupplier,
            idBatch: data.idBatch,
            existence: data.existence,
            available: data.available,
            stockDet: [{//Association
                type: data.type,
                quantity: data.existence,
                expiryDate: data.expiryDate,
                observation: data.observation, 
            }]
        }, {
          include: [{
            association: Stock.associations.stockDet,
            as: 'stockDet'
          }]
        });
        return stock
    } catch(err) {
        throw err;
    }
}

// Get Stock
exports.getStock = async function(req, res) {
    try {
        let stock = await Stock.findOne({
            where: { id: req.params.id, available: true },
            include: [ 
                { model: Product, as: 'product' },
                { model: Supplier, as: 'supplier' },
                { model: Batch, as: 'batch' },
                { model: StockDet, as: 'stockDet' }
            ]
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
            { model: Supplier, as: 'supplier' },
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