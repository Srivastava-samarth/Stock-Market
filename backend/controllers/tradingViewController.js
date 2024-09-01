import { getHistoricalStock } from "../services/StockService.js";
import { formDataForTardingView } from "../services/TradingView.js";

export const getView = async(req,res)=>{
    try {
        const {symbol} = req.query;
        if(!symbol){
            return res.status(400).json({error:'Stock symbol is required'});
        }
        const historicalData = await getHistoricalStock(symbol);

        const formattedData = formDataForTardingView(historicalData);

        return res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error fetching data for TradingView:', error);
        res.status(500).json({ error: 'Failed to fetch data for TradingView' });
    }
}