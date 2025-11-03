
interface SelectedItemsBadgeProps {
  label: string;
  count: number;
  items: string[];
  isOpen: boolean;
  onToggle: () => void;
  onRemoveItem: (item: string) => void;
  onClearAll: () => void;
  badgeColor: 'red' | 'blue' | 'green' | 'purple' | 'yellow';
  className?: string;
}

const colorClasses = {
  red: {
    badge: 'bg-red-200/30 border-red-300/30 text-red-900 hover:bg-red-200/60 hover:border-red-400/50',
    dropdown: 'border-slate-300'
  },
  blue: {
    badge: 'bg-blue-200/30 border-blue-300/30 text-blue-900 hover:bg-blue-200/60 hover:border-blue-400/50',
    dropdown: 'border-slate-300'
  },
  green: {
    badge: 'bg-green-200/30 border-green-300/30 text-green-900 hover:bg-green-200/60',
    dropdown: 'border-slate-300'
  },
  purple: {
    badge: 'bg-purple-200/30 border-purple-300/30 text-purple-900 hover:bg-purple-200/60',
    dropdown: 'border-slate-300'
  },
  yellow: {
    badge: 'bg-yellow-200/30 border-yellow-300/30 text-yellow-900 hover:bg-yellow-200/60',
    dropdown: 'border-slate-300'
  }
};

export default function SelectedItemsBadge({
  label,
  count,
  items,
  isOpen,
  onToggle,
  onRemoveItem,
  onClearAll,
  badgeColor,
  className = ''
}: SelectedItemsBadgeProps) {
  const colors = colorClasses[badgeColor];

  if (count === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`px-2 py-1 border rounded text-xs cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 transform ${colors.badge}`}
        onClick={onToggle}
        title={`Click to view selected ${label.toLowerCase()}: ${items.join(', ')}`}
      >
        <div className="flex items-center space-x-1">
          <span>{label}: {count}</span>
          <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Dropdown */}
      {isOpen && (
        <div className={`absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50 min-w-48 max-w-96 ${colors.dropdown}`}>
          <div className="p-3 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Selected {label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearAll();
                }}
                className="text-xs text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {items.map(item => (
              <div key={item} className="flex items-center justify-between px-3 py-2 hover:bg-slate-50">
                <span className="text-sm text-slate-900 truncate">{item}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item);
                  }}
                  className="text-xs text-red-600 hover:text-red-800 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
