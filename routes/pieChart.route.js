const express = require('express');
const { getPieChartData } = require('../controllers/pieChart.controller');
const router = express.Router();


router.get('/piechart', getPieChartData);

module.exports = router;
