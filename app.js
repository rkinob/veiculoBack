const express = require('express');
const bodyParser = require('body-parser');
const vehicleRoutes = require('./routes/veiculosRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/veiculos', vehicleRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;
