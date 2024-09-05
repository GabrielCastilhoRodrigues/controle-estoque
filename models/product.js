const db = require('../config/db');

/**
 * Retorna todos os Produtos.
 *
 * @param {*} callback
 *   Retorno gerado.
 */
const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

/**
 * Retorna o Produto que possuí o ID informado.
 *
 * @param {*} id
 *   ID do Produto.
 * @param {*} callback 
 *   Retorno gerado.
 */
const getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

/**
 * Cria um Produto.
 *
 * @param {*} product 
 *   Os dados do Produto que será criado.
 * @param {*} callback 
 *   O Produto criado.
 */
const createProduct = (product, callback) => {
    db.query('INSERT INTO products SET ?', product, callback);
};

/**
 * Atualiza o Produto com base dos dados informados.
 *
 * @param {*} id 
 *   ID do Produto.
 * @param {*} product 
 *   Dados do Produto para atualizar.
 * @param {*} callback 
 *   Produto atualizado.
 */
const updateProduct = (id, product, callback) => {
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], callback);
};

/**
 * Remove o Produto com base do ID.
 * 
 * @param {*} id 
 *   ID do Produto.
 * @param {*} callback 
 *   Retorno gerado.
 */
const deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};