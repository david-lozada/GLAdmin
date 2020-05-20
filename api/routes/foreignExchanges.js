var express = require('express');
var router = express.Router();

// Require controller modules.
var foreignExchanges_controller = require('../controllers/foreignExchangeController');

// GET lastest foreign exchange
router.get('/current', foreignExchanges_controller.getForeignExchange);
// GET me
router.post('/create', foreignExchanges_controller.create);

module.exports = router;
