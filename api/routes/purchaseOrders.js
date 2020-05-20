var express = require('express');
var router = express.Router();

// Require controller modules.
var purchase_order_controller = require('../controllers/purchaseOrderController');

/* POST create stock */
router.post('/create', purchase_order_controller.create);

/* PUT update stock */
router.put('/update', purchase_order_controller.update);

/* GET all stocks */
router.get('/all', purchase_order_controller.getAllPurchaseOrder);

/* GET stock */
router.get('/purchase-order/:id', purchase_order_controller.getPurchaseOrder);

/* DELETE stock */
router.delete('/delete/:id', purchase_order_controller.delete);

module.exports = router;
