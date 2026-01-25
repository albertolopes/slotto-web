'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-neutral-50 relative">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-auto pb-24">
        {children}
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-3 safe-area-bottom z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button 
            onClick={() => router.push('/search')} 
            className={`flex flex-col items-center gap-1 transition-colors ${pathname.startsWith('/search') ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="text-[10px] font-bold">Início</span>
          </button>
          
          <button 
            onClick={() => router.push('/my-bookings')} 
            className={`flex flex-col items-center gap-1 transition-colors ${pathname.startsWith('/my-bookings') ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <span className="text-[10px] font-medium">Agenda</span>
          </button>

          <button 
            onClick={() => router.push('/profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${pathname.startsWith('/profile') ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="text-[10px] font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
