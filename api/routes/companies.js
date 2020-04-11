var express = require('express');
var router = express.Router();

// Require controller modules.
var company_controller = require('../controllers/companyController');

/* POST create company */
router.post('/create', company_controller.create);

/* PUT update company */
router.put('/update', company_controller.update);

/* GET all companies */
router.get('/all', company_controller.getAllCompanies);

/* GET company */
router.get('/company/:id', company_controller.getCompany);

/* DELETE company */
router.delete('/delete/:id', company_controller.delete);

module.exports = router;
