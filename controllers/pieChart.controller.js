const Products = require('../models/product');

const getPieChartData = async (req, res, caller = false) => {
  const { month } = req.query;

  try {
    const transactions = await Products.find({
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, month], // Match the month, ignoring the year
        },
      });

    const categoryCounts = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    if(caller == true)
        return categoryCounts;
    else
        res.status(200).json(categoryCounts);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    if(caller == true)
        return {}
    else
        res.status(500).json({ error: 'Failed to fetch pie chart data' });
  }
};

module.exports = { getPieChartData };
