import { getHistoricalStock, getRealTimeStckData, getTopStocks } from "../services/StockService.js";

export const StockRealTimeData = async(req,res)=>{
    try {
        const data = await getRealTimeStckData(req.params.symbol);
        res.json(data);
    } catch (error) {
        res.status(500).json({message:'Failed to get the real time data'})
        console.log(error);
    }
}
export const StockHistoricalData = async(req,res)=>{
    try {
        const data = await getHistoricalStock(req.params.symbol);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Failed to fetch historical data"})
    }
}

export const TopStocks = async(req,res)=>{
    try {
        const data = await getTopStocks();
        res.json(data);
    } catch (error) {
        res.status(500).json({message:"Failed to fetch the top stocks"});
        console.log(error);
    }
}