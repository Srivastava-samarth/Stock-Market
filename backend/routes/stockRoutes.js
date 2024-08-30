import { StockHistoricalData, StockRealTimeData, TopStocks } from "../controllers/StockData.js";
import express from 'express';
const router = express.Router();

router.route('/top').get(TopStocks);
router.route('/realtime/:symbol').get(StockRealTimeData);
router.route('/historical/:symbol').get(StockHistoricalData);

export default router;
