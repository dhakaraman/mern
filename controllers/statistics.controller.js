const Products = require('../models/product');

const getStatistics = async (req, res, caller = false) => {
  const { month } = req.query;

  try {
    // Convert month name to its 1-based index
    // const monthIndex = new Date(`${month} 1`).getMonth() + 1;

    // Query transactions for the specified month (any year)
    const transactions = await Products.find({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, month], // Match the month, ignoring the year
      },
    });

    // Calculate statistics
    const totalSales = transactions.reduce((sum, t) => sum + t.price, 0);
    const soldItems = transactions.filter(t => t.sold).length;
    const unsoldItems = transactions.length - soldItems;
    if(caller == true){
        return { totalSales, soldItems, unsoldItems };
    }
    else{
        res.status(200).json({ totalSales, soldItems, unsoldItems });
    }
  } catch (error) {
    console.error('Error fetching statistics:', error);
    if(caller == true)
        return {};
    else 
        res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

module.exports = { getStatistics };
