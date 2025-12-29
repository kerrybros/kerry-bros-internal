import cache from '../cache.js';
import { refreshCustomerSpendData } from '../services/dataRefreshService.js';

// GET /api/leasing/customer-spend
export const getCustomerSpend = async (req, res) => {
  try {
    // Always serve from cache - never trigger refresh from API requests
    const cached = cache.get('customer-spend');
    
    if (cached) {
      console.log('📦 Serving from cache: customer-spend');
      return res.json(cached);
    }
    
    // Cache is empty (should only happen on very first request ever)
    console.log('⚠️ Cache is empty - this should only happen on first server start');
    console.log('💡 Please wait for the next scheduled refresh at 6 AM EST');
    
    return res.status(503).json({ 
      error: 'Data not yet available. Please check back after 6 AM EST.',
      message: 'Cache is being populated by scheduled job.'
    });
  } catch (error) {
    console.error('❌ Error fetching customer spend:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/refresh-cache
// Protected endpoint for manual cache refresh (called by Render Cron Job)
export const refreshCache = async (req, res) => {
  try {
    // Check for authorization token
    const authHeader = req.headers.authorization;
    const expectedToken = process.env.REFRESH_TOKEN || 'default-secret-change-in-production';
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      console.warn('⚠️ Unauthorized refresh attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('🔐 Authorized refresh request received');
    
    // Trigger data refresh
    const result = await refreshCustomerSpendData();
    
    res.json(result);
  } catch (error) {
    console.error('❌ Error in refresh endpoint:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// GET /api/leasing/summary (placeholder for future)
export const getSummary = async (req, res) => {
  res.json({ message: 'Summary API - Coming Soon' });
};

// GET /api/leasing/stats (placeholder for future)
export const getStats = async (req, res) => {
  res.json({ message: 'Stats API - Coming Soon' });
};

