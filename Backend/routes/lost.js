const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const LostItem = require('../models/LostItem');

// POST: Create lost item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, phone, lostDate, extra } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';

    const item = await LostItem.create({ name, description, phone, image });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: List all lost items
router.get('/', async (req, res) => {
  try {
    const items = await LostItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
