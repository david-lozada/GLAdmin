// Dependencies

// Stock Model
var { Stock, Product, Batch, Supplier, StockDet } = require('../models');

// Create Stock
exports.create = async function (req, res) {
    try {
        const data = req.body
        //This async function returns batch id (either created or found) 
        batchCodeToId(data.idBatch).then(async(idBatch) => {
            //foundStock: looks for stock where parameters match
            const stockFound = await Stock.findOne({ where: { idProduct: data.idProduct, idSupplier: data.idSupplier, idBatch } }) 
            //Check if stock was found
            if (stockFound) { 
                updateStock(stockFound.id, data).then((stock) => {
                    return res.status(200).json({
                        record: stock,
                        en: 'Stock has been updated',
                        es: 'Inventario actualizado'
                    });
                })
            } else {
                Object.assign(data, { idBatch })
                //Method that creates stock and detail together
                createStockWithDetail(data).then(async(stock) => {
                    // Get just created stock in order to get related models
                    const createdStock = await Stock.findOne({
                        where: { id: stock.id },
                        include: [ 
                            { model: Product, as: 'product' },
                            { model: Supplier, as: 'supplier' },
                            { model: Batch, as: 'batch' },
                            { model: StockDet, as: 'stockDet' }
                        ]
                    })
                    return res.status(201).json({
                        record: createdStock,
                        en: 'Stock has been created',
                        es: 'Inventario creado'
                    });
                })
            }
        })
    } catch(err) {
        return res.status(500).send(err);
    }
}
/**
 *  This async function returns batch id (either created or found) 
 *  @params {code}
 */
batchCodeToId = async function(code) {
    console.log(code)
    try {
        if (!code || code === '') return null
        const [batch, created] = await Batch.findOrCreate({
          where: { code },
          defaults: { code }
        })
        return batch.id
    } catch(err) {
        console.log(err)
    }
}

/**
 *  Method that creates stock and detail together
 *  @params {data}
 */
createStockWithDetail = async function(data) {
    try {
        const stock = await Stock.create({
            idProduct: data.idProduct,
            idSupplier: data.idSupplier,
            idBatch: data.idBatch,
            existence: data.existence,
            available: true, 
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
/**
 *  Method that updates stock by creating a detail
 *  @params {data}
 */
updateStock = async function(idStock, data) {
    try {
        const stockDet = await StockDet.create({
            idStock: idStock,
            type: data.type,
            quantity: data.existence,
            expiryDate: data.expiryDate,
            observation: data.observation,
        });
        const stock = await Stock.findOne({ 
            where: { id: idStock },
            include: [ 
                { model: Product, as: 'product' },
                { model: Supplier, as: 'supplier' },
                { model: Batch, as: 'batch' },
                { model: StockDet, as: 'stockDet' }
            ]
        })
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
        console.log(stock)
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
        const data = req.body
        let stock = await Stock.findOne({
            where: { id: req.body.id },
        });
        if (stock) {
            updateStock(stock.id, data).then((stock) => {
                return res.status(200).json({
                    record: stock,
                    en: 'Stock has been updated',
                    es: 'Inventario actualizado'
                });
            })
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}