import express from 'express';
import { getView } from '../controllers/tradingViewController.js';
const router = express.Router();

router.route('/get').get(getView);

export default router;