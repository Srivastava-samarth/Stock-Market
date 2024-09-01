import dotenv from 'dotenv';
import express from 'express'
import StockRoutes from './routes/stockRoutes.js'
import authRoutes from './routes/authRoutes.js'
import WatchListRoute from './routes/watchListRoutes.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectDB from './database/database.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

//session setup
app.use(session({
    secret:process.env.SESSION_SECRET || bcduiof3y593heuw,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));

app.use('/api/stocks', StockRoutes);
app.use('/api/user', authRoutes);
app.use('/api/watchlist', WatchListRoute);
app.use('/api/tradingview',)

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running at port ${port}`);
});