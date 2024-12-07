const express = require('express');
const { getStatistics } = require('../controllers/statistics.controller');
const router = express.Router();

router.get('/statistics', getStatistics);

module.exports = router;
