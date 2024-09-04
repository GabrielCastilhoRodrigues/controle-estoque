const express = require('express');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para analisar JSON

// Rotas
app.use('/api/products', productRoutes);

/**Hello word 
app.get('/', (req, res) =>{
    res.send('Hello World');
});
*/

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});