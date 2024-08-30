import mongoose from "mongoose";

const watchListSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    stocks:[
        {
            symbol:{
                type:String,
                required:true
            },
            addedAt:{
                type:Date,
                default :Date.now,
            },
            quantity:{
                type:Number,
                default:0
            },
        },
    ],
});

const WatchList = mongoose.model('WatchList',watchListSchema);

export default WatchList;