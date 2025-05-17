const express = require('express');
const router = express.Router();
const { findPartners } = require('../controllers/partnerFinderController');

router.post('/find-partners', findPartners);

module.exports = router;