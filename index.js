const express = require('express');
const productRoutes = require('./routes/productRoutes');
const productStockRoutes = require('./routes/productStockRoutes');
const stockLocationRoutes = require('./routes/stockLocationRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para analisar JSON

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/stockLocation', stockLocationRoutes);
app.use('/api/productStock', productStockRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});