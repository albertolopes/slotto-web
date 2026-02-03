'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calendar, User } from 'lucide-react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/search', label: 'Início', icon: <Home size={20} /> },
  { href: '/my-bookings', label: 'Meus Agendamentos', icon: <Calendar size={20} /> },
  { href: '/profile', label: 'Meu Perfil', icon: <User size={20} /> },
];

export function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="md:grid md:grid-cols-[240px_1fr] min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col bg-white border-r border-neutral-200 p-4">
          <div className="h-16 flex items-center px-4">
            <h1 className="font-bold text-xl">Slotto</h1>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href} legacyBehavior>
                <a className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  pathname.startsWith(item.href)
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100/50'
                }`}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-neutral-50">
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-6 py-3 safe-area-bottom z-20">
          <div className="flex justify-around items-center">
            {navItems.map(item => (
              <button 
                key={item.href}
                onClick={() => router.push(item.href)} 
                className={`flex flex-col items-center gap-1 transition-colors ${pathname.startsWith(item.href) ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
              >
                <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
                <span className="text-[10px] font-bold">{item.label === 'Meus Agendamentos' ? 'Agenda' : item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
