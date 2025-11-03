# Lookups Dashboard - Portable Package

A fully-featured, self-contained dashboard for searching and filtering service orders and parts data with advanced filtering capabilities.

## 🎯 Features

- **Dual Lookup Types**: Service Order Lookup & Parts Lookup
- **Advanced Filtering**: Multi-select dropdowns for customers, units, years, makes, models
- **Smart Search**: Searchable dropdowns with real-time filtering
- **Date Range Selection**: Preset date ranges and custom date pickers
- **Responsive UI**: Modern, clean design with Tailwind CSS
- **Performance Optimized**: Memoized components, virtualized tables, debounced search
- **Data Caching**: In-memory caching for instant subsequent loads

## 📦 Package Contents

```
EXTRACTION_PACKAGE/
├── components/
│   ├── LookupsPage.tsx              # Main page component (2500+ lines)
│   ├── LookupsFilterPanel.tsx       # Filter panel UI component
│   ├── MultiSelectDropdown.tsx      # Reusable multi-select dropdown
│   └── SelectedItemsBadge.tsx       # Badge component for selected items
├── hooks/
│   └── useIntegratedDataFromDBOptimized.ts  # Data fetching & caching hook
├── types/
│   └── (TypeScript interfaces - see below)
└── README.md                        # This file
```

## 🚀 Quick Start Integration

### Step 1: Copy Files

Copy the entire `EXTRACTION_PACKAGE` folder into your project:

```bash
# Copy to your src directory
cp -r EXTRACTION_PACKAGE/components/* src/components/lookups/
cp -r EXTRACTION_PACKAGE/hooks/* src/hooks/
```

### Step 2: Install Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

Run: `npm install`

### Step 3: Configure Tailwind CSS

Ensure your `tailwind.config.js` includes the component paths:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/lookups/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 4: Update API Configuration

In `hooks/useIntegratedDataFromDBOptimized.ts`, update the API base URL (line 4):

```typescript
// Change this to your API endpoint
const API_BASE_URL = 'https://your-api-endpoint.com';
```

### Step 5: Integrate into Your App

```typescript
// In your App.tsx or routing file
import LookupsPage from './components/lookups/LookupsPage';

// Add to your routes
<Route path="/lookups" element={<LookupsPage />} />
```

## 🔌 API Requirements

The dashboard expects two API endpoints:

### 1. Revenue/Line Items Data
**Endpoint**: `GET /api/snapshot/line-items` (preferred) or `GET /api/revenue/paginated`

**Response Format**:
```json
[
  {
    "Shop": "Main Shop",
    "Customer": "Customer Name",
    "Customer Group": "Group Name",
    "Unit": "Unit 123",
    "Unit Nickname": "Truck 1",
    "Invoice Date": "2025-01-15",
    "Service Description": "Oil Change",
    "Part Description": "Oil Filter",
    "Part Number": "ABC123",
    "Total": 150.00,
    // ... see API_REQUIREMENTS.md for full schema
  }
]
```

### 2. Customer Units Data
**Endpoint**: `GET /api/customer-units`

**Response Format**:
```json
[
  {
    "unitId": "123",
    "nickname": "Truck 1",
    "vin": "1HGBH41JXMN109186",
    "chassisYear": "2020",
    "chassisMake": "Freightliner",
    "chassisModel": "Cascadia",
    // ... see API_REQUIREMENTS.md for full schema
  }
]
```

## 🎨 Styling

All components use Tailwind CSS classes. Key color schemes:

- **Primary**: Blue (`blue-500`, `blue-600`)
- **Secondary**: Slate gray (`slate-700`, `slate-800`)
- **Accents**: Red, Green, Purple, Yellow for badges
- **Background**: White with subtle gradients
- **Borders**: Slate-200/300

To customize, search and replace color classes in the component files.

## 🔧 Customization

### Change Date Range Defaults

In `LookupsPage.tsx` (lines 15-16):

```typescript
const [fromDate, setFromDate] = useState('2025-01-01'); // Change default
const [toDate, setToDate] = useState('2025-08-31');     // Change default
```

### Add/Remove Lookup Types

In `LookupsFilterPanel.tsx` (lines 257-266), modify the lookup type grid.

### Modify Data Caching

In `useIntegratedDataFromDBOptimized.ts`, the cache is stored in:

```typescript
let lineItemsCache: any[] | null = null;  // Clear by setting to null
```

## 📱 Component Props

### LookupsPage
No props required - fully self-contained.

### LookupsFilterPanel
See `LookupsFilterPanel.tsx` (lines 36-78) for complete prop interface.

## 🐛 Troubleshooting

### Issue: Dropdowns not closing
**Solution**: Ensure click-outside handlers are working. Check z-index conflicts.

### Issue: Data not loading
**Solution**: 
1. Check API_BASE_URL in the hook
2. Verify API endpoints are accessible
3. Check browser console for CORS errors
4. Verify response data format matches expected schema

### Issue: Styling looks broken
**Solution**:
1. Ensure Tailwind CSS is properly configured
2. Run `npm run build:css` or your build command
3. Check that component paths are in tailwind.config.js content array

### Issue: Performance issues with large datasets
**Solution**: 
- The component already uses memoization and virtualization
- For extremely large datasets (>100k records), consider server-side pagination
- Adjust page size in `useIntegratedDataFromDBOptimized.ts` (line 208)

## 📊 Data Flow

```
useIntegratedDataFromDBOptimized Hook
    ↓
1. Check in-memory cache
    ↓ (cache miss)
2. Fetch from /api/snapshot/line-items
    ↓ (or fallback to paginated endpoint)
3. Fetch from /api/customer-units
    ↓
4. Merge & enrich data
    ↓
5. Cache in memory
    ↓
LookupsPage Component
    ↓
Filter & Search Logic (memoized)
    ↓
Display Results (virtualized tables)
```

## 🎯 Performance Features

- **In-Memory Caching**: Data cached on first load, instant subsequent loads
- **Memoization**: Heavy computations memoized with React.memo and useMemo
- **Debounced Search**: 300ms debounce on search inputs
- **Virtualized Tables**: Only renders visible rows (for large datasets)
- **Smart Re-renders**: useCallback for stable function references

## 📄 License

Extracted from Kerry Fleet SaaS project. Modify as needed for your use case.

## 🤝 Support

For issues or questions, refer to the original project documentation or contact the development team.

---

**Last Updated**: October 31, 2025
**Version**: 1.0.0
**Extracted From**: Kerry-Fleet-SaaS/packages/web

