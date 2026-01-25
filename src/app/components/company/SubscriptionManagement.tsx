'use client';

import { useState, useEffect } from 'react';
import { subscriptions as subscriptionsApi } from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SubscriptionManagementProps {
  companyId: string;
}

export function SubscriptionManagement({ companyId }: SubscriptionManagementProps) {
  const [subscription, setSubscription] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      subscriptionsApi.getSubscription(companyId),
      subscriptionsApi.listPlans(),
    ])
      .then(([subData, plansData]) => {
        setSubscription(subData);
        setPlans(plansData || []);
        setSelectedPlanId(subData?.planId || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load subscription data", err);
        setLoading(false);
      });
  }, [companyId]);

  const handleUpdateSubscription = () => {
    if (!selectedPlanId) return;
    // Logic to handle payment and then update subscription
    console.log("Updating to plan:", selectedPlanId);
  };

  if (loading) {
    return <div className="p-6 text-center">Carregando dados da assinatura...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Gerenciar Assinatura</h1>
        <p className="text-neutral-500">Veja seu plano atual e opções de upgrade.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h3 className="font-bold mb-4">Seu Plano Atual</h3>
            {subscription ? (
              <div>
                <p className="text-xl font-bold text-neutral-900">{subscription.plan?.name || 'Plano Pro'}</p>
                <p className="text-neutral-500">
                  Próxima cobrança em {format(new Date(subscription.nextBillingDate), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500">Você não possui uma assinatura ativa.</p>
            )}
          </div>

          {/* Available Plans */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h3 className="font-bold mb-4">Planos Disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map(plan => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlanId === plan.id ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}
                >
                  <h4 className="font-bold">{plan.name}</h4>
                  <p className="text-2xl font-bold my-2">R$ {plan.price.toFixed(2)}<span className="text-sm font-normal text-neutral-500">/mês</span></p>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    {plan.features?.map((feature: string, i: number) => <li key={i}>- {feature}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary & Action */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-neutral-200 sticky top-6">
            <h3 className="font-bold mb-4">Resumo</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plano selecionado:</span>
                <span className="font-bold">{plans.find(p => p.id === selectedPlanId)?.name || 'Nenhum'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-neutral-100 pt-2 mt-2">
                <span>Total</span>
                <span>R$ {plans.find(p => p.id === selectedPlanId)?.price.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            <button 
              onClick={handleUpdateSubscription}
              disabled={!selectedPlanId || selectedPlanId === subscription?.planId}
              className="w-full h-12 mt-6 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 disabled:bg-neutral-300"
            >
              {selectedPlanId === subscription?.planId ? 'Plano Atual' : 'Mudar de Plano'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
