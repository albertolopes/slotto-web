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
  const [agreed, setAgreed] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const isNameValid = name.trim() !== '';
  const isEmailValid = email.includes('@');
  const isPhoneValid = phone.length > 8; // Simple validation

  const canSubmit = isNameValid && isEmailValid && isPhoneValid && agreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (canSubmit) {
      onNext({ clientName: name, clientPhone: phone, clientEmail: email });
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {onBack && <BackButton onClick={onBack} />}
          <div className="flex-1">
            <h1 className="font-bold text-lg text-center">Seus Dados</h1>
            <p className="text-sm text-neutral-500 text-center">Para finalizar o agendamento</p>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 font-bold text-sm text-neutral-700">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full h-12 px-4 bg-white border rounded-lg transition-colors ${attemptedSubmit && !isNameValid ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-800'}`}
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold text-sm text-neutral-700">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full h-12 px-4 bg-white border rounded-lg transition-colors ${attemptedSubmit && !isPhoneValid ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-800'}`}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-bold text-sm text-neutral-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-12 px-4 bg-white border rounded-lg transition-colors ${attemptedSubmit && !isEmailValid ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-800'}`}
              placeholder="seu@email.com"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900/50"
              />
              <span className="text-sm text-neutral-600">
                Li e aceito os <a href="#" className="underline font-medium text-neutral-800">termos de uso</a> e <a href="#" className="underline font-medium text-neutral-800">política de privacidade</a>.
              </span>
            </label>
          </div>
        </form>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
