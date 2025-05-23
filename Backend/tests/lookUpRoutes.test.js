const express = require('express');
const request = require('supertest');
const lookupRoutes = require('../routes/lookUp');
const Doctor = require('../models/doctor');
const Place = require('../models/place');
const Session = require('../models/session');
const { Op } = require('sequelize');

jest.mock('../models/doctor');
jest.mock('../models/place');
jest.mock('../models/session');

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

  // searchDoctor
  describe('GET /searchDoctor', () => {
    it('returns doctor when found', async () => {
      const fakeDoctor = { id: 1, name: 'John Doe' };

      Doctor.findOne.mockResolvedValue(fakeDoctor);

      const response = await request(app).get('/api/searchDoctor?name=John');

      expect(Doctor.findOne).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.like]: `%John%`
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

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ success: false, msg: 'Server error' });
    });
  });

  // searchClassroom
  describe('GET /searchClassroom', () => {
    it('returns classroom when found', async () => {
      const fakeClassroom = { id: 1, name: 'Room 101' };

      Place.findOne.mockResolvedValue(fakeClassroom);

      const response = await request(app).get('/api/searchClassroom?name=Room');

      expect(Place.findOne).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.like]: `%Room%`
          }
        }
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, classroom: fakeClassroom });
    });

    it('returns 400 if name query missing', async () => {
      const response = await request(app).get('/api/searchClassroom');

      expect(Place.findOne).not.toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ success: false, msg: 'Enter classroom name' });
    });

    it('returns 500 if error occurs', async () => {
      Place.findOne.mockRejectedValue(new Error('DB failure'));

      const response = await request(app).get('/api/searchClassroom?name=Room');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ success: false, msg: 'Server error' });
    });
  });

  // searchSession
  describe('GET /searchSession', () => {
    it('returns session when found', async () => {
      const fakeSession = { id: 1, name: 'AI Workshop' };

      Session.findOne.mockResolvedValue(fakeSession);

      const response = await request(app).get('/api/searchSession?name=AI');

      expect(Session.findOne).toHaveBeenCalledWith({
        where: {
          name: {
            [Op.like]: `%AI%`
          }
        }
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, session: fakeSession });
    });

    it('returns 400 if name query missing', async () => {
      const response = await request(app).get('/api/searchSession');

      expect(Session.findOne).not.toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ success: false, msg: 'Enter session name' });
    });

    it('returns 500 if error occurs', async () => {
      Session.findOne.mockRejectedValue(new Error('DB failure'));

      const response = await request(app).get('/api/searchSession?name=AI');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ success: false, msg: 'Server error' });
    });
  });
});