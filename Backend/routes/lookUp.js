const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const Place = require('../models/place');
const Session = require('../models/session');

const { Op } = require('sequelize');

// GET doctors by name query
router.get('/searchDoctor', async (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ success: false, msg: 'Enter doctor name' });
  }

  try {
    const doctor = await Doctor.findOne({
      where: {
        name: { [Op.like]: `%${name}%` },
      }
    });

    if (doctor) {
      res.json({ success: true, doctor });
    } else {
      res.json({ success: false, msg: 'Doctor not found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
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
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ success: false, msg: 'Missing name or type' });
  }

  try {
    const sessions = await Session.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      }
    });

    if (sessions.length > 0) {
      res.json({ success: true, sessions });
    } else {
      res.json({ success: false, msg: 'No matching sessions found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

module.exports = router;