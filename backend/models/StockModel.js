import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
    symbol:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    volume: {
        type: Number
    }, 
    marketCap: {
        type: Number
    },
    sector: {
        type: String
    },
    performance: {
        type: String
    }
});

const Stock = mongoose.model('Stock',StockSchema);
export default Stock;