const db = require('../config/db');

/**
 * Retorna todos os Estoques do Produto.
 *
 * @param {*} callback
 *   Retorno gerado.
 */
const getAllProductsStocks = (callback) => {
    db.query('SELECT * FROM product_stock', callback);
};

/**
 * Retorna o Estoque do Produto que possuí o ID informado.
 *
 * @param {*} id
 *   ID do Estoque do Produto.
 * @param {*} callback 
 *   Retorno gerado.
 */
const getProductStocksById = (id, callback) => {
    db.query('SELECT * FROM product_stock WHERE id = ?', [id], callback);
};

/**
 * Cria um Estoque do Produto.
 *
 * @param {*} product 
 *   Os dados do Estoque do Produto que será criado.
 * @param {*} callback 
 *   O Estoque do Produto criado.
 */
const createProductStocks = (product, callback) => {
    db.query('INSERT INTO product_stock SET ?', product, callback);
};

/**
 * Remove o Estoque do Produto com base do ID.
 * 
 * @param {*} id 
 *   ID do Estoque do Produto.
 * @param {*} callback 
 *   Retorno gerado.
 */
const deleteProductStocks = (id, callback) => {
    db.query('DELETE FROM product_stock WHERE id = ?', [id], callback);
};

module.exports = {
    getAllProductsStocks,
    getProductStocksById,
    createProductStocks,
    deleteProductStocks
};