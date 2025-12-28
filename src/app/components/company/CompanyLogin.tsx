import { useState } from 'react';

interface CompanyLoginProps {
  onLogin: () => void;
}

export function CompanyLogin({ onLogin }: CompanyLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-[800px] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 border-4 border-neutral-800 mx-auto mb-4"></div>
          <h1 className="font-bold mb-2">Sistema de Agendamentos</h1>
          <p className="text-neutral-600">Painel da Empresa</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-neutral-800 p-3 bg-white"
              placeholder="empresa@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-neutral-800 p-3 bg-white"
              placeholder="••••••••"
            />
          </div>

          <div className="border-2 border-neutral-400 p-3 bg-neutral-50">
            <div className="flex gap-2">
              <div className="w-5 h-5 border-2 border-neutral-800 flex-shrink-0"></div>
              <div className="text-sm text-neutral-600">Manter-me conectado</div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
          >
            Entrar
          </button>

          <div className="text-center">
            <button type="button" className="text-neutral-600 underline">
              Esqueci minha senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
