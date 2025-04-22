const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const should = require('should');
const assert = require('assert'); 

describe('Veículos API', () => {
  const filePath = path.join(__dirname, '../data/veiculos.json');

  beforeEach(() => fs.writeFileSync(filePath, '[]'));

  it('deve criar um veículo', async () => {
    const res = await request(app).post('/veiculos').send({
      placa: 'ABC12345',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modeloId: '1',
      marcaId: '1',
      ano: 2020
    });
    res.status.should.equal(201);
    res.body.should.have.property('placa', 'ABC12345');
  });

  it('deve retornar todos os veículos', async () => {
    await request(app).post('/veiculos').send({
      placa: 'DEF67890',
      chassi: '1HGCM82633A004352',
      renavam: '98765432100',
      modeloId: '2',
      marcaId: '2',
      ano: 2021
    });
    const res = await request(app).get('/veiculos');
    res.status.should.equal(200);
    res.body.should.be.Array().and.have.length(1);
  });

  it('deve retornar um veículo por ID', async () => {
    const { body } = await request(app).post('/veiculos').send({
      placa: 'XYZ12345',
      chassi: '3VWFE21C04M000001',
      renavam: '00011122233',
      modeloId: '3',
      marcaId: '3',
      ano: 2022
    });
    const res = await request(app).get(`/veiculos/${body.id}`);
    res.status.should.equal(200);
    res.body.should.have.property('id', body.id);
  });

  it('deve atualizar um veículo', async () => {
    const { body } = await request(app).post('/veiculos').send({
      placa: 'GHI12345',
      chassi: '2C3KA43R88H326087',
      renavam: '12312312312',
      modeloId: '4',
      marcaId: '4',
      ano: 2019
    });
    const res = await request(app).put(`/veiculos/${body.id}`).send({ placa: 'NEW12345',
        chassi: '3VWFE21C04M000001',
        renavam: '00011122233',
        modeloId: '3',
        marcaId: '3',
        ano: 2022 });
    res.status.should.equal(200);
    res.body.should.have.property('placa', 'NEW12345');
  });

  it('deve deletar um veículo', async () => {
    const { body } = await request(app).post('/veiculos').send({
      placa: 'LMN12345',
      chassi: 'JHMFA16546S000000',
      renavam: '00099988877',
      modeloId: '5',
      marcaId: '5',
      ano: 2018
    });
    const res = await request(app).delete(`/veiculos/${body.id}`);
    res.status.should.equal(204);
  });

  it('deve retornar erro se modeloId não for informado', async () => {
    const res = await request(app).post('/veiculos').send({
      placa: 'ABCDEFGH',
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      marcaId: '1',
      ano: 2020
    });
    should(res.status).be.equal(400);
    

    assert(res.error.text.includes('modelo')); 


  });

  it('deve retornar erro se a placa não tiver 8 caracteres', async () => {
    const res = await request(app).post('/veiculos').send({
      placa: 'ABC123', 
      chassi: '9BWZZZ377VT004251',
      renavam: '12345678901',
      modeloId: '1',
      marcaId: '1',
      ano: 2020
    });
    should(res.status).be.equal(400);
    assert(res.error.text.includes('Placa')); 

  });
});