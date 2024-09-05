// Variáveis para realizar conexão
const mysql = require('mysql2');
require('dotenv').config();

// Gera a conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
});

module.exports = connection;