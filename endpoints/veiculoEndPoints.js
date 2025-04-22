const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/veiculos.json');

const getVeiculosFromFile = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, '[]');
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

const saveVeiculosToFile = (veiculos) => {
  fs.writeFileSync(dataPath, JSON.stringify(veiculos, null, 2));
};

exports.getAll = (req, res) => {
  const veiculos = getVeiculosFromFile();
  res.json(veiculos);
};

exports.getById = (req, res) => {
  const veiculos = getVeiculosFromFile();
  const veiculo = veiculos.find(v => v.id === req.params.id);
  if (!veiculo) return res.status(404).send('Veículo não encontrado.');
  res.json(veiculo);
};

exports.create = (req, res) => {
  const veiculos = getVeiculosFromFile();
  const newVeiculo = { id: Date.now().toString(), ...req.body };
  veiculos.push(newVeiculo);
  saveVeiculosToFile(veiculos);
  res.status(201).json(newVeiculo);
};

exports.update = (req, res) => {
  const veiculos = getVeiculosFromFile();
  const index = veiculos.findIndex(v => v.id === req.params.id);
  if (index === -1) return res.status(404).send('Veículo não encontrado.');
  veiculos[index] = { id: req.params.id, ...req.body };
  saveVeiculosToFile(veiculos);
  res.json(veiculos[index]);
};

exports.delete = (req, res) => {
  let veiculos = getVeiculosFromFile();
  const index = veiculos.findIndex(v => v.id === req.params.id);
  if (index === -1) return res.status(404).send('Veículo não encontrado.');
  veiculos.splice(index, 1);
  saveVeiculosToFile(veiculos);
  res.status(204).send();
};
