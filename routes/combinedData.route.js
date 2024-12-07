const express = require('express');
const { getCombinedData } = require('../controllers/combineData.controller');
const router = express.Router();

router.get('/combinedata', getCombinedData);

module.exports = router;
