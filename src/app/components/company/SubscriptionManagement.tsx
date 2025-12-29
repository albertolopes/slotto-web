import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface SubscriptionManagementProps {
  onBack: () => void;
}

export function SubscriptionManagement({ onBack }: SubscriptionManagementProps) {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 49,90',
      features: ['1 Profissional', 'Até 50 agendamentos/mês', 'Suporte por email'],
    },
    {
      id: 'professional',
      name: 'Profissional',
      price: 'R$ 99,90',
      features: ['Até 5 Profissionais', 'Agendamentos ilimitados', 'Suporte prioritário', 'Relatórios'],
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      price: 'R$ 199,90',
      features: [
        'Profissionais ilimitados',
        'Agendamentos ilimitados',
        'Suporte 24/7',
        'Relatórios avançados',
        'API personalizada',
      ],
    },
  ];

  const paymentHistory = [
    { date: '01/12/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Cartão ****1234' },
    { date: '01/11/2024', amount: 'R$ 99,90', status: 'Pago', method: 'PIX' },
    { date: '01/10/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Cartão ****1234' },
    { date: '01/09/2024', amount: 'R$ 99,90', status: 'Pago', method: 'Boleto' },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-6 bg-neutral-100">
        <div className="flex items-center gap-4">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Assinatura</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
          {/* Left Column - Current Plan & Plans */}
          <div className="col-span-2 space-y-6">
            {/* Current Plan */}
            <div className="border-2 border-neutral-800 p-6">
              <h2 className="font-bold mb-4">Plano Atual</h2>
              <div className="border-2 border-neutral-800 p-4 bg-neutral-800 text-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-bold">Plano Profissional</div>
                    <div className="text-sm text-neutral-300">Renovação em 15 dias</div>
                  </div>
                  <div className="font-bold">R$ 99,90/mês</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-full h-2 border-2 border-white bg-neutral-700">
                    <div className="h-full bg-white" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-xs whitespace-nowrap">50% do ciclo</span>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <div className="border-2 border-neutral-800 p-6">
              <h2 className="font-bold mb-4">Planos Disponíveis</h2>
              <div className="grid grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border-2 border-neutral-800 p-4 ${
                      selectedPlan === plan.id ? 'bg-neutral-800 text-white' : 'bg-white'
                    }`}
                  >
                    <div className="font-bold mb-2">{plan.name}</div>
                    <div className={`mb-4 ${selectedPlan === plan.id ? 'text-neutral-200' : 'text-neutral-600'}`}>
                      {plan.price}/mês
                    </div>
                    <div className={`space-y-2 mb-4 text-sm ${selectedPlan === plan.id ? 'text-neutral-200' : 'text-neutral-600'}`}>
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span>✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full h-10 border-2 ${
                        selectedPlan === plan.id
                          ? 'border-white bg-white text-neutral-800'
                          : 'border-neutral-800 bg-neutral-800 text-white'
                      } font-bold`}
                    >
                      {selectedPlan === plan.id ? 'Plano Atual' : 'Selecionar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="border-2 border-neutral-800 p-6">
              <h2 className="font-bold mb-4">Forma de Pagamento</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`h-24 border-2 border-neutral-800 p-4 font-bold ${
                    paymentMethod === 'card' ? 'bg-neutral-800 text-white' : 'bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">💳</div>
                  <div>Cartão de Crédito</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`h-24 border-2 border-neutral-800 p-4 font-bold ${
                    paymentMethod === 'pix' ? 'bg-neutral-800 text-white' : 'bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div>PIX</div>
                </button>
                <button
                  onClick={() => setPaymentMethod('boleto')}
                  className={`h-24 border-2 border-neutral-800 p-4 font-bold ${
                    paymentMethod === 'boleto' ? 'bg-neutral-800 text-white' : 'bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">🧾</div>
                  <div>Boleto</div>
                </button>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <div className="border-2 border-neutral-800 p-4 bg-neutral-50 space-y-3">
                  <div>
                    <label className="block mb-2 font-bold text-sm">Número do Cartão</label>
                    <input
                      type="text"
                      className="w-full border-2 border-neutral-800 p-2"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block mb-2 font-bold text-sm">Validade</label>
                      <input type="text" className="w-full border-2 border-neutral-800 p-2" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold text-sm">CVV</label>
                      <input type="text" className="w-full border-2 border-neutral-800 p-2" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 font-bold text-sm">Nome no Cartão</label>
                    <input type="text" className="w-full border-2 border-neutral-800 p-2" placeholder="Nome completo" />
                  </div>
                </div>
              )}

              {paymentMethod === 'pix' && (
                <div className="border-2 border-neutral-800 p-4 bg-neutral-50">
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 border-2 border-neutral-800 bg-white mx-auto flex items-center justify-center">
                      <span className="text-neutral-600">QR CODE PIX</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold">Ou copie o código PIX:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="flex-1 border-2 border-neutral-800 p-2 text-xs bg-white"
                          value="00020126580014BR.GOV.BCB.PIX..."
                          readOnly
                        />
                        <button className="h-10 px-4 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
                          Copiar
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-600">
                      O pagamento será confirmado automaticamente após o processamento
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'boleto' && (
                <div className="border-2 border-neutral-800 p-4 bg-neutral-50">
                  <div className="space-y-3">
                    <div className="border-2 border-neutral-800 p-3 bg-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Código de Barras:</span>
                        <button className="px-3 py-1 border-2 border-neutral-800 bg-neutral-800 text-white font-bold text-xs">
                          Copiar
                        </button>
                      </div>
                      <div className="text-xs font-mono bg-neutral-100 p-2 border-2 border-neutral-300">
                        23793.38128 60009.384826 40000.063305 8 88370000009990
                      </div>
                    </div>
                    <div className="text-xs text-neutral-600">
                      <p>• Vencimento: 5 dias após emissão</p>
                      <p>• O boleto pode ser pago em qualquer banco ou lotérica</p>
                      <p>• Após o pagamento, a confirmação pode levar até 3 dias úteis</p>
                    </div>
                    <button className="w-full h-10 border-2 border-neutral-800 bg-white font-bold">
                      Baixar Boleto PDF
                    </button>
                  </div>
                </div>
              )}

              <button className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold mt-4">
                Confirmar Pagamento
              </button>
            </div>
          </div>

          {/* Right Column - Payment History & Info */}
          <div className="space-y-6">
            {/* Saved Cards */}
            <div className="border-2 border-neutral-800 p-4">
              <h2 className="font-bold mb-3">Cartões Salvos</h2>
              <div className="space-y-2">
                <div className="border-2 border-neutral-800 p-3 bg-neutral-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm">Visa ****1234</div>
                      <div className="text-xs text-neutral-600">Expira 12/25</div>
                    </div>
                    <div className="w-4 h-4 border-2 border-neutral-800 bg-neutral-800"></div>
                  </div>
                  <div className="text-xs text-neutral-600">Padrão para renovação</div>
                </div>
                <div className="border-2 border-neutral-800 p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm">Mastercard ****5678</div>
                      <div className="text-xs text-neutral-600">Expira 08/26</div>
                    </div>
                    <div className="w-4 h-4 border-2 border-neutral-800"></div>
                  </div>
                </div>
                <button className="w-full h-10 border-2 border-neutral-800 bg-white font-bold text-sm">
                  + Adicionar Cartão
                </button>
              </div>
            </div>

            {/* Payment History */}
            <div className="border-2 border-neutral-800 p-4">
              <h2 className="font-bold mb-3">Histórico de Pagamentos</h2>
              <div className="space-y-2 max-h-64 overflow-auto">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="border-2 border-neutral-800 p-3 bg-neutral-50">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-sm">{payment.amount}</div>
                      <div className="px-2 py-1 border-2 border-neutral-800 bg-white text-xs font-bold">
                        {payment.status}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-600">{payment.date}</div>
                    <div className="text-xs text-neutral-600">{payment.method}</div>
                  </div>
                ))}
              </div>
              <button className="w-full h-10 border-2 border-neutral-800 bg-white font-bold text-sm mt-3">
                Ver Todas as Faturas
              </button>
            </div>

            {/* Billing Info */}
            <div className="border-2 border-neutral-800 p-4">
              <h2 className="font-bold mb-3">Dados de Cobrança</h2>
              <div className="space-y-2 text-sm text-neutral-600">
                <div>
                  <div className="font-bold text-neutral-800">Nome/Empresa:</div>
                  <div>Salão Beleza Total LTDA</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-800">CNPJ:</div>
                  <div>00.000.000/0001-00</div>
                </div>
                <div>
                  <div className="font-bold text-neutral-800">Email:</div>
                  <div>contato@belezatotal.com</div>
                </div>
              </div>
              <button className="w-full h-10 border-2 border-neutral-800 bg-white font-bold text-sm mt-3">
                Editar Dados
              </button>
            </div>

            {/* Cancel Subscription */}
            <div className="border-2 border-neutral-800 p-4 bg-neutral-50">
              <h2 className="font-bold mb-2 text-sm">Cancelar Assinatura</h2>
              <p className="text-xs text-neutral-600 mb-3">
                Ao cancelar, você terá acesso até o fim do período pago.
              </p>
              <button className="w-full h-10 border-2 border-neutral-800 bg-white text-neutral-600 font-bold text-sm">
                Cancelar Plano
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
