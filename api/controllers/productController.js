// Dependencies

// Product Model
var { Product } = require('../models');

// Create Product
exports.create = async function (req, res) {
    try {
        let product = await Product.create(req.body);
        if (product) {
            return res.status(201).json({
                record: product,
                en: 'Product has been created',
                es: 'Impuesto creado'
            });
        } else {
            return res.status(500).json({
                en: 'Product not created',
                es: 'El Impuesto no fué creado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get Product
exports.getProduct = async function(req, res) {
    try {
        let product = await Product.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name', 'percentage']
        });
        if (product) {
            return res.status(200).json(product);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Get all products
exports.getAllProducts = async function(req, res) {
    try {
        let products = await Product.findAll();
        if (products) {
            return res.status(200).json(products);
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Delete Product
exports.delete = async function(req, res) {
    try {
        const product = await Product.findOne({
            where: { id: req.params.id }
        })
        const deleted = await product.destroy()
        if (deleted) {
            return res.status(200).json({
                en: 'Product has been deleted',
                es: 'El Impuesto fue eliminado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}

// Update Product
exports.update = async function(req, res) {
    try {
        let product = await Product.findOne({
            where: { id: req.body.id },
        });
        if (product) {
            product.update(req.body);
            return res.status(200).json({
                record: product,
                en: 'Product has been updated',
                es: 'Impuesto actualizado'
            });
        }
    } catch(err) {
        return res.status(400).send(err);
    }
}