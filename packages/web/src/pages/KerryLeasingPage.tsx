import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
  description: string;
  amount: number;
}

interface Order {
  orderNumber: string;
  invoiceDate: string | null;
  total: number;
  services: Service[];
}

interface Unit {
  unitNumber: string;
  spent: number;
  orders: Order[];
}

interface Customer {
  id: string;
  customerName: string;
  logoUrl: string;
  currentSpend: number;
  fixedCost: number;
  units: Unit[];
}

interface ApiResponse {
  customers: Customer[];
  lastUpdated: string;
  monthRange: {
    start: string;
    end: string;
  };
}

// Logo mapping (hardcoded for now)
const LOGO_MAP: { [key: string]: string } = {
  'Wolverine Packing KL': '/Wolverine Logo.jpg',
  'Quality Meats KL': '/Quality Meats Logo.png',
  'Royal Banana KL': '/Royal Banana Logo.png'
};

// API base URL from environment variable (empty string for local dev with proxy)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function KerryLeasingPage() {
  const navigate = useNavigate();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${API_BASE_URL}/api/leasing/customer-spend`;
        console.log('🔍 Fetching customer data from:', apiUrl);
        console.log('📝 API_BASE_URL:', API_BASE_URL || '(empty - using proxy)');
        
        const response = await fetch(apiUrl);
        console.log('📡 Response status:', response.status, response.statusText);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ API Error:', errorText);
          throw new Error(`API returned ${response.status}: ${errorText}`);
        }
        
        const data: ApiResponse = await response.json();
        console.log('✅ Data received:', data);
        console.log('📊 Customers loaded:', data.customers.length);
        
        // Map logo URLs to correct paths
        const customersWithLogos = data.customers.map(customer => ({
          ...customer,
          logoUrl: LOGO_MAP[customer.customerName] || customer.logoUrl
        }));
        
        setCustomers(customersWithLogos);
        setLastUpdated(new Date(data.lastUpdated));
        setError(null);
      } catch (error) {
        console.error('❌ Error fetching customer data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatLastUpdated = (date: Date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const timeStr = date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    if (isToday) {
      return `Today at ${timeStr}`;
    }
    
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${dateStr} at ${timeStr}`;
  };

  const calculateRemaining = (current: number, fixed: number) => {
    return fixed - current;
  };

  const getStatusColor = (current: number, fixed: number) => {
    const remaining = fixed - current;
    
    // Over budget (negative remaining)
    if (remaining < 0) return 'text-red-600';
    
    // Under budget - check percentage
    const percentage = (current / fixed) * 100;
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-green-600';
  };

  const toggleCustomer = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  const toggleUnit = (customerId: string, unitNumber: string) => {
    const key = `${customerId}-${unitNumber}`;
    setExpandedUnits(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const toggleOrder = (customerId: string, unitNumber: string, orderNumber: string) => {
    const key = `${customerId}-${unitNumber}-${orderNumber}`;
    setExpandedOrders(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isUnitExpanded = (customerId: string, unitNumber: string) => {
    return expandedUnits.has(`${customerId}-${unitNumber}`);
  };

  const isOrderExpanded = (customerId: string, unitNumber: string, orderNumber: string) => {
    return expandedOrders.has(`${customerId}-${unitNumber}-${orderNumber}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/KB Logo.png" alt="Kerry Bros" className="h-24 w-auto" />
              <h1 className="text-3xl font-bold text-gray-900">Kerry Leasing Customer Spend</h1>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Month Indicator */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Current Month: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Last Updated: {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading customer data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Data</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-sm text-gray-600">
                This usually means the cache hasn't been populated yet. 
                Please contact your administrator or wait for the next scheduled data refresh.
              </p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Data Available</h3>
              <p className="text-yellow-600">
                No customer data found. Please check back later.
              </p>
            </div>
          </div>
        ) : (
          /* Customer Cards */
          <div className="space-y-4">
            {customers.map((customer) => {
            const remaining = calculateRemaining(customer.currentSpend, customer.fixedCost);
            const isExpanded = expandedCustomer === customer.id;
            const isOverBudget = remaining < 0;
            
            return (
              <div key={customer.id} className="bg-white shadow rounded-lg overflow-hidden">
                {/* Customer Summary */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={customer.logoUrl} alt={customer.customerName} className="h-16 w-auto" />
                      <h3 className="text-xl font-bold text-gray-900">{customer.customerName}</h3>
                    </div>
                    <button
                      onClick={() => toggleCustomer(customer.id)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
                    >
                      {isExpanded ? 'Hide Units' : 'View Units'}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {/* Current Spend */}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Spend (MTD)</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(customer.currentSpend)}
                      </p>
                    </div>

                    {/* Fixed Cost */}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Fixed Cost</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(customer.fixedCost)}
                      </p>
                    </div>

                    {/* Remaining */}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {isOverBudget ? 'Over Budget' : 'Remaining'}
                      </p>
                      <p className={`text-2xl font-bold ${getStatusColor(customer.currentSpend, customer.fixedCost)}`}>
                        {formatCurrency(Math.abs(remaining))}
                        {isOverBudget && ' over'}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${isOverBudget ? 'bg-red-600' : 'bg-indigo-600'}`}
                        style={{ width: `${Math.min((customer.currentSpend / customer.fixedCost) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((customer.currentSpend / customer.fixedCost) * 100).toFixed(1)}% of fixed cost
                    </p>
                  </div>
                </div>

                {/* Unit Breakdown (Expandable) */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Unit Breakdown</h4>
                    <div className="space-y-2">
                      {customer.units.map((unit, unitIndex) => (
                        <div key={unitIndex} className="bg-white rounded border border-gray-200">
                          {/* Unit Header - Clickable */}
                          <button
                            onClick={() => toggleUnit(customer.id, unit.unitNumber)}
                            className="w-full flex justify-between items-center p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <svg
                                className={`w-4 h-4 transition-transform ${isUnitExpanded(customer.id, unit.unitNumber) ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                              <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                            </div>
                            <span className="font-semibold text-gray-700">{formatCurrency(unit.spent)}</span>
                          </button>

                          {/* Orders List - Expandable */}
                          {isUnitExpanded(customer.id, unit.unitNumber) && (
                            <div className="border-t border-gray-200 bg-gray-50 p-3 space-y-2">
                              {unit.orders.map((order, orderIndex) => (
                                <div key={orderIndex} className="bg-white rounded border border-gray-200">
                                  {/* Order Header - Clickable */}
                                  <button
                                    onClick={() => toggleOrder(customer.id, unit.unitNumber, order.orderNumber)}
                                    className="w-full flex justify-between items-center p-3 hover:bg-gray-50 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <svg
                                        className={`w-4 h-4 transition-transform ${isOrderExpanded(customer.id, unit.unitNumber, order.orderNumber) ? 'rotate-90' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                      </svg>
                                      <div className="text-left">
                                        <span className="font-medium text-gray-900">Order #{order.orderNumber}</span>
                                        {order.invoiceDate && (
                                          <span className="text-xs text-gray-500 ml-2">
                                            {new Date(order.invoiceDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <span className="font-semibold text-gray-700">{formatCurrency(order.total)}</span>
                                  </button>

                                  {/* Services List - Expandable */}
                                  {isOrderExpanded(customer.id, unit.unitNumber, order.orderNumber) && (
                                    <div className="border-t border-gray-200 bg-gray-50 p-3">
                                      <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase">Services</h5>
                                      <div className="space-y-1">
                                        {order.services.map((service, serviceIndex) => (
                                          <div
                                            key={serviceIndex}
                                            className="flex justify-between items-start text-sm py-1 px-2 bg-white rounded"
                                          >
                                            <span className="text-gray-700 flex-1">{service.description}</span>
                                            <span className="font-medium text-gray-900 ml-3">{formatCurrency(service.amount)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
}
