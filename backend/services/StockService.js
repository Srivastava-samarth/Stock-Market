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
export const getHistoricalStock = async (symbol)=>{
    try {
        const res = await axios.get(`${baseUrl}`,{
            params:{
                function:'TIME_SERIES_DAILY',
                symbol:symbol,
                apikey:apiKey
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
};
