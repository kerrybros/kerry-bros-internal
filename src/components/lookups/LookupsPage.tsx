import { memo, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useIntegratedDataFromDBOptimized } from '../../hooks/useIntegratedDataFromDBOptimized';

const LookupsPage = memo(function LookupsPage() {
  const integratedData = useIntegratedDataFromDBOptimized();

  // Refs for individual dropdown containers
  const customerDropdownRef = useRef<HTMLDivElement>(null);
  const unitDropdownRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const makeDropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  // Date range state
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-08-31');
  const [currentPreset, setCurrentPreset] = useState('');

  // Lookup type state
  const [lookupType, setLookupType] = useState<'service-order' | 'parts'>('service-order');
  const [searchType, setSearchType] = useState<'description' | 'partNumber'>('description');

  // Separate filter states for each tab
  const [serviceOrderFilters, setServiceOrderFilters] = useState({
    unitFilter: '',
    unitMakeFilter: '',
    unitModelFilter: '',
    unitYearFilter: '',
    customerFilter: '',
    selectedCustomers: [] as string[],
    selectedUnits: [] as string[],
    selectedYears: [] as string[],
    selectedMakes: [] as string[],
    selectedModels: [] as string[],
    customerSearchTerm: '',
    unitSearchTerm: '',
    yearSearchTerm: '',
    makeSearchTerm: '',
    modelSearchTerm: '',
    lookupSearchTerm: '',
    debouncedLookupSearchTerm: ''
  });

  const [partsFilters, setPartsFilters] = useState({
    unitFilter: '',
    unitMakeFilter: '',
    unitModelFilter: '',
    unitYearFilter: '',
    customerFilter: '',
    selectedCustomers: [] as string[],
    selectedUnits: [] as string[],
    selectedYears: [] as string[],
    selectedMakes: [] as string[],
    selectedModels: [] as string[],
    customerSearchTerm: '',
    unitSearchTerm: '',
    yearSearchTerm: '',
    makeSearchTerm: '',
    modelSearchTerm: '',
    lookupSearchTerm: '',
    debouncedLookupSearchTerm: ''
  });

  // Current active filters based on tab
  const currentFilters = lookupType === 'service-order' ? serviceOrderFilters : partsFilters;
  const setCurrentFilters = lookupType === 'service-order' ? setServiceOrderFilters : setPartsFilters;

  // Individual search terms (derived from current filters)
  const customerSearchTerm = currentFilters.customerSearchTerm;
  const unitSearchTerm = currentFilters.unitSearchTerm;
  const yearSearchTerm = currentFilters.yearSearchTerm;
  const makeSearchTerm = currentFilters.makeSearchTerm;
  const modelSearchTerm = currentFilters.modelSearchTerm;
  const lookupSearchTerm = currentFilters.lookupSearchTerm;
  const debouncedLookupSearchTerm = currentFilters.debouncedLookupSearchTerm;

  // Search term setters
  const setCustomerSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, customerSearchTerm: value }));
  }, [setCurrentFilters]);

  const setUnitSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, unitSearchTerm: value }));
  }, [setCurrentFilters]);

  const setYearSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, yearSearchTerm: value }));
  }, [setCurrentFilters]);

  const setMakeSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, makeSearchTerm: value }));
  }, [setCurrentFilters]);

  const setModelSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, modelSearchTerm: value }));
  }, [setCurrentFilters]);

  const setLookupSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, lookupSearchTerm: value }));
  }, [setCurrentFilters]);

  const setDebouncedLookupSearchTerm = useCallback((value: string) => {
    setCurrentFilters(prev => ({ ...prev, debouncedLookupSearchTerm: value }));
  }, [setCurrentFilters]);

  // Dropdown states
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMakeDropdown, setShowMakeDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Function to close all dropdowns
  const closeAllDropdowns = useCallback(() => {
    setShowCustomerDropdown(false);
    setShowUnitDropdown(false);
    setShowYearDropdown(false);
    setShowMakeDropdown(false);
    setShowModelDropdown(false);
  }, []);

  // Function to open a specific dropdown and close others
  const openDropdown = useCallback((dropdownName: string) => {
    closeAllDropdowns();
    switch (dropdownName) {
      case 'customer':
        setShowCustomerDropdown(true);
        break;
      case 'unit':
        setShowUnitDropdown(true);
        break;
      case 'year':
        setShowYearDropdown(true);
        break;
      case 'make':
        setShowMakeDropdown(true);
        break;
      case 'model':
        setShowModelDropdown(true);
        break;
    }
  }, [closeAllDropdowns]);

  // Individual click outside handlers for each dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check each dropdown individually
      if (showCustomerDropdown && customerDropdownRef.current && !customerDropdownRef.current.contains(target)) {
        setShowCustomerDropdown(false);
      }
      if (showUnitDropdown && unitDropdownRef.current && !unitDropdownRef.current.contains(target)) {
        setShowUnitDropdown(false);
      }
      if (showYearDropdown && yearDropdownRef.current && !yearDropdownRef.current.contains(target)) {
        setShowYearDropdown(false);
      }
      if (showMakeDropdown && makeDropdownRef.current && !makeDropdownRef.current.contains(target)) {
        setShowMakeDropdown(false);
      }
      if (showModelDropdown && modelDropdownRef.current && !modelDropdownRef.current.contains(target)) {
        setShowModelDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showCustomerDropdown, showUnitDropdown, showYearDropdown, showMakeDropdown, showModelDropdown]);

  // Function to clean mileage values (remove quotes and format)
  const cleanMileage = useCallback((mileage: any) => {
    if (!mileage || mileage === '' || mileage === 'N/A' || mileage === '0') return 'N/A';
    
    // Convert to string and remove quotes, commas, and whitespace
    const cleanValue = String(mileage).replace(/['"`,\s]/g, '').trim();
    
    // If empty after cleaning, return N/A
    if (!cleanValue) return 'N/A';
    
    const numValue = parseFloat(cleanValue);
    
    // Return formatted number or N/A if not a valid positive number
    if (!isNaN(numValue) && numValue > 1) { // Changed from > 0 to > 1 to exclude "1" values
      return numValue.toLocaleString();
    }
    
    return 'N/A';
  }, []);

  // Simple substring matching function
  const simpleMatch = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm || !text) return false;
    
    // Clean both strings - trim spaces and normalize
    const cleanText = text.toLowerCase().trim();
    const cleanSearch = searchTerm.toLowerCase().trim();
    
    // Simple substring match
    return cleanText.includes(cleanSearch);
  }, []);

  // Specialized fuzzy search for part numbers/SKUs
  const partNumberFuzzyMatch = useCallback((partNumber: string, searchTerm: string) => {
    if (!searchTerm || !partNumber) return false;

    // Normalize function for part numbers
    const normalize = (str: string) => {
      return str
        .toLowerCase()
        .trim()
        // Remove common separators and special characters
        .replace(/[-_\s\.\/\\]/g, '')
        // Keep only alphanumeric characters
        .replace(/[^a-z0-9]/g, '');
    };

    const normalizedPart = normalize(partNumber);
    const normalizedSearch = normalize(searchTerm);

    // 1. Exact match after normalization
    if (normalizedPart === normalizedSearch) return true;

    // 2. Contains match after normalization
    if (normalizedPart.includes(normalizedSearch)) return true;

    // 3. Handle spaced search terms (like "H D" -> "HD")
    const spacedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
    if (normalize(partNumber).includes(spacedSearch)) return true;

    // 4. Word boundary matching (for partial matches)
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    if (searchWords.length > 1) {
      const allWordsMatch = searchWords.every(word => {
        const normalizedWord = normalize(word);
        return normalizedPart.includes(normalizedWord);
      });
      if (allWordsMatch) return true;
    }

    // 5. Handle leading zeros variations (e.g., "01" vs "1")
    const removeLeadingZeros = (str: string) => str.replace(/^0+/, '') || '0';
    const partWithoutZeros = removeLeadingZeros(normalizedPart);
    const searchWithoutZeros = removeLeadingZeros(normalizedSearch);
    if (partWithoutZeros.includes(searchWithoutZeros)) return true;

    // 6. Prefix matching for common part number patterns
    if (normalizedPart.startsWith(normalizedSearch) || normalizedSearch.startsWith(normalizedPart)) {
      return true;
    }

    return false;
  }, []);

  // Function to highlight search terms in text
  const highlightSearchTerm = useCallback((text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold text-slate-900">
          {part}
        </span>
      ) : part
    );
  }, []);

  // Pagination and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [sortColumn, setSortColumn] = useState('invoiceDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Invoice detail modal state
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<any>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLookupSearchTerm(lookupSearchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [lookupSearchTerm]);

  // Date presets
  const datePresets = useMemo(() => [
    { label: 'Last 30 Days', value: 'last-30-days' },
    { label: 'Last 90 Days', value: 'last-90-days' },
    { label: 'Year to Date', value: 'year-to-date' },
    { label: 'Last Year', value: 'last-year' },
    { label: 'Custom', value: 'custom' }
  ], []);

  // Helper function to format dates as MM-DD-YY
  const formatDateMMDDYY = (date: Date | string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${month}-${day}-${year}`;
  };

  // Get unique values
  // Memoize expensive unique value calculations
  const uniqueValues = useMemo(() => {
    if (!integratedData.rawRecords) return {
      customers: [],
      units: [],
      years: [],
      makes: [],
      models: []
    };

    const customers = new Set<string>();
    const units = new Set<string>();
    const years = new Set<string>();
    const makes = new Set<string>();
    const models = new Set<string>();
    
    integratedData.rawRecords.forEach((record: any) => {
      if (record.customer && record.customer.trim()) {
        customers.add(record.customer.trim());
      }
      if (record.unit && record.unit.trim()) {
        units.add(record.unit.trim());
      }
      // Access unit details from the unitDetails object
      if (record.unitDetails?.chassisYear && record.unitDetails.chassisYear.trim()) {
        years.add(record.unitDetails.chassisYear.trim());
      }
      if (record.unitDetails?.chassisMake && record.unitDetails.chassisMake.trim()) {
        makes.add(record.unitDetails.chassisMake.trim());
      }
      if (record.unitDetails?.chassisModel && record.unitDetails.chassisModel.trim()) {
        models.add(record.unitDetails.chassisModel.trim());
      }
    });
    
    return {
      customers: Array.from(customers).sort(),
      units: Array.from(units).sort(),
      years: Array.from(years).sort(),
      makes: Array.from(makes).sort(),
      models: Array.from(models).sort()
    };
  }, [integratedData.rawRecords]);

  const getUniqueCustomers = useMemo(() => {
    if (!integratedData.rawRecords) return [];
    
    // If no unit filters are selected, return all customers
    if (currentFilters.selectedUnits.length === 0 && 
        currentFilters.selectedYears.length === 0 && 
        currentFilters.selectedMakes.length === 0 && 
        currentFilters.selectedModels.length === 0) {
    return uniqueValues.customers;
    }
    
    const customers = new Set<string>();
    integratedData.rawRecords
      .filter((record: any) => {
        // Filter by selected units if any are selected
        if (currentFilters.selectedUnits.length > 0 && 
            !currentFilters.selectedUnits.includes(record.unit)) {
          return false;
        }
        
        // Filter by selected years if any are selected
        if (currentFilters.selectedYears.length > 0 && 
            !currentFilters.selectedYears.includes(record.unitDetails?.chassisYear)) {
          return false;
        }
        
        // Filter by selected makes if any are selected
        if (currentFilters.selectedMakes.length > 0 && 
            !currentFilters.selectedMakes.includes(record.unitDetails?.chassisMake)) {
          return false;
        }
        
        // Filter by selected models if any are selected
        if (currentFilters.selectedModels.length > 0 && 
            !currentFilters.selectedModels.includes(record.unitDetails?.chassisModel)) {
          return false;
        }
        
        return true;
      })
      .forEach((record: any) => {
        if (record.customer && record.customer.trim()) {
          customers.add(record.customer.trim());
        }
      });
    
    return Array.from(customers).sort();
  }, [uniqueValues.customers, integratedData.rawRecords, currentFilters.selectedUnits, currentFilters.selectedYears, currentFilters.selectedMakes, currentFilters.selectedModels]);

  const getUniqueUnits = useCallback(() => {
    if (!integratedData.rawRecords) return [];
    
    const units = new Set<string>();
    integratedData.rawRecords
      .filter((record: any) => {
        // Filter by selected customers if any are selected
        if (currentFilters.selectedCustomers.length > 0 && 
            !currentFilters.selectedCustomers.includes(record.customer)) {
          return false;
        }
        
        // Filter by selected years if any are selected
        if (currentFilters.selectedYears.length > 0 && 
            !currentFilters.selectedYears.includes(record.unitDetails?.chassisYear)) {
          return false;
        }
        
        // Filter by selected makes if any are selected
        if (currentFilters.selectedMakes.length > 0 && 
            !currentFilters.selectedMakes.includes(record.unitDetails?.chassisMake)) {
          return false;
        }
        
        // Filter by selected models if any are selected
        if (currentFilters.selectedModels.length > 0 && 
            !currentFilters.selectedModels.includes(record.unitDetails?.chassisModel)) {
          return false;
        }
        
        return true;
      })
      .forEach((record: any) => {
        if (record.unit && record.unit.trim()) {
          units.add(record.unit.trim());
        }
      });
    return Array.from(units).sort();
  }, [integratedData.rawRecords, currentFilters.selectedCustomers, currentFilters.selectedYears, currentFilters.selectedMakes, currentFilters.selectedModels]);

  const getUniqueUnitDetails = useMemo(() => {
    if (!integratedData.rawRecords) return { years: [], makes: [], models: [] };
    
    const years = new Set<string>();
    const makes = new Set<string>();
    const models = new Set<string>();
    
    integratedData.rawRecords
      .filter((record: any) => {
        // Filter by selected customers if any are selected
        if (currentFilters.selectedCustomers.length > 0 && 
            !currentFilters.selectedCustomers.includes(record.customer)) {
          return false;
        }
        
        // Filter by selected units if any are selected
        if (currentFilters.selectedUnits.length > 0 && 
            !currentFilters.selectedUnits.includes(record.unit)) {
          return false;
        }
        
        // For years: filter by selected makes and models (but not years)
        // For makes: filter by selected years and models (but not makes)
        // For models: filter by selected years and makes (but not models)
        
        return true;
      })
      .forEach((record: any) => {
        // Collect years (filter by makes/models but not years)
        if (record.unitDetails?.chassisYear && record.unitDetails.chassisYear.trim()) {
          let includeYear = true;
          if (currentFilters.selectedMakes.length > 0 && 
              !currentFilters.selectedMakes.includes(record.unitDetails.chassisMake)) {
            includeYear = false;
          }
          if (currentFilters.selectedModels.length > 0 && 
              !currentFilters.selectedModels.includes(record.unitDetails.chassisModel)) {
            includeYear = false;
          }
          if (includeYear) {
            years.add(record.unitDetails.chassisYear.trim());
          }
        }
        
        // Collect makes (filter by years/models but not makes)
        if (record.unitDetails?.chassisMake && record.unitDetails.chassisMake.trim()) {
          let includeMake = true;
          if (currentFilters.selectedYears.length > 0 && 
              !currentFilters.selectedYears.includes(record.unitDetails.chassisYear)) {
            includeMake = false;
          }
          if (currentFilters.selectedModels.length > 0 && 
              !currentFilters.selectedModels.includes(record.unitDetails.chassisModel)) {
            includeMake = false;
          }
          if (includeMake) {
            makes.add(record.unitDetails.chassisMake.trim());
          }
        }
        
        // Collect models (filter by years/makes but not models)
        if (record.unitDetails?.chassisModel && record.unitDetails.chassisModel.trim()) {
          let includeModel = true;
          if (currentFilters.selectedYears.length > 0 && 
              !currentFilters.selectedYears.includes(record.unitDetails.chassisYear)) {
            includeModel = false;
          }
          if (currentFilters.selectedMakes.length > 0 && 
              !currentFilters.selectedMakes.includes(record.unitDetails.chassisMake)) {
            includeModel = false;
          }
          if (includeModel) {
            models.add(record.unitDetails.chassisModel.trim());
          }
        }
    });
    
    return {
      years: Array.from(years).sort(),
      makes: Array.from(makes).sort(),
      models: Array.from(models).sort()
    };
  }, [integratedData.rawRecords, currentFilters.selectedCustomers, currentFilters.selectedUnits, currentFilters.selectedYears, currentFilters.selectedMakes, currentFilters.selectedModels]);

  // Update current filter
  const updateCurrentFilter = useCallback((key: string, value: any) => {
    setCurrentFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setCurrentFilters]);

  // Get current filters
  const getCurrentFilters = useCallback(() => currentFilters, [currentFilters]);

  // Handle date preset change
  const handleDatePresetChange = useCallback((preset: string) => {
    const today = new Date();
    let from: Date, to: Date;

    switch (preset) {
      case 'last-30-days':
        from = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        to = today;
        break;
      case 'last-90-days':
        from = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        to = today;
        break;
      case 'year-to-date':
        from = new Date(today.getFullYear(), 0, 1);
        to = today;
        break;
      case 'last-year':
        from = new Date(today.getFullYear() - 1, 0, 1);
        to = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        return;
    }

    const fromStr = from.toISOString().split('T')[0];
    const toStr = to.toISOString().split('T')[0];
    
    setFromDate(fromStr);
    setToDate(toStr);
    setCurrentPreset(preset);
  }, []);

  // Handle sorting
  const handleLookupSort = useCallback((column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  }, [sortColumn, sortDirection]);

  // Handle invoice detail modal
  const handleRecordClick = useCallback((record: any) => {
    setSelectedInvoiceData({
      invoiceNumber: record.number,
      customer: record.customer,
      unit: record.unit,
      unitMake: record.unitDetails?.chassisMake || '',
      unitModel: record.unitDetails?.chassisModel || '',
      unitYear: record.unitDetails?.chassisYear || '',
      shop: record.shop,
      invoiceDate: record.invoiceDate,
      total: record.total,
      laborEfficiency: record.laborEfficiency,
      partsMargin: record.partsMargin,
      order: record.order
    });
    setShowInvoiceDetail(true);
  }, []);

  const closeInvoiceDetail = useCallback(() => {
    setShowInvoiceDetail(false);
    setSelectedInvoiceData(null);
  }, []);

  // Function to get detailed invoice data
  const getInvoiceDetails = useCallback((invoiceNumber: string) => {
    // Get all records for this invoice
    const invoiceRecords = integratedData.rawRecords?.filter((record: any) => record.number === invoiceNumber) || []
    
    
    // Separate items by type
    const laborItems: any[] = []
    const partItems: any[] = []
    let shopSuppliesTotal = 0
    
    // Group by service description to organize labor and parts together
    const serviceGroups = new Map()
    
    invoiceRecords.forEach((record: any) => {
      if (record.type === 'Shop Supplies') {
        shopSuppliesTotal += record.total || 0
        return // Skip adding shop supplies to the line items
      }
      
      // Use the service description from the record, or 'General Service' if empty
      const serviceDesc = record.serviceDescription || 'General Service'
      
      // Debug logging for service description
      if (!record.serviceDescription) {
        console.log('Missing serviceDescription for record:', {
          type: record.type,
          item: record.item,
          serviceDescription: record.serviceDescription,
          globalServiceDescription: record.globalServiceDescription,
          partDescription: record.partDescription,
          complaintDescription: record.complaintDescription
        });
      }
      
      if (!serviceGroups.has(serviceDesc)) {
        serviceGroups.set(serviceDesc, {
          serviceDescription: serviceDesc,
          complaintDescription: record.complaintDescription || '',
          laborItems: [],
          partItems: []
        })
      }
      
      const group = serviceGroups.get(serviceDesc)
      
      if (record.type === 'Labor') {
        // For Quality Control entries, group them all together regardless of rate
        // For other labor entries, group by rate within the service
        const isQualityControl = record.globalServiceDescription === 'QUALITY CONTROL';
        const groupingKey = isQualityControl ? 'QUALITY_CONTROL' : (record.laborRate || 0);
        const existingLabor = group.laborItems.find((item: any) => {
          if (isQualityControl) {
            return item.isQualityControl === true;
          } else {
            return item.laborRate === groupingKey;
          }
        });
        
        if (existingLabor) {
          existingLabor.qty += record.qty || 0;
          existingLabor.amount += record.total || 0;
          existingLabor.actualHours += record.actualHours || 0;
          // Keep the first rate found for this labor rate group
        } else {
          const laborItem = {
            item: 'Labor',
            description: serviceDesc,
            qty: record.qty || 0,
            rate: record.rate || 0,
            laborRate: record.laborRate || 0,
            technicianRate: record.technicianRate || 0,
            amount: record.salesTotal || record.total || 0,
            actualHours: record.actualHours || 0,
            isQualityControl: isQualityControl
          };
          
          
          group.laborItems.push(laborItem);
        }
      } else if (record.type === 'Part') {
        // Group parts by part description, part number, AND rate (price)
        // Only parts with same description, number, and price should be grouped
        const partDescription = record.partDescription || 'Part';
        const partNumber = record.partNumber || '';
        const partRate = parseFloat(record.rate) || 0;
        const partKey = `${partDescription}|${partNumber}|${partRate.toFixed(2)}`; // Include rate in grouping key
        
        // Keep separate for 2-column display
        const displayDescription = partDescription;
        
        const existingPart = group.partItems.find((item: any) => 
          item.partKey === partKey
        );
        
        if (existingPart) {
          // Group parts together only if they have the same price
          existingPart.qty += record.qty || 0;
          existingPart.amount += record.salesTotal || record.total || 0;
          // Rate stays the same since we're only grouping same-priced items
          // Part cost stays the same (unit cost) - don't sum it
          // existingPart.partCost += record.partCost || 0; // REMOVED - don't sum part cost
          // Margin percentage should be the same for same-priced items
        } else {
          // Add new part item
          const partItem = {
            item: 'Part',
            description: displayDescription,
            partKey: partKey,
            partNumber: partNumber,
            qty: record.qty || 0,
            rate: partRate,
            amount: record.salesTotal || record.total || 0,
            partsMarginPercent: record.partsMarginPercent || 0,
            partCost: record.partCost || 0
          };
          
          
          group.partItems.push(partItem);
        }
      }
    })
    
    // Flatten all items into a single array for display, keeping service groups
    const allItems: any[] = []
    const serviceGroupsArray = Array.from(serviceGroups.values())
    
    serviceGroupsArray.forEach((group, groupIndex) => {
      // Add complaint line first if there's a complaint description
      if (group.complaintDescription) {
        allItems.push({
          item: 'Complaint',
          description: group.complaintDescription,
          qty: '',
          rate: '',
          amount: '',
          isComplaintLine: true,
          isFirstInGroup: true,
          isLastInGroup: false,
          groupIndex: groupIndex
        })
      }
      
      // Add labor items
      group.laborItems.forEach((labor: any, itemIndex: number) => {
        // Calculate labor efficiency for this item
        // If no invoiced hours (qty = 0), efficiency should be blank
        const efficiency = labor.qty > 0 && labor.actualHours > 0 ? (labor.qty / labor.actualHours) * 100 : undefined
        
        const laborWithEfficiency = {
          ...labor,
          efficiency: efficiency,
          isFirstInGroup: !group.complaintDescription && itemIndex === 0,
          isLastInGroup: itemIndex === group.laborItems.length - 1 && group.partItems.length === 0,
          groupIndex: groupIndex
        }
        
        allItems.push(laborWithEfficiency)
        laborItems.push(laborWithEfficiency)
      })
      
      // Then add part items for this service
      group.partItems.forEach((part: any, itemIndex: number) => {
        allItems.push({
          ...part,
          isFirstInGroup: !group.complaintDescription && group.laborItems.length === 0 && itemIndex === 0,
          isLastInGroup: itemIndex === group.partItems.length - 1,
          groupIndex: groupIndex
        })
        partItems.push(part)
      })
    })
    
    // Calculate labor efficiency for the whole invoice
    const totalActualHours = laborItems.reduce((sum: number, item: any) => sum + (item.actualHours || 0), 0)
    const totalBilledHours = laborItems.reduce((sum: number, item: any) => sum + (item.qty || 0), 0)
    const invoiceLaborEfficiency = totalActualHours > 0 ? (totalBilledHours / totalActualHours) * 100 : 0

    // Calculate overall parts margin for the invoice (weighted average)
    const partItemsOnly = partItems.filter((item: any) => item.amount > 0)
    const totalPartsAmount = partItemsOnly.reduce((sum: number, item: any) => sum + item.amount, 0)
    const weightedPartsMargin = partItemsOnly.reduce((sum: number, item: any) => {
      const weight = item.amount / totalPartsAmount
      return sum + ((item.partsMarginPercent || 0) * weight)
    }, 0)
    const invoicePartsMargin = totalPartsAmount > 0 ? weightedPartsMargin : 0


    // Calculate correct totals
    const partRecords = invoiceRecords.filter((record: any) => record.type === 'Part');
    
    // Use total column (before tax) for parts total calculation
    const correctPartsTotal = partRecords
      .reduce((sum: number, record: any) => sum + (parseFloat(record.total) || 0), 0);
    
    const correctInvoiceTotal = invoiceRecords
      .reduce((sum: number, record: any) => sum + (parseFloat(record.salesTotal) || parseFloat(record.total) || 0), 0);

    return {
      records: invoiceRecords,
      laborItems: allItems, // Now contains both labor and parts
      laborTotal: laborItems.reduce((sum: number, item: any) => sum + item.amount, 0),
      partsTotal: correctPartsTotal,
      shopSuppliesTotal: shopSuppliesTotal,
      correctInvoiceTotal: correctInvoiceTotal,
      invoiceLaborEfficiency: invoiceLaborEfficiency,
      invoicePartsMargin: invoicePartsMargin,
      invoiceInfo: (() => {
        const baseInfo = invoiceRecords[0] || {};
        
        // Find the best mileage value from all records (prefer non-empty, non-"1" values)
        const mileageValues = invoiceRecords
          .map((record: any) => record.unitMiles || record.mileage)
          .filter((mileage: any) => mileage && mileage !== '' && mileage !== '1' && mileage !== 'N/A')
          .sort((a: any, b: any) => {
            // Prefer numeric values over non-numeric, and larger numbers over smaller
            const aNum = parseFloat(String(a).replace(/['"`,\s]/g, ''));
            const bNum = parseFloat(String(b).replace(/['"`,\s]/g, ''));
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return bNum - aNum; // Larger numbers first
            }
            if (!isNaN(aNum)) return -1; // Numeric values first
            if (!isNaN(bNum)) return 1;
            return 0;
          });
        
        const bestMileage = mileageValues.length > 0 ? mileageValues[0] : baseInfo.unitMiles;
        
        return {
          ...baseInfo,
          unitMiles: bestMileage,
          mileage: bestMileage
        };
      })()
    }
  }, [integratedData]);

  // Filter and process records
  const filteredRecords = useMemo(() => {
    if (!integratedData.rawRecords) return [];

    let filtered = integratedData.rawRecords.filter((record: any) => {
      // Date range filter
      const recordDate = new Date(record.invoiceDate);
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      if (recordDate < fromDateObj || recordDate > toDateObj) return false;

      // Filter by record type for service order lookup (only show Labor records)
      if (lookupType === 'service-order' && record.type !== 'Labor') {
        return false;
      }
      
      // Filter by record type for parts lookup (only show Part records)
      if (lookupType === 'parts' && record.type !== 'Part') {
        return false;
      }
      
      // For parts lookup, exclude records with 0 or undefined quantity
      if (lookupType === 'parts' && (!record.qty || record.qty === 0)) {
        return false;
      }

      // Customer filter
      if (currentFilters.selectedCustomers.length > 0) {
        if (!currentFilters.selectedCustomers.includes(record.customer)) return false;
      }

      // Unit filter
      if (currentFilters.selectedUnits.length > 0) {
        if (!currentFilters.selectedUnits.includes(record.unit)) return false;
      }

      // Year filter
      if (currentFilters.selectedYears.length > 0) {
        if (!currentFilters.selectedYears.includes(record.unitDetails?.chassisYear || '')) return false;
      }

      // Make filter
      if (currentFilters.selectedMakes.length > 0) {
        if (!currentFilters.selectedMakes.includes(record.unitDetails?.chassisMake || '')) return false;
      }

      // Model filter
      if (currentFilters.selectedModels.length > 0) {
        if (!currentFilters.selectedModels.includes(record.unitDetails?.chassisModel || '')) return false;
      }

      return true;
    });

    // Apply search term filter with simple substring matching
    if (debouncedLookupSearchTerm) {
      const searchTerm = debouncedLookupSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((record: any) => {
        if (lookupType === 'service-order') {
          return simpleMatch(record.serviceDescription || '', searchTerm) ||
                 simpleMatch(record.globalServiceDescription || '', searchTerm);
        } else {
          // Parts lookup
          if (searchType === 'description') {
            return simpleMatch(record.description || '', searchTerm);
          } else {
            return partNumberFuzzyMatch(record.partNumber || '', searchTerm) ||
                   partNumberFuzzyMatch(record.item || '', searchTerm);
          }
        }
      });
    }

    return filtered;
  }, [integratedData.rawRecords, fromDate, toDate, currentFilters, debouncedLookupSearchTerm, lookupType, searchType, simpleMatch, partNumberFuzzyMatch]);

  // Process records based on lookup type
  const processedRecords = useMemo(() => {
    // Both service orders and parts show individual records (no grouping)
    return filteredRecords;
  }, [filteredRecords]);

  // Sort records
  const sortedRecords = useMemo(() => {
    if (!processedRecords.length) return [];

    return [...processedRecords].sort((a: any, b: any) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Handle numeric sorting
      if (['total', 'laborHours', 'qty', 'rate'].includes(sortColumn)) {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      // Handle date sorting
      if (sortColumn === 'invoiceDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [processedRecords, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, endIndex);

  // Check if should show "Ready to search" state
  const hasActiveFilters = currentFilters.selectedCustomers.length > 0 || 
                          currentFilters.selectedUnits.length > 0 || 
                          currentFilters.selectedYears.length > 0 || 
                          currentFilters.selectedMakes.length > 0 || 
                          currentFilters.selectedModels.length > 0 || 
                          lookupSearchTerm.length > 0;

  const shouldShowReadyToSearch = !hasActiveFilters;

  // Loading state
  if (integratedData.loading) {
    return (
      <div className="p-6 space-y-6 relative pt-16">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading lookup data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (integratedData.error) {
    return (
      <div className="p-6 space-y-6 relative pt-16">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-600 mb-4">⚠️</div>
            <p className="text-red-600 mb-2">Error loading lookup data</p>
            <p className="text-slate-500 text-sm">{integratedData.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 space-y-6 relative pt-16">
      {/* Filters Section - Sticky above the main content */}
      <div className="sticky top-4 z-40 bg-white border border-slate-200 rounded-xl shadow-lg w-full mx-4 mb-4">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between space-x-4">
            {/* Left Section - Date Range Filters */}
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-slate-700">Filters</div>
              
              {/* Preset Dropdown */}
              <div className="flex items-center space-x-1">
                <label className="text-sm text-slate-600">Preset:</label>
                <select
                  value={currentPreset}
                  onChange={(e) => handleDatePresetChange(e.target.value)}
                  className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white transition-colors"
                >
                  <option value="">Select preset...</option>
                  <option value="custom">Custom</option>
                  {datePresets.map(preset => (
                    <option key={preset.value} value={preset.value}>{preset.label}</option>
                  ))}
                </select>
      </div>

              {/* From Date */}
              <div className="flex items-center space-x-1">
                <label className="text-sm text-slate-600">From:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      setFromDate(e.target.value);
                      setCurrentPreset('custom');
                    }}
                  className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white transition-colors"
                  min="2025-01-01"
                  max="2025-12-31"
                />
              </div>
              
              {/* To Date */}
              <div className="flex items-center space-x-1">
                <label className="text-sm text-slate-600">To:</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      setToDate(e.target.value);
                      setCurrentPreset('custom');
                    }}
                  className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 bg-white transition-colors"
                  min="2025-01-01"
                  max="2025-12-31"
                />
              </div>
            </div>

            {/* Center Section - Active Selections */}
            <div className="flex-1 flex items-center justify-center space-x-2">
              {lookupType && (
                <div className="px-2 py-1 bg-green-200/30 border border-green-300/30 rounded text-xs text-green-900 group-hover:bg-green-200/60 transition-colors">
                  {lookupType === 'service-order' ? 'Service Orders' : 'Parts'}
                    </div>
              )}
              {currentFilters.selectedCustomers.length > 0 && (
                <div className="px-2 py-1 bg-orange-200/30 border border-orange-300/30 rounded text-xs text-orange-900 group-hover:bg-orange-200/60 transition-colors">
                  {currentFilters.selectedCustomers.length} customer{currentFilters.selectedCustomers.length > 1 ? 's' : ''}
                    </div>
              )}
              {currentFilters.selectedUnits.length > 0 && (
                <div className="px-2 py-1 bg-orange-200/30 border border-orange-300/30 rounded text-xs text-orange-900 group-hover:bg-orange-200/60 transition-colors">
                  {currentFilters.selectedUnits.length} unit{currentFilters.selectedUnits.length > 1 ? 's' : ''}
                    </div>
              )}
              {currentFilters.selectedYears.length > 0 && (
                <div className="px-2 py-1 bg-orange-200/30 border border-orange-300/30 rounded text-xs text-orange-900 group-hover:bg-orange-200/60 transition-colors">
                  {currentFilters.selectedYears.length} year{currentFilters.selectedYears.length > 1 ? 's' : ''}
                    </div>
              )}
              {currentFilters.selectedMakes.length > 0 && (
                <div className="px-2 py-1 bg-orange-200/30 border border-orange-300/30 rounded text-xs text-orange-900 group-hover:bg-orange-200/60 transition-colors">
                  {currentFilters.selectedMakes.length} make{currentFilters.selectedMakes.length > 1 ? 's' : ''}
                    </div>
              )}
              {currentFilters.selectedModels.length > 0 && (
                <div className="px-2 py-1 bg-orange-200/30 border border-orange-300/30 rounded text-xs text-orange-900 group-hover:bg-orange-200/60 transition-colors">
                  {currentFilters.selectedModels.length} model{currentFilters.selectedModels.length > 1 ? 's' : ''}
                </div>
              )}
              {lookupSearchTerm && (
                <div className="px-2 py-1 bg-blue-200/30 border border-blue-300/30 rounded text-xs text-blue-900 group-hover:bg-blue-200/60 transition-colors">
                  Search: "{lookupSearchTerm}"
                </div>
              )}
            </div>
            
            {/* Right Section - Reset Button */}
            <div className="flex items-center">
              <button 
                onClick={() => {
                  setFromDate('2025-01-01');
                  setToDate('2025-08-31');
                  setCurrentPreset('');
                  // Don't change the lookupType - keep current tab
                  setSearchType('description');
                  setCurrentFilters({
                    unitFilter: '',
                    unitMakeFilter: '',
                    unitModelFilter: '',
                    unitYearFilter: '',
                    customerFilter: '',
                    selectedCustomers: [],
                    selectedUnits: [],
                    selectedYears: [],
                    selectedMakes: [],
                    selectedModels: [],
                    customerSearchTerm: '',
                    unitSearchTerm: '',
                    yearSearchTerm: '',
                    makeSearchTerm: '',
                    modelSearchTerm: '',
                    lookupSearchTerm: '',
                    debouncedLookupSearchTerm: ''
                  });
                  setCurrentPage(1);
                  setShowInvoiceDetail(false);
                  setSelectedInvoiceData(null);
                  closeAllDropdowns();
                }}
                className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden w-full mx-4 shadow-xl relative">
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
          <h1 className="text-3xl font-bold text-slate-800 text-center">Explore Your Lookup Tools</h1>
          <p className="text-center text-slate-600 mt-2">Select a lookup type below to search and view detailed information</p>
        </div>

        <div className="p-6">
          {/* High-Level Lookup Type Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {[
              {
                id: 'service-order',
                title: 'Service Order Lookup'
              },
              {
                id: 'parts',
                title: 'Parts Lookup'
              }
            ].map((lookup) => (
              <div
                key={lookup.id}
                onClick={() => setLookupType(lookup.id as 'service-order' | 'parts')}
                className={`cursor-pointer transform transition-all duration-200 hover:scale-105 rounded-xl ${
                  lookupType === lookup.id
                    ? 'bg-blue-50 border-2 border-blue-500 scale-105 shadow-xl'
                    : 'bg-white border border-slate-200 hover:shadow-xl'
                } p-6 shadow-lg`}
              >
                <div className="text-slate-800 font-bold text-lg text-center">{lookup.title}</div>
              </div>
            ))}
          </div>

          {/* Searchable Filters */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Search Filters</h3>
              </div>
              <button
                onClick={() => {
                  setCurrentFilters({
                    unitFilter: '',
                    unitMakeFilter: '',
                    unitModelFilter: '',
                    unitYearFilter: '',
                    customerFilter: '',
                    selectedCustomers: [],
                    selectedUnits: [],
                    selectedYears: [],
                    selectedMakes: [],
                    selectedModels: [],
                    customerSearchTerm: '',
                    unitSearchTerm: '',
                    yearSearchTerm: '',
                    makeSearchTerm: '',
                    modelSearchTerm: '',
                    lookupSearchTerm: '',
                    debouncedLookupSearchTerm: ''
                  });
                  closeAllDropdowns();
                }}
                className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-md hover:bg-slate-50 transition"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* First Row: Customer and Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Multi-Select Filter */}
                <div className="relative customer-dropdown" ref={customerDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Customer</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerSearchTerm}
                      onChange={(e) => {
                        setCustomerSearchTerm(e.target.value);
                        openDropdown('customer');
                      }}
                      onFocus={() => {
                        openDropdown('customer');
                      }}
                      placeholder="Search customers..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {getCurrentFilters().selectedCustomers.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCurrentFilters().selectedCustomers.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Customer Dropdown */}
                  {showCustomerDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Select customers:</span>
                          <button
                            onClick={() => {
                              updateCurrentFilter('selectedCustomers', []);
                              setCustomerSearchTerm('');
                              setShowCustomerDropdown(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      {getUniqueCustomers
                        .filter(customer => 
                          customer.toLowerCase().includes(customerSearchTerm.toLowerCase())
                        )
                        .map(customer => (
                          <div
                            key={customer}
                            className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              const current = getCurrentFilters().selectedCustomers;
                              const updated = current.includes(customer)
                                ? current.filter(c => c !== customer)
                                : [...current, customer];
                              updateCurrentFilter('selectedCustomers', updated);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={getCurrentFilters().selectedCustomers.includes(customer)}
                              onChange={() => {}}
                              className="mr-3"
                            />
                            <span className="text-sm text-slate-900">{customer}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Unit Multi-Select Filter */}
                <div className="relative unit-dropdown" ref={unitDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={unitSearchTerm}
                      onChange={(e) => {
                        setUnitSearchTerm(e.target.value);
                        openDropdown('unit');
                      }}
                      onFocus={() => {
                        openDropdown('unit');
                      }}
                      placeholder={getCurrentFilters().selectedCustomers.length > 0 ? "Search units..." : "Select customers first..."}
                      disabled={getCurrentFilters().selectedCustomers.length === 0}
                      className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                        getCurrentFilters().selectedCustomers.length === 0 
                          ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed' 
                          : 'border-slate-300 focus:ring-blue-500'
                      }`}
                    />
                    {getCurrentFilters().selectedUnits.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCurrentFilters().selectedUnits.length}
                      </div>
                    )}
                  </div>
                  
                  {/* Unit Dropdown */}
                  {showUnitDropdown && getCurrentFilters().selectedCustomers.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-600">Select units:</span>
                            {getCurrentFilters().selectedCustomers.length > 0 && (
                              <span className="text-xs text-blue-600 mt-1">
                                Filtered by {getCurrentFilters().selectedCustomers.length} customer{getCurrentFilters().selectedCustomers.length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              updateCurrentFilter('selectedUnits', []);
                              setUnitSearchTerm('');
                              setShowUnitDropdown(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      {getUniqueUnits()
                        .filter(unit => 
                          unit.toLowerCase().includes(unitSearchTerm.toLowerCase())
                        )
                        .map(unit => (
                          <div
                            key={unit}
                            className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              const current = getCurrentFilters().selectedUnits;
                              const updated = current.includes(unit)
                                ? current.filter(u => u !== unit)
                                : [...current, unit];
                              updateCurrentFilter('selectedUnits', updated);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={getCurrentFilters().selectedUnits.includes(unit)}
                              onChange={() => {}}
                              className="mr-3"
                            />
                            <span className="text-sm text-slate-900">{unit}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Second Row: Year, Make, Model - Multi-Select Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Unit Year Multi-Select Filter */}
                <div className="relative year-dropdown" ref={yearDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit Year</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={yearSearchTerm}
                      onChange={(e) => {
                        setYearSearchTerm(e.target.value);
                        openDropdown('year');
                      }}
                      onFocus={() => {
                        openDropdown('year');
                      }}
                      placeholder="Search years..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {getCurrentFilters().selectedYears.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCurrentFilters().selectedYears.length}
                      </div>
                    )}
                  </div>

                  {/* Year Dropdown */}
                  {showYearDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Select years:</span>
                          <button
                            onClick={() => {
                              updateCurrentFilter('selectedYears', []);
                              setYearSearchTerm('');
                              setShowYearDropdown(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      {getUniqueUnitDetails.years
                        .filter(year => 
                          year.toLowerCase().includes(yearSearchTerm.toLowerCase())
                        )
                        .map(year => (
                          <div
                            key={year}
                            className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              const current = getCurrentFilters().selectedYears;
                              const updated = current.includes(year)
                                ? current.filter(y => y !== year)
                                : [...current, year];
                              updateCurrentFilter('selectedYears', updated);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={getCurrentFilters().selectedYears.includes(year)}
                              onChange={() => {}}
                              className="mr-3"
                            />
                            <span className="text-sm text-slate-900">{year}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Unit Make Multi-Select Filter */}
                <div className="relative make-dropdown" ref={makeDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit Make</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={makeSearchTerm}
                      onChange={(e) => {
                        setMakeSearchTerm(e.target.value);
                        openDropdown('make');
                      }}
                      onFocus={() => {
                        openDropdown('make');
                      }}
                      placeholder="Search makes..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {getCurrentFilters().selectedMakes.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCurrentFilters().selectedMakes.length}
                      </div>
                    )}
                  </div>

                  {/* Make Dropdown */}
                  {showMakeDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Select makes:</span>
                          <button
                            onClick={() => {
                              updateCurrentFilter('selectedMakes', []);
                              setMakeSearchTerm('');
                              setShowMakeDropdown(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      {getUniqueUnitDetails.makes
                        .filter(make => 
                          make.toLowerCase().includes(makeSearchTerm.toLowerCase())
                        )
                        .map(make => (
                          <div
                            key={make}
                            className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              const current = getCurrentFilters().selectedMakes;
                              const updated = current.includes(make)
                                ? current.filter(m => m !== make)
                                : [...current, make];
                              updateCurrentFilter('selectedMakes', updated);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={getCurrentFilters().selectedMakes.includes(make)}
                              onChange={() => {}}
                              className="mr-3"
                            />
                            <span className="text-sm text-slate-900">{make}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Unit Model Multi-Select Filter */}
                <div className="relative model-dropdown" ref={modelDropdownRef}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Unit Model</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={modelSearchTerm}
                      onChange={(e) => {
                        setModelSearchTerm(e.target.value);
                        openDropdown('model');
                      }}
                      onFocus={() => {
                        openDropdown('model');
                      }}
                      placeholder="Search models..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {getCurrentFilters().selectedModels.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getCurrentFilters().selectedModels.length}
                      </div>
                    )}
                  </div>

                  {/* Model Dropdown */}
                  {showModelDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">Select models:</span>
                          <button
                            onClick={() => {
                              updateCurrentFilter('selectedModels', []);
                              setModelSearchTerm('');
                              setShowModelDropdown(false);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear All
                          </button>
                        </div>
                      </div>
                      {getUniqueUnitDetails.models
                        .filter(model => 
                          model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                        )
                        .map(model => (
                          <div
                            key={model}
                            className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                            onClick={() => {
                              const current = getCurrentFilters().selectedModels;
                              const updated = current.includes(model)
                                ? current.filter(m => m !== model)
                                : [...current, model];
                              updateCurrentFilter('selectedModels', updated);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={getCurrentFilters().selectedModels.includes(model)}
                              onChange={() => {}}
                              className="mr-3"
                            />
                            <span className="text-sm text-slate-900">{model}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lookup Search Bar */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 mt-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={lookupSearchTerm}
                    onChange={(e) => setLookupSearchTerm(e.target.value)}
                    placeholder={
                      lookupType === 'service-order' 
                        ? 'Search service descriptions...'
                        : searchType === 'description' 
                          ? 'Search part descriptions...'
                          : 'Search part numbers...'
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {lookupType === 'parts' && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Search by:</span>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => setSearchType('description')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        searchType === 'description'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Part Description
                    </button>
                    <button
                      onClick={() => setSearchType('partNumber')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        searchType === 'partNumber'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Part Number
                    </button>
                  </div>
                </div>
              )}
              
              {lookupSearchTerm && (
                <button
                  onClick={() => setLookupSearchTerm('')}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Lookup Content Area */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {lookupType === 'service-order' ? 'Service Order Results' : 'Parts Results'}
                </h3>
              </div>
              <div className="text-sm text-slate-500 border border-slate-200 rounded-md px-3 py-2 bg-slate-50">
                Date Range: {formatDateMMDDYY(fromDate)} to {formatDateMMDDYY(toDate)}
              </div>
            </div>

            {/* Filter Summary */}
            {(() => {
              const hasActiveFilters = currentFilters.selectedCustomers.length > 0 || 
                                     currentFilters.selectedUnits.length > 0 || 
                                     currentFilters.selectedYears.length > 0 || 
                                     currentFilters.selectedMakes.length > 0 || 
                                     currentFilters.selectedModels.length > 0 || 
                                     lookupSearchTerm;
              
              return hasActiveFilters && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Search Criteria:</h4>
                  <div className="text-sm text-slate-600 space-y-1">
                    {lookupSearchTerm && (
                      <div>
                        • Search: <span className="font-medium">
                          "{lookupSearchTerm}"
                          {lookupType === 'parts' && (
                            <span className="text-xs text-slate-500 ml-1">
                              (in {searchType === 'description' ? 'Part Description' : 'part numbers'})
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    {currentFilters.selectedCustomers.length > 0 && (
                      <div>• Customers: <span className="font-medium">{currentFilters.selectedCustomers.join(', ')}</span></div>
                    )}
                    {currentFilters.selectedUnits.length > 0 && (
                      <div>• Units: <span className="font-medium">{currentFilters.selectedUnits.join(', ')}</span></div>
                    )}
                    {currentFilters.selectedMakes.length > 0 && (
                      <div>• Make: <span className="font-medium">{currentFilters.selectedMakes.join(', ')}</span></div>
                    )}
                    {currentFilters.selectedModels.length > 0 && (
                      <div>• Model: <span className="font-medium">{currentFilters.selectedModels.join(', ')}</span></div>
                    )}
                    {currentFilters.selectedYears.length > 0 && (
                      <div>• Year: <span className="font-medium">{currentFilters.selectedYears.join(', ')}</span></div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Results Display */}
            {shouldShowReadyToSearch ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">Ready to search!</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Apply filters or enter search terms above to find {lookupType === 'service-order' ? 'service orders' : 'parts'}.
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {lookupType === 'service-order' ? 'Service Order Results' : 'Parts Results'}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {lookupSearchTerm !== debouncedLookupSearchTerm && (
                      <div className="flex items-center space-x-1 text-sm text-blue-600">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        <span>Searching...</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-slate-500">
                        {sortedRecords.length.toLocaleString()} record{sortedRecords.length !== 1 ? 's' : ''} found
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-slate-600">Results per page:</label>
                        <select
                          value={resultsPerPage}
                          onChange={(e) => {
                            setResultsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                          className="px-2 py-1 border border-slate-300 rounded text-sm"
                        >
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {sortedRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900">No Results Found</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {lookupSearchTerm 
                        ? `No results found for "${lookupSearchTerm}". Try different search terms or adjust your filters.`
                        : 'Try adjusting your search filters'
                      }
                    </p>
                    <button
                      onClick={() => {
                        setCurrentFilters({
                          unitFilter: '',
                          unitMakeFilter: '',
                          unitModelFilter: '',
                          unitYearFilter: '',
                          customerFilter: '',
                          selectedCustomers: [],
                          selectedUnits: [],
                          selectedYears: [],
                          selectedMakes: [],
                          selectedModels: [],
                          customerSearchTerm: '',
                          unitSearchTerm: '',
                          yearSearchTerm: '',
                          makeSearchTerm: '',
                          modelSearchTerm: '',
                          lookupSearchTerm: '',
                          debouncedLookupSearchTerm: ''
                        });
                      }}
                      className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            {lookupType === 'service-order' ? (
                              <>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-24 border-r border-slate-200"
                                  onClick={() => handleLookupSort('invoiceDate')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Invoice Date</span>
                                    {sortColumn === 'invoiceDate' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-32 border-r border-slate-200"
                                  onClick={() => handleLookupSort('customer')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Customer</span>
                                    {sortColumn === 'customer' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-40 border-r border-slate-200"
                                  onClick={() => handleLookupSort('unit')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Unit</span>
                                    {sortColumn === 'unit' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-80 border-r border-slate-200"
                                  onClick={() => handleLookupSort('serviceDescription')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Service Description</span>
                                    {sortColumn === 'serviceDescription' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('qty')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Labor Hours</span>
                                    {sortColumn === 'qty' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('unitMiles')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Mileage</span>
                                    {sortColumn === 'unitMiles' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-16 border-r border-slate-200"
                                  onClick={() => handleLookupSort('order')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>SO</span>
                                    {sortColumn === 'order' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20"
                                  onClick={() => handleLookupSort('number')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Invoice</span>
                                    {sortColumn === 'number' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                              </>
                            ) : (
                              <>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('invoiceDate')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Invoice Date</span>
                                    {sortColumn === 'invoiceDate' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-48"
                                  onClick={() => handleLookupSort('customer')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Customer</span>
                                    {sortColumn === 'customer' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-40 border-r border-slate-200"
                                  onClick={() => handleLookupSort('unit')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Unit</span>
                                    {sortColumn === 'unit' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-56"
                                  onClick={() => handleLookupSort('serviceDescription')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Service Description</span>
                                    {sortColumn === 'serviceDescription' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-36"
                                  onClick={() => handleLookupSort('description')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Part Description</span>
                                    {sortColumn === 'description' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-24 border-r border-slate-200"
                                  onClick={() => handleLookupSort('partNumber')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Part #</span>
                                    {sortColumn === 'partNumber' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-12"
                                  onClick={() => handleLookupSort('quantity')}
                                >
                                  <div className="flex items-center justify-center space-x-1">
                                    <span>Qty</span>
                                    {sortColumn === 'quantity' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('unitMiles')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Mileage</span>
                                    {sortColumn === 'unitMiles' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('partCost')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Unit Cost</span>
                                    {sortColumn === 'partCost' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20 border-r border-slate-200"
                                  onClick={() => handleLookupSort('unitSoldPrice')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Sold Unit Price</span>
                                    {sortColumn === 'unitSoldPrice' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-16 border-r border-slate-200"
                                  onClick={() => handleLookupSort('order')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>SO</span>
                                    {sortColumn === 'order' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                                <th 
                                  className="px-2 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors w-20"
                                  onClick={() => handleLookupSort('number')}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span>Invoice</span>
                                    {sortColumn === 'number' && (
                                      <span className="text-slate-700">
                                        {sortDirection === 'asc' ? '↑' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                </th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {paginatedRecords.map((record: any, index: number) => (
                            <tr 
                              key={index} 
                              className="hover:bg-slate-50 cursor-pointer transition-colors"
                              onClick={() => handleRecordClick(record)}
                            >
                              {lookupType === 'service-order' ? (
                                <>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-900 border-r border-slate-200">
                                    {formatDateMMDDYY(record.invoiceDate)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-900 border-r border-slate-200">
                                    {record.customer}
                                  </td>
                                  <td className="px-6 py-4 text-xs text-slate-900 border-r border-slate-200">
                                    <div className="space-y-1">
                                      <div className="font-bold text-slate-900">
                                    {record.unit}
                                      </div>
                                    {record.unitDetails ? (
                                      <div className="space-y-1">
                                          <div className="text-xs text-slate-700">
                                          {record.unitDetails.chassisYear} {record.unitDetails.chassisMake} {record.unitDetails.chassisModel}
                                        </div>
                                        <div className="text-xs text-slate-600">
                                          VIN: {record.unitDetails.vin || 'N/A'}
                                        </div>
                                        <div className="text-xs text-slate-600">
                                          Engine: {record.unitDetails.engineYear} {record.unitDetails.engineMake} {record.unitDetails.engineModel}
                                        </div>
                                        {record.unitDetails.licensePlate && (
                                          <div className="text-xs text-slate-600">
                                            Plate: {record.unitDetails.licensePlate} ({record.unitDetails.licensePlateState})
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-slate-500 text-xs">
                                          {record.unitDetails?.chassisMake || ''} {record.unitDetails?.chassisModel || ''} {record.unitDetails?.chassisYear || ''}
                                      </div>
                                    )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-xs text-slate-900 border-r border-slate-200">
                                    <div className="max-w-xs break-words whitespace-normal" title={record.serviceDescription || record.description || record.complaintDescription || 'N/A'}>
                                      {highlightSearchTerm(
                                        record.serviceDescription || record.description || record.complaintDescription || 'N/A',
                                        debouncedLookupSearchTerm
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-900 border-r border-slate-200">
                                    {record.qty > 0 ? record.qty.toFixed(1) : '-'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-900 border-r border-slate-200">
                                    {cleanMileage(record.unitDetails?.mileage || record.unitMiles || record.mileage)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-900">
                                    {record.order || 'N/A'}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-900">
                                    {record.number}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-2 py-4 whitespace-nowrap text-xs text-slate-900 border-r border-slate-200">
                                    {formatDateMMDDYY(record.invoiceDate)}
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 border-r border-slate-200">
                                    <div className="max-w-48 break-words" title={record.customer}>
                                    {record.customer}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 border-r border-slate-200">
                                    <div className="space-y-1">
                                      <div className="font-bold text-slate-900">
                                      {record.unit}
                                      </div>
                                      {record.unitDetails ? (
                                        <div className="space-y-1">
                                          <div className="text-xs text-slate-700">
                                            {record.unitDetails.chassisYear} {record.unitDetails.chassisMake} {record.unitDetails.chassisModel}
                                          </div>
                                          <div className="text-xs text-slate-600">
                                            VIN: {record.unitDetails.vin || 'N/A'}
                                          </div>
                                          <div className="text-xs text-slate-600">
                                            Engine: {record.unitDetails.engineYear} {record.unitDetails.engineMake} {record.unitDetails.engineModel}
                                          </div>
                                          {record.unitDetails.licensePlate && (
                                            <div className="text-xs text-slate-600">
                                              Plate: {record.unitDetails.licensePlate} ({record.unitDetails.licensePlateState})
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                      <div className="text-slate-500 text-xs">
                                          {record.unitDetails?.chassisMake || ''} {record.unitDetails?.chassisModel || ''} {record.unitDetails?.chassisYear || ''}
                                      </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-56 border-r border-slate-200">
                                    <div className="max-w-56 break-words whitespace-normal" title={record.serviceDescription || record.description || record.complaintDescription || 'N/A'}>
                                      {record.serviceDescription || record.description || record.complaintDescription || 'N/A'}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-36 border-r border-slate-200">
                                    <div className="max-w-36 break-words whitespace-normal" title={record.description || 'N/A'}>
                                      {searchType === 'description' ? 
                                        highlightSearchTerm(
                                          record.description || 'N/A',
                                          debouncedLookupSearchTerm
                                        ) :
                                        (record.description || 'N/A')
                                      }
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs font-medium text-slate-900 w-24 border-r border-slate-200">
                                    <div className="truncate" title={record.partNumber || record.item || 'N/A'}>
                                      {searchType === 'partNumber' ? 
                                        highlightSearchTerm(
                                          record.partNumber || record.item || 'N/A',
                                          debouncedLookupSearchTerm
                                        ) :
                                        (record.partNumber || record.item || 'N/A')
                                      }
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-12 text-center border-r border-slate-200">
                                    {record.quantity || record.qty || '1'}
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-20 border-r border-slate-200">
                                    {cleanMileage(record.unitDetails?.mileage || record.unitMiles || record.mileage)}
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-20 border-r border-slate-200">
                                    ${record.partCost ? record.partCost.toLocaleString() : 'N/A'}
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-20 border-r border-slate-200">
                                    ${record.quantity ? (record.total / record.quantity).toFixed(2) : record.total?.toFixed(2) || '0.00'}
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-16 border-r border-slate-200">
                                    <div className="truncate" title={record.order || 'N/A'}>
                                      {record.order || 'N/A'}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 text-xs text-slate-900 w-20">
                                    <div className="truncate" title={record.number || 'N/A'}>
                                      {record.number || 'N/A'}
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-slate-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm text-slate-700">
                              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                              <span className="font-medium">{Math.min(endIndex, sortedRecords.length)}</span> of{' '}
                              <span className="font-medium">{sortedRecords.length}</span> results
                            </p>
                          </div>
                          <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                              <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Previous
                              </button>
                              <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
                                Page {currentPage} of {totalPages}
                              </span>
                              <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Next
                              </button>
                            </nav>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Invoice Detail Popup Modal */}
    {showInvoiceDetail && selectedInvoiceData && (
      <>
        {/* Background blur overlay - clickable to close */}
        <div 
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={closeInvoiceDetail}
        ></div>
        
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-[90vw] w-[90vw] max-h-[90vh] overflow-hidden pointer-events-auto border-2 border-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {lookupType === 'service-order' ? 'Service Order Details' : 'Parts Details'}
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                {/* Close Button */}
                <button
                  onClick={closeInvoiceDetail}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Body - Invoice Info */}
            <div className="flex flex-col h-[calc(90vh-120px)]">
              {(() => {
                const invoiceDetails = getInvoiceDetails(selectedInvoiceData.invoiceNumber)
                const { laborItems, laborTotal, partsTotal, shopSuppliesTotal, correctInvoiceTotal, invoicePartsMargin, invoiceInfo } = invoiceDetails
                
                return (
                  <>
                    {/* Invoice Info Header */}
                    <div className="bg-slate-50 px-6 py-2 border-b border-slate-200 flex-shrink-0">
                      <div className="grid grid-cols-9 gap-4 text-xs">
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Invoice #</label>
                          <p className="text-slate-900 text-xs">{invoiceInfo.number || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Service Order</label>
                          <p className="text-slate-900 text-xs">{invoiceInfo.order || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Customer</label>
                          <p className="text-slate-900 text-xs">{invoiceInfo.customer || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Invoice Date</label>
                          <p className="text-slate-900 text-xs">{formatDateMMDDYY(invoiceInfo.invoiceDate || selectedInvoiceData.invoiceDate)}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Unit</label>
                          <p className="text-slate-900 text-xs">{invoiceInfo.unit || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Mileage</label>
                          <p className="text-slate-900 text-xs">{cleanMileage(invoiceInfo.unitMiles || invoiceInfo.mileage) || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Unit Details</label>
                          <p className="text-slate-900 text-xs">{invoiceInfo.unitDetails?.chassisMake || ''} {invoiceInfo.unitDetails?.chassisModel || ''} {invoiceInfo.unitDetails?.chassisYear || ''}</p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Parts Margin</label>
                          <p className={`text-xs font-semibold ${
                            invoicePartsMargin >= 30 ? 'text-green-700' : 
                            invoicePartsMargin >= 20 ? 'text-yellow-700' : 'text-red-700'
                          }`}>
                            {invoicePartsMargin > 0 ? `${invoicePartsMargin.toFixed(1)}%` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <label className="font-medium text-slate-600 text-xs">Total</label>
                          <p className="text-slate-900 text-xs font-semibold">${correctInvoiceTotal.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Body - Matrix Table Container */}
                    <div className="flex flex-col flex-1 min-h-0">
                      {/* Restructured Table with Nested Headers */}
                      <div className="flex-1 overflow-y-auto bg-white">
                        <table className="w-full min-w-[1400px] border-collapse">
                          <thead className="sticky top-0 z-10 bg-slate-50">
                            {/* Main Header Row */}
                            <tr className="bg-slate-50 border-b border-slate-200">
                              <th rowSpan={2} className="w-32 text-left px-3 py-1 pr-3 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Item</th>
                              <th rowSpan={2} className="w-[800px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Description</th>
                              <th colSpan={5} className="text-center px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Labor</th>
                              <th colSpan={4} className="text-center px-2 py-1 font-semibold text-xs text-slate-500 uppercase tracking-wider">Parts</th>
                            </tr>
                            {/* Sub Header Row */}
                            <tr className="bg-slate-50 border-b border-slate-200 border-t border-slate-200">
                              <th className="w-[70px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Invoiced Hrs</th>
                              <th className="w-[70px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Actual Hrs</th>
                              <th className="w-[70px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Rate</th>
                              <th className="w-[90px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Total</th>
                              <th className="w-[50px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Qty</th>
                              <th className="w-[70px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Part Cost</th>
                              <th className="w-[70px] text-left px-2 py-1 border-r border-slate-200 font-semibold text-xs text-slate-500 uppercase tracking-wider">Part Sold</th>
                              <th className="w-[70px] text-left px-2 py-1 font-semibold text-xs text-slate-500 uppercase tracking-wider">Parts Margin</th>
                            </tr>
                          </thead>
                          <tbody>
                            {laborItems.map((item: any, index: number) => (
                              <tr 
                                key={index} 
                                className={`border-t border-slate-200 ${
                                  item.isFirstInGroup ? 'border-t-2 border-slate-400' : ''
                                } ${
                                  item.isLastInServiceGroup ? 'border-b-2 border-slate-400' : ''
                                }`}
                              >
                                <td className="w-32 px-2 py-1 pr-2 border-r border-slate-200 font-medium text-xs text-slate-900">
                                  <span className={item.isComplaintLine ? 'text-yellow-700' : 'text-slate-900'}>
                                    {item.item}
                                  </span>
                                </td>
                                <td className="w-[800px] px-2 py-1 border-r border-slate-200 font-medium text-xs text-black">
                                  {item.item === 'Part' ? (
                                    <div className="flex">
                                      <div className="flex-1">
                                        <span className="text-black">{item.description}</span>
                                      </div>
                                      <div className="w-24 text-right">
                                        <span className="text-slate-600 font-mono text-xs">Part# {item.partNumber}</span>
                                      </div>
                                    </div>
                                  ) : (
                                    <span className={`${item.isComplaintLine ? 'text-yellow-700 italic' : 'text-black'}`}>
                                      {item.description}
                                    </span>
                                  )}
                                </td>
                                
                                {/* Labor Columns */}
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Labor' && !item.isComplaintLine ? (item.qty || '') : ''}
                                </td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Labor' && !item.isComplaintLine ? (item.actualHours || '') : ''}
                                </td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Labor' && !item.isComplaintLine ? (item.rate ? `$${item.rate.toFixed(2)}` : '') : ''}
                                </td>
                                <td className="w-[90px] px-2 py-1 border-r border-slate-200 font-medium text-xs">
                                  {item.item === 'Labor' && !item.isComplaintLine ? (item.amount ? `$${item.amount.toFixed(2)}` : '') : ''}
                                </td>
                                
                                {/* Parts Columns */}
                                <td className="w-[50px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Part' ? (item.qty || '') : ''}
                                </td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Part' ? (item.partCost ? `$${item.partCost.toFixed(2)}` : '') : ''}
                                </td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 text-xs">
                                  {item.item === 'Part' ? (item.rate ? `$${item.rate.toFixed(2)}` : '') : ''}
                                </td>
                                <td className="w-[70px] px-2 py-1 font-medium text-xs">
                                  {item.item === 'Part' && item.partsMarginPercent !== undefined ? (
                                    <span className={`${
                                      item.partsMarginPercent >= 30 ? 'text-green-700' : 
                                      item.partsMarginPercent >= 20 ? 'text-yellow-700' : 'text-red-700'
                                    }`}>
                                      {item.partsMarginPercent.toFixed(1)}%
                                    </span>
                                  ) : ''}
                                </td>
                              </tr>
                            ))}
                            {shopSuppliesTotal > 0 && (
                              <tr className="border-t border-slate-200 bg-slate-50">
                                <td className="w-32 px-2 py-1 pr-2 border-r border-slate-200 font-medium text-xs text-slate-900 bg-slate-50">Shop Supplies</td>
                                <td className="w-[800px] px-2 py-1 border-r border-slate-200 font-medium text-xs text-slate-900 bg-slate-50">Shop Supplies</td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[90px] px-2 py-1 border-r border-slate-200 font-medium text-xs bg-slate-50">${shopSuppliesTotal.toFixed(2)}</td>
                                <td className="w-[50px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[70px] px-2 py-1 border-r border-slate-200 bg-slate-50"></td>
                                <td className="w-[70px] px-2 py-1 bg-slate-50"></td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Sticky Footer - Totals Section */}
                      <div className="bg-slate-100 px-3 py-1 border-t-2 border-slate-300 sticky bottom-0 z-20 shadow-lg flex-shrink-0">
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="bg-white p-1 rounded border shadow-sm">
                            <label className="font-medium text-slate-600 text-xs">Labor Total</label>
                            <p className="text-xs font-bold text-slate-900">${laborTotal.toFixed(2)}</p>
                          </div>
                          <div className="bg-white p-1 rounded border shadow-sm">
                            <label className="font-medium text-slate-600 text-xs">Parts Total</label>
                            <p className="text-xs font-bold text-slate-900">${partsTotal.toFixed(2)}</p>
                          </div>
                          <div className="bg-white p-1 rounded border shadow-sm">
                            <label className="font-medium text-slate-600 text-xs">Shop Supplies</label>
                            <p className="text-xs font-bold text-slate-900">${shopSuppliesTotal.toFixed(2)}</p>
                          </div>
                          <div className="bg-white p-1 rounded border shadow-sm">
                            <label className="font-medium text-slate-600 text-xs">Invoice Total</label>
                            <p className="text-xs font-bold text-slate-900">${correctInvoiceTotal.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      </>
    )}
  </>
  );
});

export default LookupsPage;
