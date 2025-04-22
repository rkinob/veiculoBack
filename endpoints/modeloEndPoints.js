const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/modelos.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath));
const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

exports.getAll = (req, res) => {
  res.json(getData());
};

exports.getById = (req, res) => {
  const modelo = getData().find(m => m.id === req.params.id);
  if (!modelo) return res.status(404).send('Modelo não encontrado.');
  res.json(modelo);
};

exports.create = (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send('Nome do modeloo é obrigatório.');
  const modelos = getData();
  const newModel = { id: Date.now().toString(), nome };
  modelos.push(newModel);
  saveData(modelos);
  res.status(201).json(newModel);
};

exports.update = (req, res) => {
  const modelos = getData();
  const index = modelos.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).send('Modelo não encontrado.');
  modelos[index] = { id: req.params.id, nome: req.body.nome };
  saveData(modelos);
  res.json(modelos[index]);
};

exports.delete = (req, res) => {
  let modelos = getData();
  modelos = modelos.filter(m => m.id !== req.params.id);
  saveData(modelos);
  res.status(204).send();
};
