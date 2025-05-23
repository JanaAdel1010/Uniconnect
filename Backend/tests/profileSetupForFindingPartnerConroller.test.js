const { updateProfile, updateAvailability } = require('../controllers/profileSetupForFindingPartnerConroller');
const User = require('../models/User');

function createResponse() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('profileSetupForFindingPartnerController - updateProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('updates user profile and returns success message', async () => {
        const saveMock = jest.fn().mockResolvedValue(true);

        const fakeUser = {
            email: 'john@example.com',
            save: saveMock,
        };

        jest.spyOn(User, 'findOne').mockResolvedValue(fakeUser);

        const req = {
            body: {
                email: 'john@example.com',
                skills: 'JavaScript,Node.js',
                interests: 'music,reading',
                available: true,
            },
        };

        const res = createResponse();

        await updateProfile(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
        expect(fakeUser.skills).toBe('JavaScript,Node.js');
        expect(fakeUser.interests).toBe('music,reading');
        expect(fakeUser.available).toBe(true);
        expect(saveMock).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Profile updated successfully' });
    });

    it('returns 404 if user not found', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        const req = { body: { email: 'missing@example.com' } };
        const res = createResponse();

        await updateProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('returns 500 if an error occurs', async () => {
        jest.spyOn(User, 'findOne').mockRejectedValue(new Error('DB error'));

        const req = { body: { email: 'john@example.com' } };
        const res = createResponse();

        await updateProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});

describe('profileSetupForFindingPartnerController - updateAvailability', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('updates user availability and returns success message', async () => {
        const saveMock = jest.fn().mockResolvedValue(true);

        const fakeUser = {
            email: 'john@example.com',
            save: saveMock,
        };

        jest.spyOn(User, 'findOne').mockResolvedValue(fakeUser);

        const req = {
            body: {
                email: 'john@example.com',
                available: false,
            },
        };

        const res = createResponse();

        await updateAvailability(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
        expect(fakeUser.available).toBe(false);
        expect(saveMock).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({ message: 'Availability updated successfully' });
    });

    it('returns 404 if user not found', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        const req = { body: { email: 'notfound@example.com' } };
        const res = createResponse();

        await updateAvailability(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('returns 500 if an error occurs', async () => {
        jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Unexpected error'));

        const req = { body: { email: 'john@example.com' } };
        const res = createResponse();

        await updateAvailability(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
});
