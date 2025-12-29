import prisma from '../prisma.js';
import cache from '../cache.js';

// GET /api/leasing/customer-spend
export const getCustomerSpend = async (req, res) => {
  try {
    // Check cache first
    const cached = cache.get('customer-spend');
    if (cached) {
      console.log('📦 Serving from cache: customer-spend');
      return res.json(cached);
    }

    // Fetch from database
    const data = await prisma.customerSpend.findMany({
      orderBy: { totalSpend: 'desc' }
    });

    // Cache the result
    cache.set('customer-spend', data);
    console.log('💾 Cached customer-spend data');

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/leasing/summary
export const getSummary = async (req, res) => {
  try {
    const cached = cache.get('summary');
    if (cached) {
      console.log('📦 Serving from cache: summary');
      return res.json(cached);
    }

    const data = await prisma.dailySummary.findMany({
      orderBy: { date: 'desc' },
      take: 30 // Last 30 days
    });

    cache.set('summary', data);
    console.log('💾 Cached summary data');

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/leasing/stats
export const getStats = async (req, res) => {
  try {
    const cached = cache.get('stats');
    if (cached) {
      console.log('📦 Serving from cache: stats');
      return res.json(cached);
    }

    // Calculate some basic stats
    const totalCustomers = await prisma.customerSpend.count();
    const totalSpend = await prisma.customerSpend.aggregate({
      _sum: { totalSpend: true }
    });

    const stats = {
      totalCustomers,
      totalSpend: totalSpend._sum.totalSpend || 0,
      timestamp: new Date().toISOString()
    };

    cache.set('stats', stats);
    console.log('💾 Cached stats data');

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

