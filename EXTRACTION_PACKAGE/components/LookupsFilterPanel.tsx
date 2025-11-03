import MultiSelectDropdown from './MultiSelectDropdown';
import SelectedItemsBadge from './SelectedItemsBadge';

interface FilterState {
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

interface SearchTerms {
  customer: string;
  unit: string;
  year: string;
  make: string;
  model: string;
  lookup: string;
}

interface DropdownStates {
  showCustomer: boolean;
  showUnit: boolean;
  showYear: boolean;
  showMake: boolean;
  showModel: boolean;
  showCustomerDetails: boolean;
  showUnitDetails: boolean;
}

interface LookupsFilterPanelProps {
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
  datePresets: Array<{label: string; from: string; to: string}>;
  
  // Reset functions
  onResetAll: () => void;
  onClearFilters: () => void;
}

export default function LookupsFilterPanel({
  filters,
  onUpdateFilter,
  searchTerms,
  onUpdateSearchTerm,
  dropdownStates,
  onUpdateDropdownState,
  uniqueCustomers,
  uniqueUnits,
  uniqueUnitDetails,
  lookupType,
  onSetLookupType,
  searchType,
  onSetSearchType,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  currentPreset,
  onSetCurrentPreset,
  datePresets,
  onResetAll,
  onClearFilters
}: LookupsFilterPanelProps) {
  
  // Helper function to close all dropdowns except the specified one
  const closeOtherDropdowns = (except?: keyof DropdownStates) => {
    const updates: Partial<DropdownStates> = {
      showCustomer: false,
      showUnit: false,
      showYear: false,
      showMake: false,
      showModel: false,
      showCustomerDetails: false,
      showUnitDetails: false
    };
    if (except) {
      updates[except] = true;
    }
    Object.entries(updates).forEach(([key, value]) => {
      onUpdateDropdownState(key as keyof DropdownStates, value);
    });
  };

  return (
    <div className="space-y-6">
      {/* Fixed Header with Active Filters */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Left Section - Date Range */}
            <div className="flex items-center space-x-2">
              <select
                value={currentPreset}
                onChange={(e) => {
                  const preset = datePresets.find(p => p.label === e.target.value);
                  if (preset) {
                    onFromDateChange(preset.from);
                    onToDateChange(preset.to);
                    onSetCurrentPreset(preset.label);
                  }
                }}
                className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {datePresets.map(preset => (
                  <option key={preset.label} value={preset.label}>{preset.label}</option>
                ))}
              </select>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  onFromDateChange(e.target.value);
                  onSetCurrentPreset('Custom');
                }}
                className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500">to</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  onToDateChange(e.target.value);
                  onSetCurrentPreset('Custom');
                }}
                className="px-2 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            {/* Center Section - Active Selections */}
            <div className="flex-1 flex items-center justify-center space-x-2">
              {lookupType && (
                <div className="px-2 py-1 bg-green-200/30 border border-green-300/30 rounded text-xs text-green-900 group-hover:bg-green-200/60 transition-colors">
                  {lookupType === 'service-order' ? 'Service Order Lookup' : 'Parts Lookup'}
                </div>
              )}
              
              <SelectedItemsBadge
                label="Customers"
                count={filters.selectedCustomers.length}
                items={filters.selectedCustomers}
                isOpen={dropdownStates.showCustomerDetails}
                onToggle={() => {
                  onUpdateDropdownState('showCustomerDetails', !dropdownStates.showCustomerDetails);
                  onUpdateDropdownState('showUnitDetails', false);
                }}
                onRemoveItem={(customer) => {
                  const updated = filters.selectedCustomers.filter(c => c !== customer);
                  onUpdateFilter('selectedCustomers', updated);
                }}
                onClearAll={() => {
                  onUpdateFilter('selectedCustomers', []);
                  onUpdateDropdownState('showCustomerDetails', false);
                }}
                badgeColor="red"
              />
              
              <SelectedItemsBadge
                label="Units"
                count={filters.selectedUnits.length}
                items={filters.selectedUnits}
                isOpen={dropdownStates.showUnitDetails}
                onToggle={() => {
                  onUpdateDropdownState('showUnitDetails', !dropdownStates.showUnitDetails);
                  onUpdateDropdownState('showCustomerDetails', false);
                }}
                onRemoveItem={(unit) => {
                  const updated = filters.selectedUnits.filter(u => u !== unit);
                  onUpdateFilter('selectedUnits', updated);
                }}
                onClearAll={() => {
                  onUpdateFilter('selectedUnits', []);
                  onUpdateDropdownState('showUnitDetails', false);
                }}
                badgeColor="blue"
              />
              
              {filters.unitMakeFilter && (
                <div className="px-2 py-1 bg-green-200/30 border border-green-300/30 rounded text-xs text-green-900 group-hover:bg-green-200/60 transition-colors">
                  Make: {filters.unitMakeFilter}
                </div>
              )}
              {filters.unitModelFilter && (
                <div className="px-2 py-1 bg-purple-200/30 border border-purple-300/30 rounded text-xs text-purple-900 group-hover:bg-purple-200/60 transition-colors">
                  Model: {filters.unitModelFilter}
                </div>
              )}
              {filters.unitYearFilter && (
                <div className="px-2 py-1 bg-yellow-200/30 border border-yellow-300/30 rounded text-xs text-yellow-900 group-hover:bg-yellow-200/60 transition-colors">
                  Year: {filters.unitYearFilter}
                </div>
              )}
            </div>
            
            {/* Right Section - Reset Button */}
            <div className="flex items-center">
              <button 
                onClick={onResetAll}
                className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded transition-colors"
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
                onClick={() => onSetLookupType(lookup.id as 'service-order' | 'parts')}
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
                onClick={onClearFilters}
                className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-md hover:bg-slate-50 transition"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* First Row: Customer and Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelectDropdown
                  label="Customer"
                  value={searchTerms.customer}
                  onChange={(value) => onUpdateSearchTerm('customer', value)}
                  onFocus={() => closeOtherDropdowns('showCustomer')}
                  placeholder="Search customers..."
                  selectedItems={filters.selectedCustomers}
                  showDropdown={dropdownStates.showCustomer}
                  options={uniqueCustomers}
                  onToggleItem={(customer) => {
                    const current = filters.selectedCustomers;
                    const updated = current.includes(customer)
                      ? current.filter(c => c !== customer)
                      : [...current, customer];
                    onUpdateFilter('selectedCustomers', updated);
                  }}
                  onClearAll={() => {
                    onUpdateFilter('selectedCustomers', []);
                    onUpdateSearchTerm('customer', '');
                  }}
                  onCloseDropdown={() => onUpdateDropdownState('showCustomer', false)}
                  className="customer-dropdown"
                />

                <MultiSelectDropdown
                  label="Unit"
                  value={searchTerms.unit}
                  onChange={(value) => onUpdateSearchTerm('unit', value)}
                  onFocus={() => closeOtherDropdowns('showUnit')}
                  placeholder={filters.selectedCustomers.length > 0 ? "Search units..." : "Select customers first..."}
                  disabled={filters.selectedCustomers.length === 0}
                  selectedItems={filters.selectedUnits}
                  showDropdown={dropdownStates.showUnit}
                  options={uniqueUnits}
                  onToggleItem={(unit) => {
                    const current = filters.selectedUnits;
                    const updated = current.includes(unit)
                      ? current.filter(u => u !== unit)
                      : [...current, unit];
                    onUpdateFilter('selectedUnits', updated);
                  }}
                  onClearAll={() => {
                    onUpdateFilter('selectedUnits', []);
                    onUpdateSearchTerm('unit', '');
                  }}
                  onCloseDropdown={() => onUpdateDropdownState('showUnit', false)}
                  className="unit-dropdown"
                  helperText={filters.selectedCustomers.length > 0 ? `Filtered by ${filters.selectedCustomers.length} customer${filters.selectedCustomers.length !== 1 ? 's' : ''}` : undefined}
                />
              </div>

              {/* Second Row: Year, Make, Model */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MultiSelectDropdown
                  label="Unit Year"
                  value={searchTerms.year}
                  onChange={(value) => onUpdateSearchTerm('year', value)}
                  onFocus={() => closeOtherDropdowns('showYear')}
                  placeholder="Search years..."
                  selectedItems={filters.selectedYears}
                  showDropdown={dropdownStates.showYear}
                  options={uniqueUnitDetails.years}
                  onToggleItem={(year) => {
                    const current = filters.selectedYears;
                    const updated = current.includes(year)
                      ? current.filter(y => y !== year)
                      : [...current, year];
                    onUpdateFilter('selectedYears', updated);
                  }}
                  onClearAll={() => {
                    onUpdateFilter('selectedYears', []);
                    onUpdateSearchTerm('year', '');
                  }}
                  onCloseDropdown={() => onUpdateDropdownState('showYear', false)}
                  className="year-dropdown"
                />

                <MultiSelectDropdown
                  label="Unit Make"
                  value={searchTerms.make}
                  onChange={(value) => onUpdateSearchTerm('make', value)}
                  onFocus={() => closeOtherDropdowns('showMake')}
                  placeholder="Search makes..."
                  selectedItems={filters.selectedMakes}
                  showDropdown={dropdownStates.showMake}
                  options={uniqueUnitDetails.makes}
                  onToggleItem={(make) => {
                    const current = filters.selectedMakes;
                    const updated = current.includes(make)
                      ? current.filter(m => m !== make)
                      : [...current, make];
                    onUpdateFilter('selectedMakes', updated);
                  }}
                  onClearAll={() => {
                    onUpdateFilter('selectedMakes', []);
                    onUpdateSearchTerm('make', '');
                  }}
                  onCloseDropdown={() => onUpdateDropdownState('showMake', false)}
                  className="make-dropdown"
                />

                <MultiSelectDropdown
                  label="Unit Model"
                  value={searchTerms.model}
                  onChange={(value) => onUpdateSearchTerm('model', value)}
                  onFocus={() => closeOtherDropdowns('showModel')}
                  placeholder="Search models..."
                  selectedItems={filters.selectedModels}
                  showDropdown={dropdownStates.showModel}
                  options={uniqueUnitDetails.models}
                  onToggleItem={(model) => {
                    const current = filters.selectedModels;
                    const updated = current.includes(model)
                      ? current.filter(m => m !== model)
                      : [...current, model];
                    onUpdateFilter('selectedModels', updated);
                  }}
                  onClearAll={() => {
                    onUpdateFilter('selectedModels', []);
                    onUpdateSearchTerm('model', '');
                  }}
                  onCloseDropdown={() => onUpdateDropdownState('showModel', false)}
                  className="model-dropdown"
                />
              </div>

              {/* Third Row: Search Input and Type */}
              {lookupType && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Search {lookupType === 'service-order' ? 'Service Description' : searchType === 'description' ? 'Part Description' : 'Part Number'}
                    </label>
                    <input
                      type="text"
                      value={searchTerms.lookup}
                      onChange={(e) => onUpdateSearchTerm('lookup', e.target.value)}
                      placeholder={`Search ${lookupType === 'service-order' ? 'service descriptions' : searchType === 'description' ? 'part descriptions' : 'part numbers'}...`}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {lookupType === 'parts' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Search Type</label>
                      <select
                        value={searchType}
                        onChange={(e) => onSetSearchType(e.target.value as 'description' | 'partNumber')}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="description">Part Description</option>
                        <option value="partNumber">Part Number</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
