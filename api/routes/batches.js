var express = require('express');
var router = express.Router();

// Require controller modules.
var batch_controller = require('../controllers/batchController');

/* POST create batch */
router.post('/create', batch_controller.create);

/* PUT update batch */
router.put('/update', batch_controller.update);

/* GET all batches */
router.get('/all', batch_controller.getAllBatches);

/* GET batch */
router.get('/batch/:id', batch_controller.getBatch);

/* DELETE batch */
router.delete('/delete/:id', batch_controller.delete);

module.exports = router;
