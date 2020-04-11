var express = require('express');
var router = express.Router();

// Require controller modules.
var customer_controller = require('../controllers/customerController');

/* POST create customer */
router.post('/create', customer_controller.create);

/* PUT update customer */
router.put('/update', customer_controller.update);

/* GET all customers */
router.get('/all', customer_controller.getAllCustomers);

/* GET customer */
router.get('/customer/:id', customer_controller.getCustomer);

/* DELETE customer */
router.delete('/delete/:id', customer_controller.delete);

module.exports = router;
