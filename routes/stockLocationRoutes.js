const express = require('express');
const router = express.Router();
const stockLocationModel = require('../models/stockLocation');
const { stockLocationSchema } = require('../validators/stockLocationValidator');
const { RETURN_CODES, MESSAGES } = require('../constants');
const { checkRegisterExists } = require('../validators/checkExistense');

/**
 * Realiza a validação dos campos do Local de estoque.
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
const validateStockLocation = (req, res, next) => {
    const { error } = stockLocationSchema.validate(req.body);
    if (error) {
        return res.status(RETURN_CODES.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
};

/**
 * Realiza a criação do Local de estoque.
 */
router.post('/', validateStockLocation, (req, res) => {
    const product = req.body;
    stockLocationModel.createStockLocation(product, (err, result) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.status(RETURN_CODES.CREATED).json({ id: result.insertId, ...product });
    });
});

/**
 * Retorna todos os Local de estoque.
 */
router.get('/', (req, res) => {
    stockLocationModel.getAllStockLocation((err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json(results);
    });
});

/**
 * Retorna o Local de estoque que possuí o ID informado.
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    stockLocationModel.getStockLocationById(id, (err, results) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        if (results.length === 0)
            return res.status(RETURN_CODES.NOT_FOUND)
                .json({ message: MESSAGES.STOCK_LOCATION_NOT_FOUND });
        res.json(results[0]);
    });
});

/**
 * Com o ID informado, é localizado o Local de estoque e o mesmo é atualizado com os dados
 * informados.
 */
router.put('/:id', validateStockLocation, (req, res) => {
    const { id } = req.params;
    const product = req.body;
    stockLocationModel.updateStockLocation(id, product, (err) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json({ message: MESSAGES.STOCK_LOCATION_EDIT_SUCESS });
    });
});

/**
 * Remove o Local de estoque correspondente ao ID informado.
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const existsProductStock = await checkRegisterExists('stock_location_id', id);
    if (existsProductStock) {
        return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: MESSAGES.PRODUCT_CANNOT_DELETE_STOCK_EXISTS });
    }

    stockLocationModel.deleteStockLocation(id, (err) => {
        if (err)
            return res.status(RETURN_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        res.json({ message: MESSAGES.STOCK_LOCATION_DELETE_SUCESS });
    });
});

module.exports = router;