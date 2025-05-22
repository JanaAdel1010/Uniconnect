// const { useSyncExternalStore } = require('react');
const db = require('../models/User');

exports.findPartners = async (req, res) => {
    const { skills = [], interests = [] } = req.body;
    try {
        const users = await User.findAll();
        const matches = users.map(
            user => {
                const userSkills = (user.skills ? user.skills.split(',') : []).map(skill => skill.trim().toLowerCase());
                const userInterests = (user.interests ? user.interests.split(',') : []).map(interest => interest.trim().toLowerCase());

                const matchedSkills = userSkills.filter(skill => skills.includes(skill.toLowerCase()));
                const matchedInterests = userInterests.filter(interest => interests.includes(interest.toLowerCase()));

                const totalScore = matchedSkills.length + matchedInterests.length;
                return {
                    username: user.username,
                    email: user.email,
                    skills: userSkills,
                    interests: userInterests,
                    matchScore: totalScore
                };
            }
        )
        .filter(user => user.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);
        res.json(matches);
    } catch (error) {
        console.error('Error finding partners:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};