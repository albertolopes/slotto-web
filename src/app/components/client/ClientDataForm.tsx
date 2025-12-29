import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface ClientDataFormProps {
  onNext: (data: { clientName: string; clientPhone: string; clientEmail: string }) => void;
  onBack: () => void;
}

export function ClientDataForm({ onNext, onBack }: ClientDataFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email) {
      onNext({ clientName: name, clientPhone: phone, clientEmail: email });
    }
  };

  const isValid = name && phone && email;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Seus Dados</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="border-2 border-neutral-400 p-3 bg-neutral-50">
            <div className="flex gap-2">
              <div className="w-5 h-5 border-2 border-neutral-800 flex-shrink-0"></div>
              <div className="text-sm text-neutral-600">
                Li e aceito os termos de uso e política de privacidade
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full h-12 border-2 border-neutral-800 font-bold ${
            isValid ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
