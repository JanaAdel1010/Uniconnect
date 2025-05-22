const { findPartners } = require('../controllers/partnerFinderController');
const User = require('../models/User');

function createResponse() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('partnerFinderController - findPartners', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns matched users sorted by total match score', async () => {
        const fakeUsers = [
            {
                username: 'alice',
                email: 'alice@example.com',
                skills: 'JavaScript,Node.js',
                interests: 'music,reading'
            },
            {
                username: 'bob',
                email: 'bob@example.com',
                skills: 'Python,Java',
                interests: 'sports,movies'
            },
            {
                username: 'carol',
                email: 'carol@example.com',
                skills: null,
                interests: 'music,travel'
            }
        ];

        User.findAll = jest.fn().mockResolvedValue(fakeUsers);
        const req = {
            body: {
                skills: ['javascript', 'python'],
                interests: ['music']
            }
        };

        const res = createResponse();

        await findPartners(req, res);

        expect(User.findAll).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledTimes(1);

        const matches = res.json.mock.calls[0][0];

        expect(matches).toEqual([
            expect.objectContaining({ username: 'alice', matchScore: 2 }),
            expect.objectContaining({ username: 'bob', matchScore: 1 }),
            expect.objectContaining({ username: 'carol', matchScore: 1 }),
        ]);
    });

    it('returns empty array when no matches found', async () => {
        User.findAll = jest.fn().mockResolvedValue([
            { username: 'dave', skills: 'C++', interests: 'chess', email: 'dave@example.com' }
        ]);

        const req = {
            body: {
                skills: ['python'],
                interests: ['football']
            }
        };

        const res = createResponse();

        await findPartners(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('handles errors and returns 500 status', async () => {
        User.findAll = jest.fn().mockRejectedValue(new Error('DB failure'));

        const req = { body: {} };
        const res = createResponse();

        await findPartners(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
