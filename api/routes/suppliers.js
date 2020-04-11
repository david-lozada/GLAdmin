var express = require('express');
var router = express.Router();

// Require controller modules.
var supplier_controller = require('../controllers/supplierController');

/* POST create supplier */
router.post('/create', supplier_controller.create);

/* PUT update supplier */
router.put('/update', supplier_controller.update);

/* GET all suppliers */
router.get('/all', supplier_controller.getAllSuppliers);

/* GET supplier */
router.get('/supplier/:id', supplier_controller.getSupplier);

/* DELETE supplier */
router.delete('/delete/:id', supplier_controller.delete);

module.exports = router;
