const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/marcas.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath));
const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

exports.getAll = (req, res) => {
  res.json(getData());
};

exports.getById = (req, res) => {
  const marca = getData().find(b => b.id === req.params.id);
  if (!marca) return res.status(404).send('Marca não encontrada.');
  res.json(marca);
};

exports.create = (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send('Nome da marca é obrigatório.');
  const marcas = getData();
  const newBrand = { id: Date.now().toString(), nome };
  marcas.push(newBrand);
  saveData(marcas);
  res.status(201).json(newBrand);
};

exports.update = (req, res) => {
  const marcas = getData();
  const index = marcas.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).send('Marca não encontrada.');
  marcas[index] = { id: req.params.id, nome: req.body.nome };
  saveData(marcas);
  res.json(marcas[index]);
};

exports.delete = (req, res) => {
  let marcas = getData();
  marcas = marcas.filter(b => b.id !== req.params.id);
  saveData(marcas);
  res.status(204).send();
};