import prisma from '../prisma.js';
import cache from '../cache.js';

// Constants
const ORG_ID = 'org_36whHeTmFumKPNuHkcRY7Yknqvl';
const KERRY_LEASING_CUSTOMERS = [
  'Wolverine Packing KL',
  'Quality Meats KL',
  'Royal Banana KL'
];

// Fixed costs (hardcoded for now)
const FIXED_COSTS = {
  'Wolverine Packing KL': 129676.00,
  'Quality Meats KL': 18111.00,
  'Royal Banana KL': 12939.00
};

// Helper to get current month date range (Eastern Time)
const getCurrentMonthDateRange = () => {
  const now = new Date();
  
  // Convert to Eastern Time
  const etNow = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  // First day of current month at midnight ET
  const startDate = new Date(etNow.getFullYear(), etNow.getMonth(), 1);
  
  // Yesterday at end of day ET (since data is retroactive)
  const yesterday = new Date(etNow);
  yesterday.setDate(yesterday.getDate() - 1);
  const endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59, 999);
  
  return { startDate, endDate };
};

/**
 * Fetches fresh customer spend data from database and updates cache
 * This is called by:
 * 1. Daily cron job at 6 AM EST
 * 2. Admin refresh endpoint
 * 3. Initial server startup (if cache is empty)
 */
export const refreshCustomerSpendData = async () => {
  console.log('🔄 Starting data refresh...');
  
  try {
    const { startDate, endDate } = getCurrentMonthDateRange();
    
    console.log(`📅 Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);

    // Fetch all revenue details for Kerry Leasing customers in current month
    const revenueData = await prisma.revenue_details.findMany({
      where: {
        organization_id: ORG_ID,
        customer: {
          in: KERRY_LEASING_CUSTOMERS,
          mode: 'insensitive'
        },
        invoice_date: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        customer: true,
        unit: true,
        total: true
      }
    });

    console.log(`📊 Found ${revenueData.length} revenue records`);

    // Aggregate data by customer
    const customerMap = new Map();

    for (const record of revenueData) {
      const customerName = record.customer?.trim();
      if (!customerName) continue;

      // Find matching customer (case-insensitive)
      const matchedCustomer = KERRY_LEASING_CUSTOMERS.find(
        c => c.toLowerCase() === customerName.toLowerCase()
      );

      if (!matchedCustomer) continue;

      if (!customerMap.has(matchedCustomer)) {
        customerMap.set(matchedCustomer, {
          id: matchedCustomer.toLowerCase().replace(/\s+/g, '-'),
          customerName: matchedCustomer,
          logoUrl: `/logos/${matchedCustomer.toLowerCase().replace(/\s+/g, '-')}.png`,
          currentSpend: 0,
          fixedCost: FIXED_COSTS[matchedCustomer],
          units: new Map()
        });
      }

      const customer = customerMap.get(matchedCustomer);
      const amount = parseFloat(record.total) || 0;
      customer.currentSpend += amount;

      // Aggregate by unit
      const unitNumber = record.unit?.trim() || 'Unknown';
      if (!customer.units.has(unitNumber)) {
        customer.units.set(unitNumber, {
          unitNumber,
          spent: 0
        });
      }
      customer.units.get(unitNumber).spent += amount;
    }

    // Format response
    const result = {
      customers: Array.from(customerMap.values()).map(customer => ({
        id: customer.id,
        customerName: customer.customerName,
        logoUrl: customer.logoUrl,
        currentSpend: parseFloat(customer.currentSpend.toFixed(2)),
        fixedCost: customer.fixedCost,
        units: Array.from(customer.units.values())
          .map(unit => ({
            unitNumber: unit.unitNumber,
            spent: parseFloat(unit.spent.toFixed(2))
          }))
          .sort((a, b) => b.spent - a.spent) // Sort by spend, descending
      })),
      lastUpdated: new Date().toISOString(),
      monthRange: {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      }
    };

    // Update cache
    cache.set('customer-spend', result);
    console.log('✅ Cache refreshed successfully');
    console.log(`   - ${result.customers.length} customers updated`);
    
    return {
      success: true,
      timestamp: result.lastUpdated,
      customersUpdated: result.customers.length,
      recordsProcessed: revenueData.length
    };
  } catch (error) {
    console.error('❌ Error refreshing data:', error);
    throw error;
  }
};

