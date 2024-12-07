const axios = require('axios');
const Product = require('../models/product');

const initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Product.deleteMany(); 
    await Product.insertMany(data);
    res.status(200).json({ message: 'Database initialized successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize database' });
  }
};

module.exports = { initializeDatabase };
