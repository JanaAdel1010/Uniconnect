const request = require('supertest');
const express = require('express');
const lookupRoutes = require('../routes/lookUp');
const Doctor = require('../models/doctor');
const Place = require('../models/place');
const Session = require('../models/session');

jest.mock('../models/doctor');
jest.mock('../models/place');
jest.mock('../models/session');

const app = express();
app.use(express.json());
app.use('/api/lookup', lookupRoutes);

describe('Lookup API Routes', () => {

  describe('GET /searchDoctor', () => {
    it('should return doctor if found', async () => {
      Doctor.findOne.mockResolvedValue({ name: 'Dr. Laila Kassem', building: 'A', floor: '2' });
      const res = await request(app).get('/api/lookup/searchDoctor?name=Dr.%20Laila%20Kassem');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.doctor.name).toBe('Dr. Laila Kassem');
    });

    it('should return 400 if no name query', async () => {
      const res = await request(app).get('/api/lookup/searchDoctor');
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /searchClassroom', () => {
    it('should return classroom if found', async () => {
      Place.findOne.mockResolvedValue({ name: 'C301', building: 'Main', floor: '3' });
      const res = await request(app).get('/api/lookup/searchClassroom?name=C301');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.classroom.name).toBe('C301');
    });
  });

  describe('GET /searchSession', () => {
    it('should return sessions if found', async () => {
      Session.findAll.mockResolvedValue([
        { name: 'CV', type: 'Lecture', building: 'B', floor: '1', time: '10:00 AM' }
      ]);
      const res = await request(app).get('/api/lookup/searchSession?name=CV');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.sessions.length).toBe(1);
    });
  });
});