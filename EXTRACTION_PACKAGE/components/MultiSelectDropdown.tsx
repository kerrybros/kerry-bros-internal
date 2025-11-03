
interface MultiSelectDropdownProps {
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

export default function MultiSelectDropdown({
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  disabled = false,
  selectedItems,
  showDropdown,
  options,
  onToggleItem,
  onClearAll,
  onCloseDropdown,
  className = '',
  dropdownClassName = '',
  helperText
}: MultiSelectDropdownProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
            disabled
              ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
              : 'border-slate-300 focus:ring-blue-500'
          }`}
        />
        {selectedItems.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedItems.length}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && !disabled && (
        <div className={`absolute z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${dropdownClassName}`}>
          <div className="p-2 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-slate-600">Select {label.toLowerCase()}:</span>
                {helperText && (
                  <span className="text-xs text-blue-600 mt-1">{helperText}</span>
                )}
              </div>
              <button
                onClick={() => {
                  onClearAll();
                  onCloseDropdown();
                }}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>
          </div>
          {options
            .filter(option => 
              option.toLowerCase().includes(value.toLowerCase())
            )
            .map(option => (
              <div
                key={option}
                className="flex items-center px-3 py-2 hover:bg-slate-50 cursor-pointer"
                onClick={() => onToggleItem(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(option)}
                  onChange={() => {}} // Handled by parent onClick
                  className="mr-3"
                />
                <span className="text-sm text-slate-900">{option}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
