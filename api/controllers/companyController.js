// Dependencies
const bcrypt = require('bcrypt');

// Company Model
var { Company } = require('../models');

// Create Company
exports.create = async function (req, res) {
    try {
        const companies = await Company.findAll()
        if (companies.length >= 1) { 
            return res.status(200).json({
                en: 'Required company has been created already',
                es: 'La empresa requerida ya fue creada'
            }); 
        }
        let company = await Company.create(req.body);
        if (company) {
            return res.status(201).json({
                record: company,
                en: 'Company has been created',
                es: 'Empresa creada'
            });
        } else {
            return res.status(500).json({
                en: 'Company not created',
                es: 'La Empresa no fué creada'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get Company
exports.getCompany = async function(req, res) {
    try {
        let company = await Company.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'documentNumber', 'name','email', 'phoneNumber', 'address', 'website']
        });
        if (company) {
            return res.status(200).json(company);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all companies
exports.getAllCompanies = async function(req, res) {
    try {
        let companies = await Company.findAll();
        if (companies) {
            return res.status(200).json(companies);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete Company
exports.delete = async function(req, res) {
    try {
        const company = await Company.findOne({
            where: { id: req.params.id }
        })
        const deleted = await company.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Company has been deleted',
                es: 'La Empresa fué eliminada'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update Company
exports.update = async function(req, res) {
    try {
        let company = await Company.findOne({
            where: { id: req.body.id },
        });
        if (company) {
            company.update(req.body);
            return res.status(200).json({
                record: company,
                en: 'Company has been updated',
                es: 'Empresa actualizada'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}