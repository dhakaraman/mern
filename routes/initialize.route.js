const express = require('express');
const { initializeDatabase } = require('../controllers/initialize.controller');
const router = express.Router();

router.get('/initialize', initializeDatabase);

module.exports = router;
