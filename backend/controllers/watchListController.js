import WatchList from "../models/WatchListModel.js";
import { User } from "../models/userModel.js";
import { getRealTimeStckData } from "../services/StockService.js";

export const addStock = async (req, res) => {
    try {
        const { stockSymbol, quantity } = req.body;
        const userId = req.user._id;

        // Verify if the stock symbol is valid
        const response = await getRealTimeStckData(stockSymbol);
        
        // Log the entire response to diagnose the issue
        console.log("Stock API Full Response:", response);
        console.log(response.data);

        if (!response || !response['Time Series (1min)']) {
            return res.status(400).json({
                message: "Invalid stock symbol. Please provide a valid stock symbol.",
                success: false
            });
        }

        let watchlist = await WatchList.findOne({ user: userId });
        if (!watchlist) {
            watchlist = new WatchList({ user: userId, stocks: [{ symbol: stockSymbol, quantity: quantity }] });
        } else {
            const stock = watchlist.stocks.find(s => s.symbol === stockSymbol);
            if (stock) {
                stock.quantity += quantity;
            } else {
                watchlist.stocks.push({ symbol: stockSymbol, quantity: quantity });
            }
        }

        await watchlist.save();
        res.status(200).json({ message: 'Stock added to watchlist', watchlist });
    } catch (error) {
        console.log("Error adding stock to watchlist", error);
        res.status(500).json({
            message: "Cannot add stocks",
            success: false
        });
    }
};

export const removeStock = async(req,res)=>{
    try {
        const {stockSymbol,quantity} = req.body;
        const userId = req.user._id;
        const watchlist = await WatchList.findOne({user:userId});
        if(watchlist){
            const stock = watchlist.stocks.find(s=>s.symbol===stockSymbol);
            if(stock){
                if(quantity && stock.quantity > quantity){
                    stock.quantity -= quantity;
                }else{
                    res.status(500).json({
                        error:"You don't the this amount of stocks please enter a valid number",
                        success:false
                    })
                }
                await watchlist.save();
                res.status(200).json({
                    message:"Stock removed successfully",
                    success:true
                })
            }else{
                res.status(404).json({
                    message:"Stock not found",
                    success:false
                })
            }
        }else{
            res.status(404).json({error:"Watchlist not found"});
        }
    } catch (error) {
        console.log("Error removing the stocks from watchlist",error);
        res.status(500).json({error:"Failed to remove stock from watchlist"});
    }
};

export const getStockByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const watchlist = await WatchList.findOne({ user: userId });

        if (watchlist) {
            // Convert the watchlist stocks to plain objects
            const stockList = watchlist.stocks.map(stock => stock.toObject());

            res.status(200).json({ stocks: stockList });
        } else {
            res.status(404).json({ error: 'Watchlist not found' });
        }
    } catch (error) {
        console.log("Error in fetching the stocks", error);
        res.status(500).json({ error: "Failed to fetch watchlist" });
    }
};
