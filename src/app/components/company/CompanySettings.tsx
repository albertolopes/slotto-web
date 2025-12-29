import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface CompanySettingsProps {
  onBack: () => void;
  onManageSubscription?: () => void;
}

export function CompanySettings({ onBack, onManageSubscription }: CompanySettingsProps) {
  const [companyName, setCompanyName] = useState('Salão Exemplo');
  const [companyPhone, setCompanyPhone] = useState('(11) 98765-4321');
  const [companyEmail, setCompanyEmail] = useState('contato@salao.com');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Configurações</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Subscription Section */}
          <div className="border-2 border-neutral-800 p-6 bg-neutral-50">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Assinatura</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold mb-1">Plano Profissional</div>
                <div className="text-sm text-neutral-600">R$ 99,90/mês • Próxima cobrança: 15/01/2025</div>
              </div>
              <button
                onClick={onManageSubscription}
                className="h-10 px-6 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
              >
                Gerenciar Assinatura
              </button>
            </div>
          </div>

          {/* Company Info */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Informações da Empresa</div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-bold">Nome da Empresa</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-bold">Telefone</label>
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full border-2 border-neutral-800 p-3 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Email</label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full border-2 border-neutral-800 p-3 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Serviços</div>
            <div className="space-y-3 mb-4">
              {['Corte de Cabelo', 'Barba', 'Corte + Barba', 'Coloração'].map((service, index) => (
                <div key={index} className="border-2 border-neutral-800 p-3 flex items-center justify-between">
                  <span className="font-bold">{service}</span>
                  <button className="px-3 py-1 border-2 border-neutral-800">Editar</button>
                </div>
              ))}
            </div>
            <button className="w-full h-12 border-2 border-neutral-800 bg-white font-bold">
              + Adicionar Serviço
            </button>
          </div>

          {/* Staff */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Profissionais</div>
            <div className="space-y-3 mb-4">
              {['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira'].map((staff, index) => (
                <div key={index} className="border-2 border-neutral-800 p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border-2 border-neutral-800 bg-neutral-300"></div>
                    <div className="flex-1">
                      <div className="font-bold">{staff}</div>
                      <div className="text-sm text-neutral-600">Ativo</div>
                    </div>
                    <button className="px-3 py-1 border-2 border-neutral-800">Editar</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full h-12 border-2 border-neutral-800 bg-white font-bold">
              + Adicionar Profissional
            </button>
          </div>

          {/* Working Hours */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Horário de Funcionamento</div>
            <div className="space-y-3">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-bold">{day}</div>
                  <input
                    type="time"
                    className="border-2 border-neutral-800 p-2 bg-white"
                    defaultValue="09:00"
                  />
                  <input
                    type="time"
                    className="border-2 border-neutral-800 p-2 bg-white"
                    defaultValue="18:00"
                  />
                  <div className="flex gap-2">
                    <div className="w-5 h-5 border-2 border-neutral-800"></div>
                    <span className="text-sm">Fechado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}