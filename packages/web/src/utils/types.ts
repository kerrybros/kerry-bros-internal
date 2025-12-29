// Leasing data types
export interface CustomerSpend {
  id: string;
  customerName: string;
  customerId: string;
  totalSpend: number;
  lastUpdated: string;
  createdAt: string;
}

export interface DailySummary {
  id: string;
  date: string;
  totalRevenue: number;
  recordCount: number;
  createdAt: string;
}

export interface Stats {
  totalCustomers: number;
  totalSpend: number;
  timestamp: string;
}

