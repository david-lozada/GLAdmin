var express = require('express');
var router = express.Router();

// Require controller modules.
var stock_controller = require('../controllers/stockController');

/* POST create stock */
router.post('/create', stock_controller.create);

/* PUT update stock */
router.put('/update', stock_controller.update);

/* GET all stocks */
router.get('/all', stock_controller.getAllStock);

/* GET stock */
router.get('/stock/:id', stock_controller.getStock);

/* DELETE stock */
router.delete('/delete/:id', stock_controller.delete);

module.exports = router;
