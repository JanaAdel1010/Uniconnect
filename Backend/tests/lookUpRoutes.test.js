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

        Doctor.findOne.mockResolvedValue(fakeDoctors[0]);
        const response = await request(app).get('/api/doctors');

        expect(Doctor.findOne).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true, doctor: fakeDoctors[0] });
    });

    it('handles errors and returns 500 status', async () => {
        Doctor.findAll.mockRejectedValue(new Error('DB Error'));

        const response = await request(app).get('/api/doctors');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});