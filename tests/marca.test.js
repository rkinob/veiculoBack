const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const should = require('should');

describe('Marcas API', () => {
  const filePath = path.join(__dirname, '../data/marcas.json');

  beforeEach(() => fs.writeFileSync(filePath, '[]'));

  it('deve criar uma marca', async () => {
    const res = await request(app).post('/marcas').send({ nome: 'Toyota' });
    res.status.should.equal(201);
    res.body.should.have.property('nome', 'Toyota');
  });

  it('deve retornar todas as marcas', async () => {
    await request(app).post('/marcas').send({ nome: 'Ford' });
    const res = await request(app).get('/marcas');
    res.status.should.equal(200);
    res.body.should.be.Array().and.have.length(1);
  });

  it('deve retornar uma marca por ID', async () => {
    const { body } = await request(app).post('/marcas').send({ nome: 'Chevrolet' });
    const res = await request(app).get(`/marcas/${body.id}`);
    res.status.should.equal(200);
    res.body.should.have.property('nome', 'Chevrolet');
  });

  it('deve atualizar uma marca', async () => {
    const { body } = await request(app).post('/marcas').send({ nome: 'BMW' });
    const res = await request(app).put(`/marcas/${body.id}`).send({ nome: 'BMW Atualizada' });
    res.status.should.equal(200);
    res.body.should.have.property('nome', 'BMW Atualizada');
  });

  it('deve deletar uma marca', async () => {
    const { body } = await request(app).post('/marcas').send({ nome: 'Audi' });
    const res = await request(app).delete(`/marcas/${body.id}`);
    res.status.should.equal(204);
  });
});