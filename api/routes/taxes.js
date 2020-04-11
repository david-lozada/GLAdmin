var express = require('express');
var router = express.Router();

// Require controller modules.
var tax_controller = require('../controllers/taxController');

/* POST create tax */
router.post('/create', tax_controller.create);

/* PUT update tax */
router.put('/update', tax_controller.update);

/* GET all taxes */
router.get('/all', tax_controller.getAllTaxes);

/* GET tax */
router.get('/tax/:id', tax_controller.getTax);

/* DELETE tax */
router.delete('/delete/:id', tax_controller.delete);

module.exports = router;
