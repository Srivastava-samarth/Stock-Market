import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { addStock, getStockByUserId, removeStock } from '../controllers/watchListController.js';
const router = express.Router();

router.route('/post').post(isAuthenticated,addStock);
router.route('/get').get(isAuthenticated,getStockByUserId);
router.route('/delete').delete(isAuthenticated,removeStock);

export default router;