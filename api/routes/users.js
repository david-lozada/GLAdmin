var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

/* POST create user */
router.post('/create', user_controller.create);

/* POST create user */
router.get('/user', user_controller.current);

module.exports = router;
