/**
 * INTEGRATION EXAMPLE
 * 
 * This file shows how to integrate the Lookups Dashboard into your project.
 * Copy and adapt this code to your needs.
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LookupsPage from './components/lookups/LookupsPage';

// ============================================================================
// OPTION 1: Simple Integration - Single Page App
// ============================================================================

export function SimpleIntegration() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Your app header/navigation */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900">My App</h1>
        </div>
      </header>
      
      {/* Lookups Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <LookupsPage />
      </main>
    </div>
  );
}

// ============================================================================
// OPTION 2: Multi-Page App with React Router
// ============================================================================

export function RouterIntegration() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-4 py-4">
              <Link 
                to="/" 
                className="px-3 py-2 text-slate-700 hover:text-slate-900"
              >
                Home
              </Link>
              <Link 
                to="/lookups" 
                className="px-3 py-2 text-slate-700 hover:text-slate-900"
              >
                Lookups
              </Link>
              <Link 
                to="/reports" 
                className="px-3 py-2 text-slate-700 hover:text-slate-900"
              >
                Reports
              </Link>
            </div>
          </div>
        </nav>
        
        {/* Routes */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lookups" element={<LookupsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Placeholder components
function HomePage() {
  return <div>Home Page</div>;
}

function ReportsPage() {
  return <div>Reports Page</div>;
}

// ============================================================================
// OPTION 3: Integration with Custom Layout
// ============================================================================

export function CustomLayoutIntegration() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-slate-800">My App</h2>
          <nav className="mt-6 space-y-2">
            <a href="/lookups" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded">
              Lookups
            </a>
            {/* Add more navigation items */}
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <LookupsPage />
      </main>
    </div>
  );
}

// ============================================================================
// OPTION 4: Integration with Custom API Configuration
// ============================================================================

/**
 * If you need to override the API URL dynamically, you can modify the hook.
 * 
 * In hooks/useIntegratedDataFromDBOptimized.ts, change line 4:
 * 
 * From:
 *   const API_BASE_URL = 'https://kerry-fleet-saas.onrender.com';
 * 
 * To:
 *   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
 * 
 * Or accept it as a parameter:
 */

// Modified hook signature (you would need to update the hook file):
/*
export function useIntegratedDataFromDBOptimized(apiBaseUrl: string) {
  // ... hook code using apiBaseUrl instead of constant
}

// Then use it like:
function CustomApiIntegration() {
  return (
    <LookupsPageWithCustomApi 
      apiBaseUrl="https://my-custom-api.com" 
    />
  );
}
*/

// ============================================================================
// OPTION 5: Integration with Authentication
// ============================================================================

export function AuthenticatedIntegration() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  // Your authentication logic here
  React.useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">My App</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
          >
            Log Out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <LookupsPage />
      </main>
    </div>
  );
}

// ============================================================================
// OPTION 6: Integration with Loading States
// ============================================================================

export function LoadingStateIntegration() {
  const [isReady, setIsReady] = React.useState(false);
  
  React.useEffect(() => {
    // Perform any initialization
    setTimeout(() => setIsReady(true), 1000);
  }, []);
  
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <LookupsPage />
      </main>
    </div>
  );
}

// ============================================================================
// TAILWIND CSS SETUP
// ============================================================================

/**
 * Make sure you have these in your project:
 * 
 * 1. tailwind.config.js:
 * 
 * module.exports = {
 *   content: [
 *     "./src/**\/*.{js,jsx,ts,tsx}",
 *   ],
 *   theme: {
 *     extend: {},
 *   },
 *   plugins: [],
 * }
 * 
 * 2. src/index.css:
 * 
 * @tailwind base;
 * @tailwind components;
 * @tailwind utilities;
 * 
 * 3. Import in your entry file (main.tsx or index.tsx):
 * 
 * import './index.css';
 */

// ============================================================================
// VITE CONFIGURATION (if using Vite)
// ============================================================================

/**
 * vite.config.ts:
 * 
 * import { defineConfig } from 'vite'
 * import react from '@vitejs/plugin-react'
 * 
 * export default defineConfig({
 *   plugins: [react()],
 *   server: {
 *     proxy: {
 *       '/api': {
 *         target: 'http://localhost:3001', // Your API server
 *         changeOrigin: true,
 *       },
 *     },
 *   },
 * })
 */

// ============================================================================
// USAGE NOTES
// ============================================================================

/**
 * 1. The LookupsPage component is fully self-contained - just import and use
 * 2. It handles its own state management internally
 * 3. Data fetching starts automatically on mount
 * 4. No props required (all configuration is internal)
 * 5. Responsive design works out of the box
 * 6. Dark mode NOT included (add if needed)
 * 
 * To customize:
 * - Modify tailwind classes in component files
 * - Update API_BASE_URL in the hook
 * - Adjust date ranges in LookupsPage.tsx
 * - Modify lookup types in LookupsFilterPanel.tsx
 */

export default SimpleIntegration;

