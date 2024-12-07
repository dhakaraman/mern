const express = require('express');
const { getBarChartData } = require('../controllers/barChart.controller');
const router = express.Router();

router.get('/barchart', getBarChartData);

module.exports = router;
