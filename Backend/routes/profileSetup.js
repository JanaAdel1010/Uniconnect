const express = require('express');
const router = express.Router();
const { updateProfile, updateAvailability } = require('../controllers/profileSetupForFindingPartnerConroller');

router.post('/set-profile', updateProfile);
router.post('/update-availability', updateAvailability);

module.exports = router;