import { useState } from 'react';

interface ClientLoginProps {
  onLogin: () => void;
  onGuestAccess: () => void;
}

export function ClientLogin({ onLogin, onGuestAccess }: ClientLoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin && phone) {
      onLogin();
    } else if (!isLogin && phone && name && email) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neutral-800 mx-auto mb-3"></div>
          <h1 className="font-bold">Sistema de Agendamentos</h1>
          <p className="text-neutral-600 text-sm mt-1">Área do Cliente</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Toggle Login/Register */}
          <div className="grid grid-cols-2 gap-0 border-2 border-neutral-800 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`p-3 font-bold border-r-2 border-neutral-800 ${
                isLogin ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-800'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`p-3 font-bold ${
                !isLogin ? 'bg-neutral-800 text-white' : 'bg-white text-neutral-800'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block mb-2 font-bold">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                  placeholder="Digite seu nome"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 font-bold">Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-neutral-800 p-3 bg-white"
                placeholder="(00) 00000-0000"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block mb-2 font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                  placeholder="seu@email.com"
                />
              </div>
            )}

            {isLogin && (
              <div>
                <label className="block mb-2 font-bold">Senha</label>
                <input
                  type="password"
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>

            {isLogin && (
              <div className="text-center">
                <button type="button" className="text-neutral-600 underline text-sm">
                  Esqueci minha senha
                </button>
              </div>
            )}
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t-2 border-neutral-400"></div>
            <span className="text-neutral-600 text-sm">OU</span>
            <div className="flex-1 border-t-2 border-neutral-400"></div>
          </div>

          <button
            onClick={onGuestAccess}
            className="w-full h-12 border-2 border-neutral-800 bg-white font-bold"
          >
            Continuar sem Login
          </button>

          {!isLogin && (
            <div className="mt-6 border-2 border-neutral-400 p-3 bg-neutral-50">
              <div className="flex gap-2">
                <div className="w-5 h-5 border-2 border-neutral-800 flex-shrink-0"></div>
                <div className="text-sm text-neutral-600">
                  Li e aceito os termos de uso e política de privacidade
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-neutral-800 p-4 bg-neutral-100">
        <div className="text-center text-sm text-neutral-600">
          <p>Ao fazer login, você terá acesso ao histórico</p>
          <p>e poderá gerenciar seus agendamentos</p>
        </div>
      </div>
    </div>
  );
}
