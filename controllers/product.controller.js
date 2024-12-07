const Products = require('../models/product');

const listProducts = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;

  try {
    // Convert month name to its 1-based index
    // const monthIndex = new Date(`${month} 1`).getMonth() + 1;

    const query = {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, month], // Match the month, ignoring the year
      },
    };

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { price: parseFloat(search) || 0 },
      ];
    }

    const transactions = await Products.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = { listProducts };
