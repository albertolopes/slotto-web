'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Login() {
  const [view, setView] = useState<'client' | 'company'>('client');
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    router.push('/search');
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    // In a real scenario, you'd get a token and companyId here
    router.push('/company/dashboard'); // Redirect to a future company dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 border-4 border-neutral-800 mx-auto mb-4 rounded-lg"></div>
          <h1 className="text-2xl font-bold">Slotto</h1>
          <p className="text-neutral-500">Agendamentos fáceis para todos</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-100">
          {/* View Toggler */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setView('client')}
              className={`py-2 rounded-md font-bold text-sm transition-colors ${view === 'client' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:bg-neutral-200/50'}`}
            >
              Sou Cliente
            </button>
            <button
              onClick={() => setView('company')}
              className={`py-2 rounded-md font-bold text-sm transition-colors ${view === 'company' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:bg-neutral-200/50'}`}
            >
              Sou Empresa
            </button>
          </div>

          {/* Client View */}
          {view === 'client' && (
            <form onSubmit={handleClientSubmit} className="space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-sm">Telefone</label>
                <input type="tel" placeholder="(00) 00000-0000" className="w-full h-12 px-4 bg-neutral-50 border rounded-lg border-neutral-200 focus:border-neutral-800" />
              </div>
              <button type="submit" className="w-full h-12 bg-neutral-900 text-white font-bold rounded-lg">Entrar</button>
              <button type="button" onClick={() => router.push('/search')} className="w-full h-12 border-2 border-neutral-200 text-neutral-700 font-bold rounded-lg">Continuar sem login</button>
              <div className="text-center text-xs text-neutral-500 pt-2">
                <p>Ao se cadastrar, você pode salvar seus agendamentos, cancelar e acompanhar o status pelo app.</p>
              </div>
            </form>
          )}

          {/* Company View */}
          {view === 'company' && (
            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <div>
                <label className="block mb-1.5 font-bold text-sm">Email</label>
                <input type="email" placeholder="empresa@email.com" className="w-full h-12 px-4 bg-neutral-50 border rounded-lg border-neutral-200 focus:border-neutral-800" />
              </div>
              <div>
                <label className="block mb-1.5 font-bold text-sm">Senha</label>
                <input type="password" placeholder="••••••••" className="w-full h-12 px-4 bg-neutral-50 border rounded-lg border-neutral-200 focus:border-neutral-800" />
              </div>
              <button type="submit" className="w-full h-12 bg-neutral-900 text-white font-bold rounded-lg">Entrar</button>
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">Não tem uma conta? Cadastre-se</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
