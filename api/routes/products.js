var express = require('express');
var router = express.Router();

// Require controller modules.
var product_controller = require('../controllers/productController');

/* POST create product */
router.post('/create', product_controller.create);

/* PUT update product */
router.put('/update', product_controller.update);

/* GET all products */
router.get('/all', product_controller.getAllProducts);

/* GET product */
router.get('/product/:id', product_controller.getProduct);

/* DELETE product */
router.delete('/delete/:id', product_controller.delete);

module.exports = router;
