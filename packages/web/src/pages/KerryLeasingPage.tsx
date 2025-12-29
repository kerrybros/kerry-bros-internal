import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data - structured exactly as API will return
const mockCustomers = [
  {
    id: '1',
    customerName: 'Wolverine Packing KL',
    logoUrl: '/Wolverine Logo.jpg',
    currentSpend: 85420.50,
    fixedCost: 129676.00,
    units: [
      { unitNumber: 'Unit 101', spent: 32200.00 },
      { unitNumber: 'Unit 102', spent: 28150.50 },
      { unitNumber: 'Unit 103', spent: 25070.00 }
    ]
  },
  {
    id: '2',
    customerName: 'Quality Meats KL',
    logoUrl: '/Quality Meats Logo.png',
    currentSpend: 1250.25,
    fixedCost: 18111.00,
    units: [
      { unitNumber: 'Unit 201', spent: 650.25 },
      { unitNumber: 'Unit 202', spent: 600.00 }
    ]
  },
  {
    id: '3',
    customerName: 'Royal Banana KL',
    logoUrl: '/Royal Banana Logo.png',
    currentSpend: 8100.00,
    fixedCost: 12939.00,
    units: [
      { unitNumber: 'Unit 301', spent: 3500.00 },
      { unitNumber: 'Unit 302', spent: 2800.00 },
      { unitNumber: 'Unit 303', spent: 1800.00 }
    ]
  }
];

interface Unit {
  unitNumber: string;
  spent: number;
}

interface Customer {
  id: string;
  customerName: string;
  logoUrl: string;
  currentSpend: number;
  fixedCost: number;
  units: Unit[];
}

export default function KerryLeasingPage() {
  const navigate = useNavigate();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [lastUpdated] = useState<Date>(new Date()); // In real app, this comes from API
  
  // TODO: Replace with actual API call
  const customers: Customer[] = mockCustomers;

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

        {/* Customer Cards */}
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
                      {customer.units.map((unit, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-white p-3 rounded border border-gray-200"
                        >
                          <span className="font-medium text-gray-900">{unit.unitNumber}</span>
                          <span className="font-semibold text-gray-700">{formatCurrency(unit.spent)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

