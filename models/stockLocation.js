const db = require('../config/db');

/**
 * Retorna todos os Locais de Estoque.
 *
 * @param {*} callback
 *   Retorno gerado.
 */
const getAllStockLocation = (callback) => {
    db.query('SELECT * FROM stock_location', callback);
};

/**
 * Retorna o Local de Estoque que possuí o ID informado.
 *
 * @param {*} id
 *   ID do Local de Estoque.
 * @param {*} callback 
 *   Retorno gerado.
 */
const getStockLocationById = (id, callback) => {
    db.query('SELECT * FROM stock_location WHERE id = ?', [id], callback);
};

/**
 * Cria um Local de Estoque.
 *
 * @param {*} product 
 *   Os dados do Local de Estoque que será criado.
 * @param {*} callback 
 *   O Local de Estoque criado.
 */
const createStockLocation = (product, callback) => {
    db.query('INSERT INTO stock_location SET ?', product, callback);
};

/**
 * Atualiza o Local de Estoque com base dos dados informados.
 *
 * @param {*} id 
 *   ID do Local de Estoque.
 * @param {*} product 
 *   Dados do Local de Estoque para atualizar.
 * @param {*} callback 
 *   Local de Estoque atualizado.
 */
const updateStockLocation = (id, product, callback) => {
    db.query('UPDATE stock_location SET ? WHERE id = ?', [product, id], callback);
};

/**
 * Remove o Local de Estoque com base do ID.
 * 
 * @param {*} id 
 *   ID do Local de Estoque.
 * @param {*} callback 
 *   Retorno gerado.
 */
const deleteStockLocation = (id, callback) => {
    db.query('DELETE FROM stock_location WHERE id = ?', [id], callback);
};

module.exports = {
    getAllStockLocation,
    getStockLocationById,
    createStockLocation,
    updateStockLocation,
    deleteStockLocation
};