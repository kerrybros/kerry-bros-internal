import express from 'express';
import {
  getCustomerSpend,
  getSummary,
  getStats
} from '../controllers/leasingController.js';

const router = express.Router();

// Three simple GET endpoints
router.get('/customer-spend', getCustomerSpend);
router.get('/summary', getSummary);
router.get('/stats', getStats);

export default router;

