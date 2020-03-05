var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

/* POST create user */
router.post('/create', user_controller.create);

module.exports = router;
