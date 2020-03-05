var express = require('express');
var router = express.Router();

// Require controller modules.
var auth_controller = require('../controllers/authController');

// POST login.
router.post('/login', auth_controller.login);

// POST logout.
router.delete('/logout', auth_controller.logout);

// GET me
router.get('/me', auth_controller.me);

module.exports = router;
