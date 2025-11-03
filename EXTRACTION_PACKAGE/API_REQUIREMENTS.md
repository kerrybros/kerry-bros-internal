# API Requirements

This document describes the API endpoints and data schemas required for the Lookups Dashboard to function properly.

## Overview

The dashboard requires **two API endpoints**:
1. Revenue/Line Items data (large dataset)
2. Customer Units data (smaller reference dataset)

---

## 1. Revenue/Line Items Endpoint

### Primary Endpoint (Recommended)
```
GET /api/snapshot/line-items
```

**Description**: Returns pre-generated snapshot of all revenue line items. Faster than pagination.

**Response Format**: JSON array

**Response Size**: Can be large (10MB+ for 50k+ records)

**Headers**:
```
Content-Type: application/json
```

### Fallback Endpoint (Paginated)
```
GET /api/revenue/paginated?limit=500&cursor=<cursor>
```

**Query Parameters**:
- `limit` (number): Number of records per page (default: 500)
- `cursor` (string, optional): Pagination cursor for next page

**Response Format**:
```json
{
  "rows": [...],      // Array of records (see schema below)
  "hasMore": true,    // Boolean indicating more pages exist
  "cursor": "abc123"  // Cursor for next page
}
```

### Revenue Record Schema

Each record in the response array should have these fields:

```typescript
{
  // Shop & Customer Information
  "Shop": string,                      // Shop location name
  "Customer Group": string,            // Customer group/category
  "Customer": string,                  // Customer company name
  "Customer External ID": string,      // External system ID
  "Credit Terms": string,              // Payment terms
  "Sales Rep": string,                 // Assigned sales representative
  
  // Unit Information
  "Unit": string,                      // Unit identifier
  "Unit Nickname": string,             // Friendly unit name
  "Unit Type": string,                 // Type of unit (Truck, Trailer, etc.)
  "Unit Address": string,              // Unit location/address
  "Unit Miles": string,                // Current mileage
  "Engine Hours": string,              // Engine hours
  
  // Order/Invoice Information
  "Number": string,                    // Invoice number
  "Invoice Date": string,              // Invoice date (YYYY-MM-DD)
  "Order": string,                     // Service order number
  "PO": string,                        // Purchase order number
  "Auth Number": string,               // Authorization number
  "Service Writer": string,            // Service writer name
  "Created Date": string,              // Date created (YYYY-MM-DD)
  "Order Created Date": string,        // Order creation date
  "SOAI ID": string,                   // Service Order Action Item ID
  
  // Line Item Details
  "Type": string,                      // Line item type (Labor, Part, etc.)
  "Item": string,                      // Item identifier
  "Item Display Title": string,        // Display name for item
  "Labor Rate": number,                // Hourly labor rate
  
  // Service Details
  "Complaint Description": string,     // Customer complaint
  "Shop Unit": string,                 // Internal shop unit identifier
  "Cause Type": string,                // Root cause type
  "Severity": string,                  // Issue severity
  "Correction ID": string,             // Correction identifier
  "Service Description": string,       // Service performed
  "Global Service Description": string,// Standardized service description
  "Component": string,                 // Component worked on
  "System": string,                    // System category
  "Date Action Completed": string,     // Completion date
  
  // Parts Details
  "Part Category": string,             // Part category
  "Part Number": string,               // Manufacturer part number
  "Part Description": string,          // Part description
  "Powered by Motor": string,          // Motor information
  
  // Financial Details
  "Qty": number,                       // Quantity
  "Rate": number,                      // Unit rate/price
  "Total": number,                     // Line total (Qty × Rate)
  "Tax Location": string,              // Tax jurisdiction
  "Taxable State": string,             // State for tax
  "Sales Tax": number,                 // Tax amount
  "Part Cost": number,                 // Cost of part
  "Total Cost of Parts": number,       // Total parts cost
  "Parts Margin": number,              // Parts profit margin ($)
  "Parts Margin %": number,            // Parts profit margin (%)
  "Technician Rate": number,           // Tech hourly rate
  "Actual Hours": number,              // Actual labor hours
  "Cost of Labor": number,             // Labor cost
  "Lead Tech": string,                 // Primary technician
  "Taxable Sales": number,             // Taxable sales amount
  "Non Taxable Sales": number,         // Non-taxable sales amount
  "Sales Total": number                // Total sales amount
}
```

### Example Response

```json
[
  {
    "Shop": "Main Shop - Phoenix",
    "Customer Group": "Fleet Customers",
    "Customer": "ABC Trucking Inc",
    "Customer External ID": "CUST-001",
    "Credit Terms": "Net 30",
    "Sales Rep": "John Smith",
    "Unit": "TRUCK-123",
    "Unit Nickname": "Phoenix Hauler 1",
    "Unit Type": "Semi Truck",
    "Unit Address": "123 Fleet St",
    "Unit Miles": "145000",
    "Engine Hours": "8500",
    "Number": "INV-2025-001",
    "Invoice Date": "2025-01-15",
    "Order": "SO-2025-001",
    "PO": "PO-12345",
    "Auth Number": "AUTH-789",
    "Service Writer": "Jane Doe",
    "Created Date": "2025-01-14",
    "Order Created Date": "2025-01-14",
    "SOAI ID": "SOAI-001",
    "Type": "Labor",
    "Item": "LABOR-001",
    "Item Display Title": "Diagnostic Labor",
    "Labor Rate": 125.00,
    "Complaint Description": "Engine making noise",
    "Shop Unit": "BAY-3",
    "Cause Type": "Wear and Tear",
    "Severity": "Medium",
    "Correction ID": "CORR-001",
    "Service Description": "Diagnosed engine noise issue",
    "Global Service Description": "Engine Diagnostic",
    "Component": "Engine",
    "System": "Powertrain",
    "Date Action Completed": "2025-01-15",
    "Part Category": "",
    "Part Number": "",
    "Part Description": "",
    "Powered by Motor": "",
    "Qty": 2.5,
    "Rate": 125.00,
    "Total": 312.50,
    "Tax Location": "Phoenix, AZ",
    "Taxable State": "AZ",
    "Sales Tax": 25.00,
    "Part Cost": 0,
    "Total Cost of Parts": 0,
    "Parts Margin": 0,
    "Parts Margin %": 0,
    "Technician Rate": 35.00,
    "Actual Hours": 2.5,
    "Cost of Labor": 87.50,
    "Lead Tech": "Mike Johnson",
    "Taxable Sales": 312.50,
    "Non Taxable Sales": 0,
    "Sales Total": 337.50
  }
]
```

---

## 2. Customer Units Endpoint

```
GET /api/customer-units
```

**Description**: Returns all customer units with detailed information.

**Response Format**: JSON array

### Customer Unit Schema

```typescript
{
  "unitId": string,                    // Unique unit identifier
  "nickname": string,                  // Friendly unit name
  "vin": string,                       // Vehicle Identification Number
  "chassisYear": string,               // Chassis year
  "chassisMake": string,               // Chassis manufacturer
  "chassisModel": string,              // Chassis model
  "engineYear": string,                // Engine year
  "engineMake": string,                // Engine manufacturer
  "engineModel": string,               // Engine model
  "engineSerialNumber": string,        // Engine serial number
  "mileage": string,                   // Current mileage
  "tireSize": string,                  // Tire size specification
  "unitType": string,                  // Unit type (Truck, Trailer, etc.)
  "unitSubtype": string,               // Unit subtype
  "licensePlate": string,              // License plate number
  "licensePlateState": string,         // License plate state
  "fleetNumber": string,               // Fleet number
  "inServiceDate": string,             // Date unit entered service
  "trackPreventiveMaintenance": string // PM tracking flag
}
```

### Example Response

```json
[
  {
    "unitId": "UNIT-001",
    "nickname": "Phoenix Hauler 1",
    "vin": "1HGBH41JXMN109186",
    "chassisYear": "2020",
    "chassisMake": "Freightliner",
    "chassisModel": "Cascadia",
    "engineYear": "2020",
    "engineMake": "Detroit Diesel",
    "engineModel": "DD15",
    "engineSerialNumber": "DD15-123456",
    "mileage": "145000",
    "tireSize": "11R22.5",
    "unitType": "Semi Truck",
    "unitSubtype": "Class 8 Sleeper",
    "licensePlate": "ABC1234",
    "licensePlateState": "AZ",
    "fleetNumber": "001",
    "inServiceDate": "2020-03-15",
    "trackPreventiveMaintenance": "Yes"
  }
]
```

---

## Data Integration

The hook (`useIntegratedDataFromDBOptimized.ts`) performs the following:

1. **Fetches Revenue Data**: Loads all line items from primary or fallback endpoint
2. **Fetches Unit Data**: Loads all customer units
3. **Creates Lookup Maps**: Indexes units by ID and nickname for fast lookup
4. **Enriches Records**: Matches revenue records with unit details
5. **Caches Results**: Stores in memory for instant subsequent loads

### Matching Logic

Revenue records are enriched with unit details by matching:
- Revenue `Unit` or `Unit Nickname` → Customer Unit `nickname` (case-insensitive)

If a match is found, the revenue record gets enhanced with `unitDetails` object containing all customer unit fields.

---

## Performance Considerations

### Recommended Approach
- **Pre-generate snapshots**: Create `/api/snapshot/line-items` endpoint that serves a pre-generated JSON file
- **Update periodically**: Regenerate snapshot every hour/day based on data freshness needs
- **Compress responses**: Use gzip compression for large responses

### Fallback Pagination
- Use cursor-based pagination (not offset-based) for better performance
- Page size of 500-1000 records recommended
- Implement proper database indexing on frequently queried fields

### CORS Configuration

Ensure your API allows requests from the frontend domain:

```javascript
// Example Express.js CORS config
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
  methods: ['GET'],
  credentials: true
}));
```

---

## Error Handling

The hook handles these error scenarios:
- **Network failures**: Displays error message to user
- **Invalid response format**: Logs error and shows graceful failure
- **Missing data**: Continues with partial data when possible

### Expected Error Responses

```json
{
  "error": "Error message here",
  "statusCode": 500
}
```

---

## Testing Your API

### Test Endpoint Availability

```bash
# Test line-items snapshot
curl https://your-api.com/api/snapshot/line-items

# Test customer units
curl https://your-api.com/api/customer-units

# Test paginated endpoint
curl https://your-api.com/api/revenue/paginated?limit=10
```

### Validate Response Format

Ensure:
- ✅ Response is valid JSON
- ✅ Arrays are returned (not objects)
- ✅ Field names match exactly (case-sensitive)
- ✅ Numeric fields are numbers (not strings)
- ✅ Date fields are in YYYY-MM-DD format

---

## Migration from Existing API

If you have an existing API with different field names or structure:

1. **Option A - Transform on Backend**: Modify your API to return data in the expected format
2. **Option B - Transform in Hook**: Modify `useIntegratedDataFromDBOptimized.ts` to map your field names to expected names

Example mapping (lines 249-308 in the hook):

```typescript
const integratedRecord: IntegratedRecord = {
  shop: revenueRecord.Shop || '',           // Map "Shop" → shop
  customer: revenueRecord.Customer || '',   // Map "Customer" → customer
  // ... etc
};
```

---

**Last Updated**: October 31, 2025

