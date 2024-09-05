const express = require('express');
const router = express.Router();
const productStockModel = require('../models/productStock');
const { productStockSchema } = require('../validators/productStockValidator');
const { ENTITIES, RETURN_CODES, MESSAGES } = require('../constants');
const checkIdExists = require('../validators/checkExistense');

/**
 * Realiza a validação dos campos do Estoque do Produto.
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
const validateProductSctock = (req, res, next) => {
    const { error } = productStockSchema.validate(req.body);
    if (error) {
        return res.status(RETURN_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

/**
 * Realiza a criação do Estoque do Produto.
 */
router.post('/', validateProductSctock, async (req, res) => {
    const product = req.body;
    console.log(product);

    const productExists = await checkIdExists(ENTITIES.PRODUCT, product.product_id);
    if (!productExists) {
        return res.status(RETURN_CODES.NOT_FOUND).json({
            message: MESSAGES.PRODUCT_NOT_FOUND
        });
    }

    const stockLocationExists =
        await checkIdExists(ENTITIES.STOCK_LOCATION, product.stock_location_id);
    if (!stockLocationExists) {
        return res.status(RETURN_CODES.NOT_FOUND).json({
            message: MESSAGES.STOCK_LOCATION_NOT_FOUND
        });
    }

    productStockModel.createProductStocks(product, (err, result) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.status(201).json({ id: result.insertId, ...product });
    });
});

/**
 * Retorna todos os Estoque do Produto.
 */
router.get('/', (req, res) => {
    productStockModel.getAllProductsStocks((err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json(results);
    });
});

/**
 * Retorna o Estoque do Produto que possuí o ID informado.
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    productStockModel.getProductStocksById(id, (err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        if (results.length === 0)
            return res.status(RETURN_CODES.NOT_FOUND)
                .json({ message: MESSAGES.PRODUCT_STOCK_NOT_FOUND });
        res.json(results[0]);
    });
});

/**
 * Remove o Estoque do Produto correspondente ao ID informado.
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productStockModel.deleteProductStocks(id, (err) => {
        if (err) return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
        res.json({ message: MESSAGES.PRODUCT_STOCK_DELETE_SUCESS });
    });
});

module.exports = router;