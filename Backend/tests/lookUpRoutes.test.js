const express = require('express');
const request = require('supertest');
const lookupRoutes = require('../routes/lookUp');
const Doctor = require('../models/doctor');

jest.mock('../models/doctor');

describe('lookupRoutes - GET /doctors', () => {
    let app;

    beforeEach(() => {
        jest.clearAllMocks();
        app = express();
        app.use(express.json());
        app.use('/api', lookupRoutes);
    });

    it('returns list of doctors', async () => {
        const fakeDoctors = [
            { id: 1, name: 'Dr. Alice' },
            { id: 2, name: 'Dr. Bob' }
        ];

        Doctor.findAll.mockResolvedValue(fakeDoctors);

        const response = await request(app).get('/api/doctors');

        expect(Doctor.findAll).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(fakeDoctors);
    });

    it('handles errors and returns 500 status', async () => {
        Doctor.findAll.mockRejectedValue(new Error('DB Error'));

        const response = await request(app).get('/api/doctors');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});