var express = require('express');
var router = express.Router();

// Require controller modules.
var role_controller = require('../controllers/roleController');

// GET me
router.get('/all', role_controller.getAll);

module.exports = router;
