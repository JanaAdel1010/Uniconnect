const User = require('../models/User');

exports.findPartners = async (req, res) => {
    let { skills = [], interests = [] } = req.body;

    skills = skills.map(s => s.trim().toLowerCase());
    interests = interests.map(i => i.trim().toLowerCase());
    try {
        const users = await User.findAll();
        const noSkillFilter = skills.length === 1 && skills[0] === 'none';
        const noInterestFilter = interests.length === 1 && interests[0] === 'none';

        if (noSkillFilter && noInterestFilter) {
            const allUsers = users.map(user => ({
                username: user.username,
                email: user.email,
                skills: user.skills ? user.skills.split(',').map(s => s.trim()) : [],
                interests: user.interests ? user.interests.split(',').map(i => i.trim()) : [],
                matchScore: 0
            }));
            return res.json(allUsers);
        }

        const matches = users.map(user => {
            const userSkills = (user.skills ? user.skills.split(',') : []).map(skill => skill.trim().toLowerCase());
            const userInterests = (user.interests ? user.interests.split(',') : []).map(interest => interest.trim().toLowerCase());
            let matchedSkills = [];
            let matchedInterests = [];
            if (!noSkillFilter) {
                matchedSkills = userSkills.filter(skill => skills.includes(skill));
            }
            if (!noInterestFilter) {
                matchedInterests = userInterests.filter(interest => interests.includes(interest));
            }
            const totalScore = matchedSkills.length + matchedInterests.length;
            return {
                username: user.username,
                email: user.email,
                skills: userSkills,
                interests: userInterests,
                matchScore: totalScore
            };
        })
            .filter(user => {
                return user.matchScore > 0;
            })
            .sort((a, b) => b.matchScore - a.matchScore);

        res.json(matches);
    } catch (error) {
        console.error('Error finding partners:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};