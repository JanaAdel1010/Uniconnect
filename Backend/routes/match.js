const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// DELETE matched pair (based on best match)
router.delete('/:mode/:id', async (req, res) => {
  const { mode, id } = req.params;

  try {
    if (mode === 'lost') {
      const lostItem = await LostItem.findByPk(id);
      if (!lostItem) {
        return res.status(404).json({ error: 'Lost item not found' });
      }

      const foundMatch = await FoundItem.findOne({ where: { name: lostItem.name } });
      if (!foundMatch) {
        return res.status(404).json({ error: 'Matching found item not found' });
      }

      await foundMatch.destroy();
      await lostItem.destroy();

    } else if (mode === 'found') {
      const foundItem = await FoundItem.findByPk(id);
      if (!foundItem) {
        return res.status(404).json({ error: 'Found item not found' });
      }

      const lostMatch = await LostItem.findOne({ where: { name: foundItem.name } });
      if (!lostMatch) {
        return res.status(404).json({ error: 'Matching lost item not found' });
      }

      await lostMatch.destroy();
      await foundItem.destroy();

    } else {
      return res.status(400).json({ error: 'Invalid mode' });
    }

    res.status(200).json({ message: 'Match confirmed and both items removed.' });

  } catch (err) {
    console.error('DELETE /api/match/:mode/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
