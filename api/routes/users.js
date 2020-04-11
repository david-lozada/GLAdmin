var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

/* POST create user */
router.post('/create', user_controller.create);

/* PUT update user */
router.put('/update', user_controller.update);

/* GET current user */
router.get('/current', user_controller.current);

/* GET all users */
router.get('/all', user_controller.getAllUsers);

/* GET user */
router.get('/user/:id', user_controller.getUser);

/* DELETE user */
router.delete('/delete/:id', user_controller.delete);

module.exports = router;
