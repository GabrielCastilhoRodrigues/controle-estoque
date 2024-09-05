const joi = require('joi');

// Definir o esquema de validação para o Local de Estoque.
const stockLocationSchema = joi.object({
    name: joi.string().min(1).max(255).required()
});

module.exports = {
    stockLocationSchema
};
