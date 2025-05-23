const { lookupSession } = require('../routes/lookUp');
const Session = require('../models/session');

function createResponse() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('lookUpRoute', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns matching sessions based on query', async () => {
        const fakeSessions = [
            { id: 1, name: 'AI 101', time: '10:00' },
            { id: 2, name: 'ML 102', time: '12:00' }
        ];

        Session.findAll = jest.fn().mockResolvedValue(fakeSessions);

        const req = { query: { name: 'AI' } };
        const res = createResponse();

        await lookupSession(req, res);

        expect(Session.findAll).toHaveBeenCalledTimes(1);
        expect(Session.findAll).toHaveBeenCalledWith({ where: req.query });
        expect(res.json).toHaveBeenCalledWith(fakeSessions);
    });

    it('handles errors and returns 500', async () => {
        Session.findAll = jest.fn().mockRejectedValue(new Error('DB error'));

        const req = { query: {} };
        const res = createResponse();

        await lookupSession(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});