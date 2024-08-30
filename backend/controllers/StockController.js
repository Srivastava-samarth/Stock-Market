import Stock from "../models/StockModel.js";
import { getRealTimeStckData } from "../services/StockService.js";

export const getStocks = async (req, res) => {
    try {
        const { sortBy = 'price', sortOrder = 'asc' } = req.query;
        const stockSymbols = ['AAPL', 'MSFT', 'GOOGL']; // Add more symbols as needed

        const stockDataList = await Promise.all(stockSymbols.map(async (symbol) => {
            const response = await getRealTimeStckData(symbol);
            console.log(`API Response for ${symbol}:`, response);

            if (response && response.data && response.data['Time Series (1min)']) {
                const timeSeries = response.data['Time Series (1min)'];
                const latestTime = Object.keys(timeSeries)[0];
                const latestData = timeSeries[latestTime];
                
                const stockPrice = parseFloat(latestData['1. open']);
                const stockVolume = parseInt(latestData['5. volume']);

                return {
                    symbol,
                    price: stockPrice,
                    volume: stockVolume
                };
            } else {
                console.log(`No time series data for ${symbol}`);
                return null;
            }
        }));

        let filteredStocks = stockDataList.filter(stock => stock !== null);
        console.log(`Filtered Stocks:`, filteredStocks);

        filteredStocks.sort((a, b) => {
            if (sortBy === 'price') {
                return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (sortBy === 'volume') {
                return sortOrder === 'asc' ? a.volume - b.volume : b.volume - a.volume;
            }
            return 0;
        });

        console.log(`Sorted Stocks:`, filteredStocks);
        res.status(200).json({ stocks: filteredStocks });
    } catch (error) {
        console.error("Error in fetching and processing stocks", error);
        res.status(500).json({ error: "Failed to fetch and process stock data" });
    }
};
