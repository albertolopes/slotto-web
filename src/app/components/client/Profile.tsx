'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Profile() {
  const router = useRouter();
  
  // Mock user data - in a real app, this would come from an API/auth context
  const [user, setUser] = useState({
    name: 'Beto',
    email: 'beto@email.com',
    phone: '(11) 99999-8888',
  });
  const [notifications, setNotifications] = useState({
    reminders: true,
    promotions: false,
  });

  const handleLogout = () => {
    // In a real app, you would clear auth tokens here
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">Meu Perfil</h1>
          <button className="text-sm font-bold text-blue-600">Editar</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* User Info Section */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h2 className="font-bold text-xl">{user.name}</h2>
                <p className="text-neutral-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Personal Data Section */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5">
            <h3 className="font-bold mb-3">Meus Dados</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-500">Nome</span>
                <span className="font-medium text-neutral-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Telefone</span>
                <span className="font-medium text-neutral-900">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Email</span>
                <span className="font-medium text-neutral-900">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5">
            <h3 className="font-bold mb-3">Preferências</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="reminders" className="text-neutral-700">Lembretes de agendamento</label>
                <input type="checkbox" id="reminders" checked={notifications.reminders} onChange={e => setNotifications(p => ({...p, reminders: e.target.checked}))} className="h-5 w-5 rounded" />
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="promotions" className="text-neutral-700">Promoções e novidades</label>
                <input type="checkbox" id="promotions" checked={notifications.promotions} onChange={e => setNotifications(p => ({...p, promotions: e.target.checked}))} className="h-5 w-5 rounded" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div>
            <button 
              onClick={handleLogout}
              className="w-full h-12 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
