const db = require('../config/db');

// Retorna todos os produtos
const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

// Coleta o produto por ID
const getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

// Cria o produto
const createProduct = (product, callback) => {
    db.query('INSERT INTO products SET ?', product, callback);
};

// Atualiza o produto
const updateProduct = (id, product, callback) => {
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], callback);
};

// Deleta o produto
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