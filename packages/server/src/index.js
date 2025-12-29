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
  res.json({ status: 'ok', message: 'Server is running' });
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
    console.log('⚠️ No cached data found');
    console.log('💡 Data will be fetched at next scheduled refresh (6 AM EST via Render Cron)');
    console.log('💡 Or manually trigger: POST /api/admin/refresh-cache');
  } else {
    console.log('✅ Cache loaded from disk - ready to serve requests');
    const timestamp = new Date(cached.lastUpdated);
    console.log(`📅 Last updated: ${timestamp.toLocaleString('en-US', { timeZone: 'America/New_York' })} EST`);
  }
  
  console.log('💡 Cache updates handled by Render Cron Job (daily at 6:00 AM EST)');
});

