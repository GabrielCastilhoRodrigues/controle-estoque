const joi = require('joi');
const { PRODUCT_VALIDATIONS } = require('../constants');

// Definir o esquema de validação para o produto
const productSchema = joi.object({
    name: joi.string().min(1).max(255).required().messages({
        'string.empty': PRODUCT_VALIDATIONS.NAME_BLANK
    }),
    price: joi.number().min(1).precision(2).positive().required().messages({
        'number.base': PRODUCT_VALIDATIONS.PRICE_ZERO_OR_NULL,
        'number.empty': PRODUCT_VALIDATIONS.PRICE_ZERO_OR_NULL,
        'number.min': PRODUCT_VALIDATIONS.PRICE_NEGATIVE,
    })
});

module.exports = {
    productSchema
};
