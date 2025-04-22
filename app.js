const express = require('express');
const bodyParser = require('body-parser');
const veiculoRoutes = require('./routes/veiculosRoutes');
const marcaRoutes = require('./routes/marcasRoutes');
const modeloRoutes = require('./routes/modelosRoutes');


const app = express();
app.use(bodyParser.json());

app.use('/veiculos', veiculoRoutes);
app.use('/marcas', marcaRoutes);
app.use('/modelos', modeloRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;
