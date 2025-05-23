const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const Place = require('../models/place');
const Session = require('../models/session');


// GET doctors by name query
router.get('/searchDoctor', async (req, res) => {
  try {
    const name = req.query.name;
    const doctor = await Doctor.findOne({ where: { name } });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET place by room query
router.get('/searchClassroom', async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ success: false, msg: 'Missing classroom name' });
  }

  try {
    const classroom = await Place.findOne({
      where: {
        name: name
      }
    });

    if (classroom) {
      res.json({ success: true, classroom });
    } else {
      res.json({ success: false, msg: 'Classroom not found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

// GET sessions by name query
router.get('/searchSession', async (req, res) => {
  try {
    const name = req.query.name || '';
    const sessions = await Session.findAll({
      where: { name: { [require('sequelize').Op.like]: `%${name}%` } }
    });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;