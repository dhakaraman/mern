const express = require('express');
const { listProducts } = require('../controllers/product.controller');
const router = express.Router();

router.get('/products', listProducts);

module.exports = router;
