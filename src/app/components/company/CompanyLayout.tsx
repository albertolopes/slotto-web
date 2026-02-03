'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Calendar, Scissors, Users, Settings, CreditCard } from 'lucide-react';

interface CompanyLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/company/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/company/agenda', label: 'Agenda', icon: <Calendar size={20} /> },
  { href: '/company/services', label: 'Serviços', icon: <Scissors size={20} /> },
  { href: '/company/staff', label: 'Equipe', icon: <Users size={20} /> },
  { href: '/company/subscription', label: 'Assinatura', icon: <CreditCard size={20} /> },
  { href: '/company/settings', label: 'Configurações', icon: <Settings size={20} /> },
];

const SidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="h-16 flex items-center px-6 border-b border-neutral-200">
        <h1 className="font-bold text-xl">Slotto</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} legacyBehavior>
            <a className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
              pathname.startsWith(item.href)
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-neutral-100"></div>
          <div>
            <p className="font-bold text-sm">Barbearia do Beto</p>
            <p className="text-xs text-neutral-500">Plano Pro</p>
          </div>
        </div>
        <button onClick={() => router.push('/login')} className="w-full text-left text-sm text-neutral-500 font-medium hover:text-red-600">
          Sair
        </button>
      </div>
    </div>
  );
};

export function CompanyLayout({ children }: CompanyLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-shrink-0 border-r border-neutral-200">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="w-64 h-full bg-white" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-bold text-lg">Slotto</h1>
          <div className="w-8"></div>
        </header>
        
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
