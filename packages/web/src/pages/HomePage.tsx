import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onLogout: () => void;
}

export default function HomePage({ onLogout }: HomePageProps) {
  const navigate = useNavigate();
  
  // 30-minute timeout with activity reset
  useEffect(() => {
    let timeoutId: number;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        onLogout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Set initial timeout
    resetTimeout();

    // Reset timeout on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, [onLogout]);

  const handleOpenPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center leading-none">
          <img src="/KL Logo.png" alt="Kerry Leasing" className="h-48 w-auto block -my-4" />
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Select a Report
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Click on any card below to view the report
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex justify-center">
          {/* Kerry Leasing Card */}
          <button
            onClick={() => handleOpenPage('/kerry-leasing')}
            className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 text-left p-6 border-2 border-transparent hover:border-indigo-500 max-w-md w-full"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img src="/KB Logo.png" alt="Kerry Bros" className="h-28 w-auto flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">
                  Kerry Leasing<br />Customer Spend
                </h3>
              </div>
              <svg
                className="h-6 w-6 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

