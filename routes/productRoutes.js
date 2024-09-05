const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const { productSchema } = require('../validators/productValidator');
const { RETURN_CODES, MESSAGES } = require('../constants');

/**
 * Realiza a validação dos campos do Produto.
 * 
 * @param {*} req 
 *   A requisição que está sendo realizada.
 * @param {*} res 
 *   A resposta da requisição.
 * @param {*} next 
 *   Próxima requisição.
 *
 * @returns
 *   Se os campos da requisição estão válidos ou não.
 */
const validateProduct = (req, res, next) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        return res.status(RETURN_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

/**
 * Realiza a criação do Produto.
 */
router.post('/', validateProduct, (req, res) => {
    const product = req.body;
    productModel.createProduct(product, (err, result) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.status(RETURN_CODES.CREATED).json({ id: result.insertId, ...product });
    });
});

/**
 * Retorna todos os produtos.
 */
router.get('/', (req, res) => {
    productModel.getAllProducts((err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json(results);
    });
});

/**
 * Retorna o produto que possuí o ID informado.
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    productModel.getProductById(id, (err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        if (results.length === 0)
            return res.status(RETURN_CODES.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
        res.json(results[0]);
    });
});

/**
 * Com o ID informado, é localizado o produto e o mesmo é atualizado com os dados informados.
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    productModel.updateProduct(id, product, (err) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json({ message: MESSAGES.PRODUCT_EDIT_SUCESS });
    });
});

/**
 * Remove o Produto correspondente ao ID informado.
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productModel.deleteProduct(id, (err) => {
        if (err) return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
        res.json({ message: MESSAGES.PRODUCT_DELETE_SUCESS });
    });
});

module.exports = router;