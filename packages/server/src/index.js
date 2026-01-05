import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leasingRoutes from './routes/leasingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cache from './cache.js';
import { refreshCustomerSpendData } from './services/dataRefreshService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  const cached = cache.get('customer-spend');
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    cacheStatus: cached ? 'populated' : 'empty',
    lastUpdated: cached ? cached.lastUpdated : null
  });
});

app.use('/api/leasing', leasingRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Check if we have persisted data
  const cached = cache.get('customer-spend');
  if (!cached) {
    console.log('⚠️ No cached data found - initializing cache on startup...');
    console.log('💡 This happens when the server restarts (Render uses ephemeral filesystem)');
    
    try {
      // Initialize cache immediately on startup to ensure data is always available
      await refreshCustomerSpendData();
      console.log('✅ Cache initialized successfully on startup');
    } catch (error) {
      console.error('❌ Failed to initialize cache on startup:', error.message);
      console.log('💡 Cache will be populated at next scheduled refresh (6 AM EST via Render Cron)');
    }
  } else {
    console.log('✅ Cache loaded from disk - ready to serve requests');
    const timestamp = new Date(cached.lastUpdated);
    console.log(`📅 Last updated: ${timestamp.toLocaleString('en-US', { timeZone: 'America/New_York' })} EST`);
    
    // Check if cache is stale (older than 24 hours) and refresh if needed
    const cacheAge = Date.now() - new Date(cached.lastUpdated).getTime();
    const hoursOld = cacheAge / (1000 * 60 * 60);
    
    if (hoursOld > 24) {
      console.log(`⚠️ Cache is ${hoursOld.toFixed(1)} hours old - refreshing...`);
      try {
        await refreshCustomerSpendData();
        console.log('✅ Stale cache refreshed successfully');
      } catch (error) {
        console.error('❌ Failed to refresh stale cache:', error.message);
      }
    }
  }
  
  console.log('💡 Cache updates handled by Render Cron Job (daily at 6:00 AM EST)');
});

