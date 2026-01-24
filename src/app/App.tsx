import { useState } from 'react';
import { ClientFlow } from './components/ClientFlow';
import { CompanyFlow } from './components/CompanyFlow';

export default function App() {
  const [viewMode, setViewMode] = useState<'client' | 'company'>('client');
  const [showSwitcher, setShowSwitcher] = useState(true);

  // Callback to hide switcher when user logs in or navigates away from initial screen
  const handleClientNavigation = (screen: string) => {
    if (screen !== 'login') {
      setShowSwitcher(false);
    } else {
      setShowSwitcher(true);
    }
  };

  const handleCompanyNavigation = (screen: string) => {
    if (screen !== 'login') {
      setShowSwitcher(false);
    } else {
      setShowSwitcher(true);
    }
  };

  return (
    // Full-viewport root container
    <div className="min-h-screen h-screen w-screen bg-neutral-100 flex flex-col">
      {/* View Switcher - Only visible on login screens */}
      {showSwitcher && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setViewMode('client')}
            className={`px-4 py-2 border-2 border-neutral-800 font-medium ${
              viewMode === 'client' ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-800'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setViewMode('company')}
            className={`px-4 py-2 border-2 border-neutral-800 font-medium ${
              viewMode === 'company' ? 'bg-neutral-800 text-neutral-100' : 'bg-white text-neutral-800'
            }`}
          >
            Empresa
          </button>
        </div>
      )}

      {/* Content fills the remaining space */}
      <div className="flex-1 w-full h-full">
        {viewMode === 'client' ? (
          <ClientFlow onScreenChange={handleClientNavigation} />
        ) : (
          <CompanyFlow onScreenChange={handleCompanyNavigation} />
        )}
      </div>
    </div>
  );
}
