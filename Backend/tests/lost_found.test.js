const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;
const lostRoutes = require('../routes/lost');
const foundRoutes = require('../routes/found');
const matchRoutes = require('../routes/match');

const app = express();
app.use(bodyParser());
app.use('/api/lost', lostRoutes);
app.use('/api/found', foundRoutes);
app.use('/api/match', matchRoutes);

// Mock LostItem model
jest.mock('../models/LostItem', () => ({
  create: jest.fn().mockResolvedValue({
    id: 2,
    name: 'Phone',
    description: 'Black phone',
    date: '2024-06-01',
    otherDetails: 'Library',
    image: '/uploads/phone.png'
  }),
  findByPk: jest.fn().mockResolvedValue({
    name: 'Phone',                       // Added name property
    destroy: jest.fn().mockResolvedValue(true)
  }),
  findOne: jest.fn().mockResolvedValue({
    name: 'Phone',                       // Added name property
    destroy: jest.fn().mockResolvedValue(true)
  }),
}));

// Mock FoundItem model
jest.mock('../models/FoundItem', () => ({
  create: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Bag',
    description: 'Blue bag',
    date: '2024-06-01',
    otherDetails: 'Hall',
    image: '/uploads/bag.png'
  }),
  findByPk: jest.fn().mockResolvedValue({
    name: 'Bag',                        // Added name property
    destroy: jest.fn().mockResolvedValue(true)
  }),
  findOne: jest.fn().mockResolvedValue({
    name: 'Bag',                        // Added name property
    destroy: jest.fn().mockResolvedValue(true)
  }),
}));

describe('Lost & Found Routes', () => {
  it('POST /api/lost - should create a lost item', async () => {
    const response = await request(app)
      .post('/api/lost')
      .send({
        name: 'Phone',
        description: 'Black phone',
        date: '2024-01-01',
        otherDetails: 'Near library'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Phone');
  });

  it('POST /api/found - should create a found item', async () => {
    const response = await request(app)
      .post('/api/found')
      .send({
        name: 'Bag',
        description: 'Blue bag',
        date: '2024-01-02',
        otherDetails: 'In hall'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Bag');
  });

  it('DELETE /api/match/lost/:id - should delete a matched lost item', async () => {
    const response = await request(app).delete('/api/match/lost/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('DELETE /api/match/found/:id - should delete a matched found item', async () => {
    const response = await request(app).delete('/api/match/found/2');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});
