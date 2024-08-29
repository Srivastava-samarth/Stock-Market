import { StockHistoricalData, StockRealTimeData } from "../controllers/StockData.js";
import express from 'express';
const router = express.Router();

router.route('/realtime/:symbol').get(StockRealTimeData);
router.route('/historical/:symbol').get(StockHistoricalData);

export default router;
