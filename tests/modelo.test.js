const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const should = require('should');

describe('Modelos API', () => {
  const filePath = path.join(__dirname, '../data/modelo.json');

  beforeEach(() => fs.writeFileSync(filePath, '[]'));

  it('deve criar um modelo', async () => {
    const res = await request(app).post('/modelos').send({ nome: 'Corolla' });
    res.status.should.equal(201);
    res.body.should.have.property('nome', 'Corolla');
  });

  it('deve retornar todos os modelos', async () => {
    await request(app).post('/modelos').send({ nome: 'Civic' });
    const res = await request(app).get('/modelos');
    res.status.should.equal(200);
    res.body.should.be.Array().and.have.length(1);
  });

  it('deve retornar um modelo por ID', async () => {
    const { body } = await request(app).post('/modelos').send({ nome: 'Onix' });
    const res = await request(app).get(`/modelos/${body.id}`);
    res.status.should.equal(200);
    res.body.should.have.property('nome', 'Onix');
  });

  it('deve atualizar um modelo', async () => {
    const { body } = await request(app).post('/modelos').send({ nome: 'Fiesta' });
    const res = await request(app).put(`/modelos/${body.id}`).send({ nome: 'Fiesta Atualizado' });
    res.status.should.equal(200);
    res.body.should.have.property('nome', 'Fiesta Atualizado');
  });

  it('deve deletar um modelo', async () => {
    const { body } = await request(app).post('/modelos').send({ nome: 'Gol' });
    const res = await request(app).delete(`/modelos/${body.id}`);
    res.status.should.equal(204);
  });
});