const joi = require('joi');

// Definir o esquema de validação para o Estoque do Produto.
const productStockSchema = joi.object({
    product_id: joi.number().integer().min(1).required(),
    stock_location_id: joi.number().integer().min(1).required(),
    quantity: joi.number().integer().min(0).required()
});

module.exports = {
    productStockSchema
};
