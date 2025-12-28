import { useState } from 'react';
import { ClientFlow } from './components/ClientFlow';
import { CompanyFlow } from './components/CompanyFlow';

export default function App() {
  const [viewMode, setViewMode] = useState<'client' | 'company'>('client');

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* View Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setViewMode('client')}
          className={`px-4 py-2 border-2 border-neutral-800 font-medium ${
            viewMode === 'client' ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-800'
          }`}
        >
          Cliente (Mobile)
        </button>
        <button
          onClick={() => setViewMode('company')}
          className={`px-4 py-2 border-2 border-neutral-800 font-medium ${
            viewMode === 'company' ? 'bg-neutral-800 text-neutral-100' : 'bg-white text-neutral-800'
          }`}
        >
          Empresa (Desktop)
        </button>
      </div>

      {/* Content */}
      {viewMode === 'client' ? <ClientFlow /> : <CompanyFlow />}
    </div>
  );
}
