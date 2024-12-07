const { getStatistics } = require('./statistics.controller');
const { getBarChartData } = require('./barChart.controller');
const { getPieChartData } = require('./pieChart.controller');

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    // Call the APIs internally
    const statistics = await getStatistics(req, res, true);
    const barChart = await getBarChartData(req, res, true);
    const pieChart = await getPieChartData(req, res, true);


    // Combine the responses
    const combinedResponse = {
      statistics,
      barChart,
      pieChart,
    };

    res.status(200).json(combinedResponse);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Failed to fetch combined data' });
  }
};

module.exports = { getCombinedData };
