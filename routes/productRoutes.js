const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const { productSchema } = require('../validators/productValidator');

// Função de validação
const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Create - Adicionar produto
router.post('/', validateProduct, (req, res) => {
    const product = req.body;
    productModel.createProduct(product, (err, result) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.status(201).json({ id: result.insertId, ...product });
    });
});

// Read - Listar produtos
router.get('/', (req, res) => {
    productModel.getAllProducts((err, results) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// Read - Buscar produto por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    productModel.getProductById(id, (err, results) => {
        if (err)
            return res.status(500).json({ message: err.message });
        if (results.length === 0)
            return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(results[0]);
    });
});

// Update - Atualizar produto
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    productModel.updateProduct(id, product, (err) => {
        if (err)
            return res.status(500).json({ message: err.message });
        res.json({ message: 'Produto atualizado com sucesso' });
    });
});

// Delete - Remover produto
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productModel.deleteProduct(id, (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Produto removido com sucesso' });
    });
});

module.exports = router;