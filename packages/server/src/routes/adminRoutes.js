import { Router } from 'express';
import { refreshCache } from '../controllers/leasingController.js';

const router = Router();

// POST /api/admin/refresh-cache
// Called by Render Cron Job daily at 6 AM EST
router.post('/refresh-cache', refreshCache);

export default router;

