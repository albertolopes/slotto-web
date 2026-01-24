import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { companies as companiesApi, companyServices as servicesApi, staff as staffApi, subscriptions as subscriptionsApi } from '../../services/api';

interface CompanySettingsProps {
  companyId: string; // Assuming companyId is passed
  onBack: () => void;
  onManageSubscription?: () => void;
}

export function CompanySettings({ companyId, onBack, onManageSubscription }: CompanySettingsProps) {
  const [company, setCompany] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      companiesApi.getCompany(companyId),
      servicesApi.listCompanyServices(companyId),
      staffApi.listStaff(companyId),
      subscriptionsApi.getSubscription(companyId),
    ])
      .then(([companyData, servicesData, staffData, subData]) => {
        setCompany(companyData || {});
        setServices(servicesData || []);
        setStaff(staffData || []);
        setSubscription(subData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load company settings', err);
        setLoading(false);
      });
  }, [companyId]);

  const handleSave = () => {
    // Assuming a single save button for simplicity
    // In a real app, you might have separate saves or a more complex state management
    companiesApi.updateCompany(companyId, company).then(() => {
      // Handle success, maybe show a toast
      console.log('Company updated');
    }).catch(err => console.error('Failed to update company', err));
  };

  if (loading) return <div className="p-6 text-center">Carregando configurações...</div>;

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
                <div className="font-bold mb-1">{subscription?.planId || 'Nenhum plano'}</div>
                <div className="text-sm text-neutral-600">
                  {subscription ? `Próxima cobrança: ${new Date(subscription.nextBillingDate).toLocaleDateString()}` : 'Assine um plano para começar'}
                </div>
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
                  value={company.name || ''}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full border-2 border-neutral-800 p-3 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-bold">Telefone</label>
                  <input
                    type="tel"
                    value={company.contact?.phone || ''}
                    onChange={(e) => setCompany({ ...company, contact: { ...company.contact, phone: e.target.value } })}
                    className="w-full border-2 border-neutral-800 p-3 bg-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Email</label>
                  <input
                    type="email"
                    value={company.contact?.email || ''}
                    onChange={(e) => setCompany({ ...company, contact: { ...company.contact, email: e.target.value } })}
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
              {services.map((service) => (
                <div key={service.id} className="border-2 border-neutral-800 p-3 flex items-center justify-between">
                  <span className="font-bold">{service.name}</span>
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
              {staff.map((person) => (
                <div key={person.id} className="border-2 border-neutral-800 p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border-2 border-neutral-800 bg-neutral-300"></div>
                    <div className="flex-1">
                      <div className="font-bold">{person.name}</div>
                      <div className="text-sm text-neutral-600">{person.active ? 'Ativo' : 'Inativo'}</div>
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
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-bold capitalize">{day}</div>
                  <input
                    type="time"
                    className="border-2 border-neutral-800 p-2 bg-white"
                    defaultValue={company.settings?.openingHours?.[day]?.start || '09:00'}
                  />
                  <input
                    type="time"
                    className="border-2 border-neutral-800 p-2 bg-white"
                    defaultValue={company.settings?.openingHours?.[day]?.end || '18:00'}
                  />
                  <div className="flex gap-2">
                    <input type="checkbox" className="w-5 h-5 border-2 border-neutral-800" defaultChecked={!company.settings?.openingHours?.[day]} />
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
        <button onClick={handleSave} className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
