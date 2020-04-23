var express = require('express');
var router = express.Router();

// Require controller modules.
var foreignExchanges_controller = require('../controllers/foreignExchangeController');

// GET me
router.get('/current', foreignExchanges_controller.getForeignExchange);

module.exports = router;
