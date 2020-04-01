var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

/* POST create user */
router.post('/create', user_controller.create);

/* GET current user */
router.get('/current', user_controller.current);

/* GET all users */
router.get('/all', user_controller.getAllUsers);

/* GET user */
router.get('/user/:id', user_controller.getUser);

/* DELETE user */
router.get('/delete/:id', user_controller.deleteUser);

module.exports = router;
