import { useState, useEffect } from 'react';

// Force Render backend URL - ignore environment variables for now
const API_BASE_URL = 'https://kerry-fleet-saas.onrender.com';

// In-memory cache for line-items (survives navigation, cleared on page refresh)
let lineItemsCache: any[] | null = null;

// Re-use the same interfaces from the original hook
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
  unitDetails?: {
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
  };
  
  // Enhanced customer details (derived from revenue data since no separate customers table)
  customerDetails?: {
    customerId: string;
    companyName: string;
    customerMainPhone: string;
    salesRep: string;
    assignedShop: string;
    creditTerms: string;
    paymentMethod: string;
    priceLevel: string;
  };
}

export interface IntegratedDataResult {
  rawRecords: IntegratedRecord[];
  loading: boolean;
  error: string | null;
  stats: {
    totalRecords: number;
    totalCustomers: number;
    totalUnits: number;
    recordsWithUnitDetails: number;
    recordsWithCustomerDetails: number;
  };
}

// Helper function to create customer/unit lookup maps
function createCustomerUnitLookupMaps(customerUnitRecords: any[]) {
  const unitsByUnitId = new Map();
  const unitsByNickname = new Map();

  customerUnitRecords.forEach(unit => {
    if (unit.unitId) {
      unitsByUnitId.set(unit.unitId, unit);
    }
    if (unit.nickname) {
      unitsByNickname.set(unit.nickname.toLowerCase().trim(), unit);
    }
  });

  return { unitsByUnitId, unitsByNickname };
}

export function useIntegratedDataFromDBOptimized(): IntegratedDataResult {
  const [rawRecords, setRawRecords] = useState<IntegratedRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalRecords: 0,
    totalCustomers: 0,
    totalUnits: 0,
    recordsWithUnitDetails: 0,
    recordsWithCustomerDetails: 0
  });

  useEffect(() => {
    async function loadIntegratedDataInChunks() {
      try {
        setLoading(true);
        setError(null);

        console.log('📦 Loading data using paginated endpoint...');

        // First, load customer units (small dataset, can load in one go)
        const customerUnitsResponse = await fetch(`${API_BASE_URL}/api/customer-units`);
        if (!customerUnitsResponse.ok) {
          throw new Error(`Customer Units API: ${customerUnitsResponse.status} ${customerUnitsResponse.statusText}`);
        }
        const customerUnitRecords = await customerUnitsResponse.json();

        if (!Array.isArray(customerUnitRecords)) {
          throw new Error(`Customer Units API returned invalid data format`);
        }

        // Create lookup maps for efficient searching
        const customerUnitLookups = createCustomerUnitLookupMaps(customerUnitRecords);

        // Try cached data first (instant!), then snapshot, then pagination
        let allRevenueRecords: any[] = [];
        const startTime = Date.now();
        
        // Check in-memory cache first
        if (lineItemsCache && lineItemsCache.length > 0) {
          allRevenueRecords = lineItemsCache;
          const duration = ((Date.now() - startTime) / 1000).toFixed(1);
          console.log(`✅ Loaded ${allRevenueRecords.length} records from cache in ${duration}s (instant!)`);
        } else {
          // Cache miss, fetch from snapshot
          try {
            console.log('📥 Loading from pre-generated line-items snapshot...');
            const response = await fetch(`${API_BASE_URL}/api/snapshot/line-items`);
            
            if (response.ok) {
              allRevenueRecords = await response.json();
              
              if (Array.isArray(allRevenueRecords) && allRevenueRecords.length > 0) {
                const duration = ((Date.now() - startTime) / 1000).toFixed(1);
                console.log(`✅ Loaded ${allRevenueRecords.length} records from snapshot in ${duration}s`);
                
                // Cache in memory for subsequent loads
                lineItemsCache = allRevenueRecords;
                console.log('💾 Cached line-items in memory for future loads');
              } else {
                throw new Error('Invalid snapshot response');
              }
            } else {
              throw new Error(`Snapshot returned ${response.status}`);
            }
          } catch (snapshotError) {
          // Fallback to paginated loading if snapshot not available
          console.warn('⚠️ Snapshot not available, using paginated loading:', snapshotError);
          console.log('📥 Loading via paginated endpoint...');
          
          let hasMore = true;
          let cursor = null;
          let pageCount = 0;
          const pageSize = 500; // Conservative page size

          while (hasMore) {
            const url = new URL(`${API_BASE_URL}/api/revenue/paginated`);
            url.searchParams.append('limit', pageSize.toString());
            if (cursor) {
              url.searchParams.append('cursor', cursor);
            }

            const response = await fetch(url.toString());
            
            if (!response.ok) {
              throw new Error(`Revenue API: ${response.status} ${response.statusText}`);
            }

            const pageData = await response.json();
            
            if (!pageData || !Array.isArray(pageData.rows)) {
              throw new Error('Invalid paginated response format');
            }

            allRevenueRecords.push(...pageData.rows);
            pageCount++;
            hasMore = pageData.hasMore;
            cursor = pageData.cursor;

            if (pageCount % 5 === 0 || !hasMore) {
              console.log(`📊 Loaded ${allRevenueRecords.length} records (${pageCount} pages)...`);
            }
          }

          const duration = ((Date.now() - startTime) / 1000).toFixed(1);
          console.log(`✅ Loaded ${allRevenueRecords.length} records via pagination in ${duration}s`);
          
          // Cache for subsequent loads
          lineItemsCache = allRevenueRecords;
          console.log('💾 Cached line-items in memory for future loads');
          }
        }

        // Integrate the data - map from database column names to interface
        const integratedRecords: IntegratedRecord[] = allRevenueRecords.map((revenueRecord: any) => {
          // Database returns capitalized field names like "Shop", "Customer", etc.
          const integratedRecord: IntegratedRecord = {
            shop: revenueRecord.Shop || '',
            customerGroup: revenueRecord['Customer Group'] || '',
            customer: revenueRecord.Customer || '',
            customerExternalId: revenueRecord['Customer External ID'] || '',
            creditTerms: revenueRecord['Credit Terms'] || '',
            salesRep: revenueRecord['Sales Rep'] || '',
            unit: revenueRecord.Unit || '',
            unitNickname: revenueRecord['Unit Nickname'] || '',
            unitType: revenueRecord['Unit Type'] || '',
            unitAddress: revenueRecord['Unit Address'] || '',
            unitMiles: revenueRecord['Unit Miles'] || '',
            engineHours: revenueRecord['Engine Hours'] || '',
            number: revenueRecord.Number || '',
            invoiceDate: revenueRecord['Invoice Date'] || '',
            order: revenueRecord.Order || '',
            po: revenueRecord.PO || '',
            authNumber: revenueRecord['Auth Number'] || '',
            serviceWriter: revenueRecord['Service Writer'] || '',
            createdDate: revenueRecord['Created Date'] || '',
            orderCreatedDate: revenueRecord['Order Created Date'] || '',
            soaiId: revenueRecord['SOAI ID'] || '',
            type: revenueRecord.Type || '',
            item: revenueRecord.Item || '',
            itemDisplayTitle: revenueRecord['Item Display Title'] || '',
            laborRate: parseFloat(revenueRecord['Labor Rate']) || 0,
            complaintDescription: revenueRecord['Complaint Description'] || '',
            shopUnit: revenueRecord['Shop Unit'] || '',
            causeType: revenueRecord['Cause Type'] || '',
            severity: revenueRecord.Severity || '',
            correctionId: revenueRecord['Correction ID'] || '',
            serviceDescription: revenueRecord['Service Description'] || '',
            globalServiceDescription: revenueRecord['Global Service Description'] || '',
            component: revenueRecord.Component || '',
            system: revenueRecord.System || '',
            dateActionCompleted: revenueRecord['Date Action Completed'] || '',
            partCategory: revenueRecord['Part Category'] || '',
            partNumber: revenueRecord['Part Number'] || '',
            partDescription: revenueRecord['Part Description'] || '',
            poweredByMotor: revenueRecord['Powered by Motor'] || '',
            qty: parseFloat(revenueRecord.Qty) || 0,
            rate: parseFloat(revenueRecord.Rate) || 0,
            total: parseFloat(revenueRecord.Total) || 0,
            taxLocation: revenueRecord['Tax Location'] || '',
            taxableState: revenueRecord['Taxable State'] || '',
            salesTax: parseFloat(revenueRecord['Sales Tax']) || 0,
            partCost: parseFloat(revenueRecord['Part Cost']) || 0,
            totalCostOfParts: parseFloat(revenueRecord['Total Cost of Parts']) || 0,
            partsMargin: parseFloat(revenueRecord['Parts Margin']) || 0,
            partsMarginPercent: parseFloat(revenueRecord['Parts Margin %']) || 0,
            technicianRate: parseFloat(revenueRecord['Technician Rate']) || 0,
            actualHours: parseFloat(revenueRecord['Actual Hours']) || 0,
            costOfLabor: parseFloat(revenueRecord['Cost of Labor']) || 0,
            leadTech: revenueRecord['Lead Tech'] || '',
            taxableSales: parseFloat(revenueRecord['Taxable Sales']) || 0,
            nonTaxableSales: parseFloat(revenueRecord['Non Taxable Sales']) || 0,
            salesTotal: parseFloat(revenueRecord['Sales Total']) || 0,
          };

          // Try to enhance with unit details from customer_units table
          const unit = revenueRecord.Unit || revenueRecord['Unit Nickname'];
          if (unit) {
            const unitDetails = customerUnitLookups.unitsByNickname.get(unit.toLowerCase().trim());
            if (unitDetails) {
              integratedRecord.unitDetails = {
                unitId: unitDetails.unitId || '',
                vin: unitDetails.vin || '',
                chassisYear: unitDetails.chassisYear || '',
                chassisMake: unitDetails.chassisMake || '',
                chassisModel: unitDetails.chassisModel || '',
                engineYear: unitDetails.engineYear || '',
                engineMake: unitDetails.engineMake || '',
                engineModel: unitDetails.engineModel || '',
                engineSerialNumber: unitDetails.engineSerialNumber || '',
                mileage: unitDetails.mileage || '',
                tireSize: unitDetails.tireSize || '',
                unitType: unitDetails.unitType || '',
                unitSubtype: unitDetails.unitSubtype || '',
                licensePlate: unitDetails.licensePlate || '',
                licensePlateState: unitDetails.licensePlateState || '',
                fleetNumber: unitDetails.fleetNumber || '',
                nickname: unitDetails.nickname || '',
                inServiceDate: unitDetails.inServiceDate || '',
                trackPreventiveMaintenance: unitDetails.trackPreventiveMaintenance || '',
              };
            }
          }

          return integratedRecord;
        });

        // Calculate stats
        const uniqueCustomers = new Set(integratedRecords.map(r => r.customer).filter(Boolean));
        const uniqueUnits = new Set(integratedRecords.map(r => r.unit || r.unitNickname).filter(Boolean));
        const recordsWithUnitDetails = integratedRecords.filter(r => r.unitDetails).length;

        setRawRecords(integratedRecords);
        setStats({
          totalRecords: integratedRecords.length,
          totalCustomers: uniqueCustomers.size,
          totalUnits: uniqueUnits.size,
          recordsWithUnitDetails,
          recordsWithCustomerDetails: 0 // Not tracking customer details for now
        });
        setLoading(false);

        console.log('✅ Data integration complete:', {
          totalRecords: integratedRecords.length,
          totalCustomers: uniqueCustomers.size,
          totalUnits: uniqueUnits.size,
          withUnitDetails: recordsWithUnitDetails
        });

      } catch (err: any) {
        console.error('Error loading integrated data:', err);
        setError(err.message || 'Failed to load integrated data');
        setLoading(false);
      }
    }

    loadIntegratedDataInChunks();
  }, []);

  return {
    rawRecords,
    loading,
    error,
    stats
  };
}

