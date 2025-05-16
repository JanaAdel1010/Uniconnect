const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password, skills, interests } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user record
    await User.create({
      username,
      email,
      password: hashedPassword,
      skills,
      interests
    });

    res.status(201).json({ msg: 'User registered successfully' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
