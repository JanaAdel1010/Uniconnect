const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const Place = require('../models/place');
const Session = require('../models/session');


// GET doctors by name query
router.get('/doctor', async (req, res) => {
  try {
    const name = req.query.name || '';
    const doctors = await Doctor.findAll({
      where: { name: { [require('sequelize').Op.like]: `%${name}%` } }
    });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET place by room query
router.get('/place', async (req, res) => {
  try {
    const room = req.query.room || '';
    const places = await Place.findAll({
      where: { room: { [require('sequelize').Op.like]: `%${room}%` } }
    });
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET sessions by name query
router.get('/session', async (req, res) => {
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