// routes/found.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const FoundItem = require('../models/FoundItem');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, phone } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';
    const foundItem = await FoundItem.create({ name, description, phone, image });
    res.json(foundItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await FoundItem.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
