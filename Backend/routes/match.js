const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const FoundItem = require('../models/FoundItem');

// DELETE matched pair (based on best match)
router.delete('/:mode/:id', async (req, res) => {
  const { mode, id } = req.params;

  try {
    if (mode === 'lost') {
      // A lost item user found a match → delete both
      const lostItem = await LostItem.findByPk(id);
      const foundMatch = await FoundItem.findOne({ where: { name: lostItem.name } }); // simple match logic
      if (foundMatch) await foundMatch.destroy();
      await lostItem.destroy();
    } else {
      // A found item user found the owner → delete both
      const foundItem = await FoundItem.findByPk(id);
      const lostMatch = await LostItem.findOne({ where: { name: foundItem.name } });
      if (lostMatch) await lostMatch.destroy();
      await foundItem.destroy();
    }

    res.status(200).json({ message: "Match confirmed and both items removed." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;