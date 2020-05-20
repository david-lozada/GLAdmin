// Dependencies

// Stock Model
var { PurchaseOrder, Product, Supplier, PurchaseOrderDet } = require('../models');

// Create Stock
exports.create = async function (req, res) {
    try {
        const data = req.body

    } catch(err) {
        return res.status(500).send(err);
    }
}

/**
 *  Method that creates stock and detail together
 *  @params {data}
 */
/*createStockWithDetail = async function(data) {
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
}*/
/**
 *  Method that updates stock by creating a detail
 *  @params {data}
 */
/*updateStock = async function(idStock, data) {
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
}*/

// Get Stock
exports.getPurchaseOrder = async function(req, res) {
    try {
        let purchaseOrder = await PurchaseOrder.findOne({
            where: { id: req.params.id, available: true },
            include: [ 
                { model: PurchaseOrderDet, as: 'purchaseOrderDet' }
            ]
        });
        console.log(purchaseOrder)
        if (purchaseOrder) {
            return res.status(200).json(purchaseOrder);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all purchase orders
exports.getAllPurchaseOrder = async function(req, res) {
    try {
        let purchaseOrders = await PurchaseOrder.findAll({
          include: [ 
            { model: PurchaseOrderDet, as: 'purchaseOrderDet' }
          ]
        });
        if (purchaseOrders) {
            return res.status(200).json(purchaseOrders);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete purchase order
exports.delete = async function(req, res) {
    try {
        const purchaseOrder = await PurchaseOrder.findOne({
            where: { id: req.params.id }
        })
        const deleted = await purchaseOrder.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Purchase Order has been deleted',
                es: 'El Pedido a Proveedor fue eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update purchase order
exports.update = async function(req, res) {
    try {
        const data = req.body
        let purchaseOrder = await PurchaseOrder.findOne({
            where: { id: req.body.id },
        });
        if (purchaseOrder) {
            updateStock(purchaseOrder.id, data).then((purchaseOrder) => {
                return res.status(200).json({
                    record: purchaseOrder,
                    en: 'Purchase Order has been updated',
                    es: 'Pedido a Proveedor actualizado'
                });
            })
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}