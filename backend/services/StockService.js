import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
// console.log(apiKey);
const baseUrl = 'https://www.alphavantage.co/query';

//fetch real time stocks data
export const getRealTimeStckData = async (symbol)=>{
    try {
        const res = await axios.get(`${baseUrl}`,{
            params:{
                function:'TIME_SERIES_INTRADAY',
                symbol:symbol,
                interval:'1min',
                apikey:apiKey
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
};

//fetching historical stock
export const getHistoricalStock = async (symbol) => {
    try {
        const res = await axios.get(`${baseUrl}`, {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol: symbol,
                apikey: apiKey
            }
        });

        const timeSeries = res.data['Time Series (Daily)'];
        if (!timeSeries) {
            throw new Error('Invalid data format or API limit exceeded');
        }

        const historicalData = Object.keys(timeSeries).map(date => ({
            time: date,
            open: parseFloat(timeSeries[date]['1. open']),
            high: parseFloat(timeSeries[date]['2. high']),
            low: parseFloat(timeSeries[date]['3. low']),
            close: parseFloat(timeSeries[date]['4. close']),
            volume: parseFloat(timeSeries[date]['5. volume'])
        }));

        return historicalData;
    } catch (error) {
        console.error('Error fetching historical stock data:', error);
        throw new Error('Failed to fetch historical stock data');
    }
};

export const getTopStocks = async (req, res) => {
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'];
    try {
        const stockData = await Promise.all(
            stockSymbols.map(async (symbol) => {
                const response = await axios.get(`${baseUrl}`, {
                    params: {
                        function: 'TIME_SERIES_INTRADAY',
                        symbol: symbol,
                        interval: '1min',
                        apikey: apiKey,
                    },
                });

                // Check if the response contains the expected data
                if (response.data && response.data['Time Series (1min)']) {
                    return { symbol: symbol, data: response.data['Time Series (1min)'] };
                } else {
                    // Log the response for debugging
                    console.log(`No data returned for symbol: ${symbol}`, response.data);
                    return { symbol: symbol, data: null };
                }
            })
        );
       return stockData;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw(error);
    }
};

