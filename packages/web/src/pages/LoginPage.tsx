import { useState } from 'react';

const ACCESS_CODE = '5255Tillman'; // Hardcoded access code

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === ACCESS_CODE) {
      setError('');
      onLogin();
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-6 pt-4 px-10 pb-10 bg-white rounded-xl shadow-lg">
        <div>
          <div className="flex justify-center">
            <img src="/KL Logo.png" alt="Kerry Leasing" className="h-64 w-auto" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Kerry Bros Internal
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="access-code"
              name="code"
              type="password"
              autoComplete="off"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter access code"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

