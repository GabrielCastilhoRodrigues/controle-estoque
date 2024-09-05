const connection = require('../config/db');

/**
 * Método que confere se o ID externo que será vinculado, existe na respectiva tabela.
 *
 * @param {*} tableName 
 *   Nome da Tabela que será buscado o ID.
 * @param {*} id 
 *   ID que deve ser buscado.
 *
 * @returns
 *  TRUE se existir, FALSE se não existir.
 */
function checkIdExists(tableName, id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
        connection.query(sql, [id], (err, results) => {
            if (err) {
                return reject(err);
            }

            resolve(results[0].count > 0);
        });
    });
}

module.exports = checkIdExists;