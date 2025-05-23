const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const { email, skills, interests, available } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.skills = skills;
        user.interests = interests;
        user.available = available;
        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateAvailability = async (req, res) => {
    const { email, available } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.available = available;
        await user.save();

        res.json({ message: 'Availability updated successfully' });
    } catch (err) {
        console.error('Update availability error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};