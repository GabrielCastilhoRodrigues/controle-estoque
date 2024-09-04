const joi = require('joi');

// Definir o esquema de validação para o produto
const productSchema = joi.object({
    name: joi.string().min(1).max(255).required(),
    quantity: joi.number().integer().min(0).required(),
    price: joi.number().precision(2).positive().required()
});

module.exports = {
    productSchema
};
