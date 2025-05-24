const express = require('express');
const request = require('supertest');
const lookupRoutes = require('../routes/lookUp');
const Doctor = require('../models/doctor');
const { Op } = require('sequelize');

jest.mock('../models/doctor');

describe('lookupRoutes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', lookupRoutes);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /searchDoctor', () => {
    it('returns doctor when found', async () => {
      const fakeDoctor = { id: 1, name: 'John Doe' };

      Doctor.findOne.mockResolvedValue(fakeDoctor);

      const response = await request(app).get('/api/searchDoctor?name=John');

      // Check that findOne is called with correct Sequelize query including Op.like symbol
      expect(Doctor.findOne).toHaveBeenCalledTimes(1);
      expect(Doctor.findOne).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.like]: '%John%'
          }
        }
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, doctor: fakeDoctor });
    });

    it('returns 400 if name query missing', async () => {
      const response = await request(app).get('/api/searchDoctor');

      expect(Doctor.findOne).not.toHaveBeenCalled();

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ success: false, msg: 'Enter doctor name' });
    });

    it('returns 500 if error occurs', async () => {
      Doctor.findOne.mockRejectedValue(new Error('DB failure'));

      const response = await request(app).get('/api/searchDoctor?name=John');

      expect(Doctor.findOne).toHaveBeenCalledTimes(1);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ success: false, msg: 'Server error' });
    });
  });

});