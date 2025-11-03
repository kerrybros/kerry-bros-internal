/**
 * TypeScript Type Definitions for Lookups Dashboard
 * 
 * This file contains all the TypeScript interfaces and types used by the components.
 * You can import these types in your own code if needed.
 */

// ============================================================================
// DATA TYPES
// ============================================================================

/**
 * Integrated record combining revenue data with enhanced unit and customer details
 */
export interface IntegratedRecord {
  // Revenue data fields (from all_revenue_details table)
  shop: string;
  customerGroup: string;
  customer: string;
  customerExternalId: string;
  creditTerms: string;
  salesRep: string;
  unit: string;
  unitNickname: string;
  unitType: string;
  unitAddress: string;
  unitMiles: string;
  engineHours: string;
  number: string;
  invoiceDate: string;
  order: string;
  po: string;
  authNumber: string;
  serviceWriter: string;
  createdDate: string;
  orderCreatedDate: string;
  soaiId: string;
  type: string;
  item: string;
  itemDisplayTitle: string;
  laborRate: number;
  complaintDescription: string;
  shopUnit: string;
  causeType: string;
  severity: string;
  correctionId: string;
  serviceDescription: string;
  globalServiceDescription: string;
  component: string;
  system: string;
  dateActionCompleted: string;
  partCategory: string;
  partNumber: string;
  partDescription: string;
  poweredByMotor: string;
  qty: number;
  rate: number;
  total: number;
  taxLocation: string;
  taxableState: string;
  salesTax: number;
  partCost: number;
  totalCostOfParts: number;
  partsMargin: number;
  partsMarginPercent: number;
  technicianRate: number;
  actualHours: number;
  costOfLabor: number;
  leadTech: string;
  taxableSales: number;
  nonTaxableSales: number;
  salesTotal: number;

  // Enhanced unit details from Customer Unit table
  unitDetails?: UnitDetails;
  
  // Enhanced customer details (derived from revenue data)
  customerDetails?: CustomerDetails;
}

/**
 * Unit details from customer_units table
 */
export interface UnitDetails {
  unitId: string;
  vin: string;
  chassisYear: string;
  chassisMake: string;
  chassisModel: string;
  engineYear: string;
  engineMake: string;
  engineModel: string;
  engineSerialNumber: string;
  mileage: string;
  tireSize: string;
  unitType: string;
  unitSubtype: string;
  licensePlate: string;
  licensePlateState: string;
  fleetNumber: string;
  nickname: string;
  inServiceDate: string;
  trackPreventiveMaintenance: string;
}

/**
 * Customer details (derived from revenue data)
 */
export interface CustomerDetails {
  customerId: string;
  companyName: string;
  customerMainPhone: string;
  salesRep: string;
  assignedShop: string;
  creditTerms: string;
  paymentMethod: string;
  priceLevel: string;
}

/**
 * Result from the integrated data hook
 */
export interface IntegratedDataResult {
  rawRecords: IntegratedRecord[];
  loading: boolean;
  error: string | null;
  stats: DataStats;
}

/**
 * Statistics about the loaded data
 */
export interface DataStats {
  totalRecords: number;
  totalCustomers: number;
  totalUnits: number;
  recordsWithUnitDetails: number;
  recordsWithCustomerDetails: number;
}

// ============================================================================
// FILTER & SEARCH TYPES
// ============================================================================

/**
 * Filter state for customer, unit, and unit detail selections
 */
export interface FilterState {
  unitFilter: string;
  unitMakeFilter: string;
  unitModelFilter: string;
  unitYearFilter: string;
  customerFilter: string;
  selectedCustomers: string[];
  selectedUnits: string[];
  selectedYears: string[];
  selectedMakes: string[];
  selectedModels: string[];
}

/**
 * Search terms for various filter fields
 */
export interface SearchTerms {
  customer: string;
  unit: string;
  year: string;
  make: string;
  model: string;
  lookup: string;
}

/**
 * Dropdown visibility states
 */
export interface DropdownStates {
  showCustomer: boolean;
  showUnit: boolean;
  showYear: boolean;
  showMake: boolean;
  showModel: boolean;
  showCustomerDetails: boolean;
  showUnitDetails: boolean;
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * Props for the LookupsFilterPanel component
 */
export interface LookupsFilterPanelProps {
  // Filter state
  filters: FilterState;
  onUpdateFilter: (key: keyof FilterState, value: any) => void;
  
  // Search terms
  searchTerms: SearchTerms;
  onUpdateSearchTerm: (key: keyof SearchTerms, value: string) => void;
  
  // Dropdown states
  dropdownStates: DropdownStates;
  onUpdateDropdownState: (key: keyof DropdownStates, value: boolean) => void;
  
  // Data options
  uniqueCustomers: string[];
  uniqueUnits: string[];
  uniqueUnitDetails: {
    years: string[];
    makes: string[];
    models: string[];
  };
  
  // Lookup type
  lookupType: 'service-order' | 'parts' | null;
  onSetLookupType: (type: 'service-order' | 'parts') => void;
  
  // Search type for parts
  searchType: 'description' | 'partNumber';
  onSetSearchType: (type: 'description' | 'partNumber') => void;
  
  // Date range
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
  currentPreset: string;
  onSetCurrentPreset: (preset: string) => void;
  datePresets: DatePreset[];
  
  // Reset functions
  onResetAll: () => void;
  onClearFilters: () => void;
}

/**
 * Props for MultiSelectDropdown component
 */
export interface MultiSelectDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  placeholder: string;
  disabled?: boolean;
  selectedItems: string[];
  showDropdown: boolean;
  options: string[];
  onToggleItem: (item: string) => void;
  onClearAll: () => void;
  onCloseDropdown: () => void;
  className?: string;
  dropdownClassName?: string;
  helperText?: string;
}

/**
 * Props for SelectedItemsBadge component
 */
export interface SelectedItemsBadgeProps {
  label: string;
  count: number;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
  onRemoveItem: (item: string) => void;
  onClearAll: () => void;
  badgeColor: BadgeColor;
  className?: string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Badge color options
 */
export type BadgeColor = 'red' | 'blue' | 'green' | 'purple' | 'yellow';

/**
 * Lookup type options
 */
export type LookupType = 'service-order' | 'parts' | null;

/**
 * Search type for parts lookup
 */
export type SearchType = 'description' | 'partNumber';

/**
 * Date preset configuration
 */
export interface DatePreset {
  label: string;
  from: string;
  to: string;
}

/**
 * Color class configuration for badges
 */
export interface ColorClasses {
  badge: string;
  dropdown: string;
}

/**
 * Grouped service order data for display
 */
export interface GroupedServiceOrder {
  order: string;
  customer: string;
  unit: string;
  invoiceDate: string;
  orderCreatedDate: string;
  serviceWriter: string;
  leadTech: string;
  shop: string;
  items: ServiceOrderItem[];
  totals: ServiceOrderTotals;
  unitDetails?: UnitDetails;
  chassisYear?: string;
  chassisMake?: string;
  chassisModel?: string;
}

/**
 * Individual service order item (labor or part)
 */
export interface ServiceOrderItem {
  type: 'Labor' | 'Part';
  description: string;
  partNumber?: string;
  qty: number;
  rate: number;
  total: number;
  hours?: number;
  costOfLabor?: number;
  partCost?: number;
  margin?: number;
  marginPercent?: number;
  isFirstInGroup?: boolean;
  rowSpan?: number;
}

/**
 * Service order totals
 */
export interface ServiceOrderTotals {
  laborTotal: number;
  partsTotal: number;
  salesTotal: number;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  totalMargin: number;
  marginPercent: number;
}

/**
 * Grouped parts data for display
 */
export interface GroupedPart {
  partNumber: string;
  partDescription: string;
  totalQty: number;
  avgRate: number;
  totalSales: number;
  totalCost: number;
  totalMargin: number;
  marginPercent: number;
  occurrences: number;
  customers: string[];
  units: string[];
  lastUsed: string;
  orders: string[];
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Paginated API response format
 */
export interface PaginatedResponse<T> {
  rows: T[];
  hasMore: boolean;
  cursor: string | null;
  total?: number;
}

/**
 * Raw revenue record from API (before mapping to IntegratedRecord)
 */
export interface RawRevenueRecord {
  Shop: string;
  "Customer Group": string;
  Customer: string;
  "Customer External ID": string;
  "Credit Terms": string;
  "Sales Rep": string;
  Unit: string;
  "Unit Nickname": string;
  "Unit Type": string;
  "Unit Address": string;
  "Unit Miles": string;
  "Engine Hours": string;
  Number: string;
  "Invoice Date": string;
  Order: string;
  PO: string;
  "Auth Number": string;
  "Service Writer": string;
  "Created Date": string;
  "Order Created Date": string;
  "SOAI ID": string;
  Type: string;
  Item: string;
  "Item Display Title": string;
  "Labor Rate": number;
  "Complaint Description": string;
  "Shop Unit": string;
  "Cause Type": string;
  Severity: string;
  "Correction ID": string;
  "Service Description": string;
  "Global Service Description": string;
  Component: string;
  System: string;
  "Date Action Completed": string;
  "Part Category": string;
  "Part Number": string;
  "Part Description": string;
  "Powered by Motor": string;
  Qty: number;
  Rate: number;
  Total: number;
  "Tax Location": string;
  "Taxable State": string;
  "Sales Tax": number;
  "Part Cost": number;
  "Total Cost of Parts": number;
  "Parts Margin": number;
  "Parts Margin %": number;
  "Technician Rate": number;
  "Actual Hours": number;
  "Cost of Labor": number;
  "Lead Tech": string;
  "Taxable Sales": number;
  "Non Taxable Sales": number;
  "Sales Total": number;
}

/**
 * Raw customer unit record from API
 */
export interface RawCustomerUnitRecord {
  unitId: string;
  vin: string;
  chassisYear: string;
  chassisMake: string;
  chassisModel: string;
  engineYear: string;
  engineMake: string;
  engineModel: string;
  engineSerialNumber: string;
  mileage: string;
  tireSize: string;
  unitType: string;
  unitSubtype: string;
  licensePlate: string;
  licensePlateState: string;
  fleetNumber: string;
  nickname: string;
  inServiceDate: string;
  trackPreventiveMaintenance: string;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  // Main data types
  IntegratedRecord,
  IntegratedDataResult,
  UnitDetails,
  CustomerDetails,
  DataStats,
  
  // Filter and search types
  FilterState,
  SearchTerms,
  DropdownStates,
  
  // Component prop types
  LookupsFilterPanelProps,
  MultiSelectDropdownProps,
  SelectedItemsBadgeProps,
  
  // Display types
  GroupedServiceOrder,
  ServiceOrderItem,
  ServiceOrderTotals,
  GroupedPart,
  
  // API types
  PaginatedResponse,
  RawRevenueRecord,
  RawCustomerUnitRecord,
  
  // Utility types
  LookupType,
  SearchType,
  DatePreset,
  ColorClasses,
};

