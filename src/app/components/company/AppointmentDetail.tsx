import { BackButton } from '../ui/BackButton';

interface AppointmentDetailProps {
  appointmentId: string | null;
  onBack: () => void;
}

export function AppointmentDetail({ appointmentId, onBack }: AppointmentDetailProps) {
  // Mock data
  const appointment = {
    id: appointmentId,
    time: '09:00',
    date: '27 de Dezembro, 2025',
    client: 'Maria Silva',
    phone: '(11) 98765-4321',
    email: 'maria@email.com',
    service: 'Corte de Cabelo',
    duration: '30 min',
    price: 'R$ 50,00',
    staff: 'João Silva',
    status: 'confirmado',
    notes: 'Cliente preferiu corte curto',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-6">
        <div className="flex items-center gap-4 mb-4">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1">Detalhes do Agendamento</h1>
          <div className="px-4 py-2 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">CONFIRMADO</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Date & Time */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Data e Horário</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-neutral-600 text-sm mb-1">Data</div>
                <div className="font-bold">{appointment.date}</div>
              </div>
              <div>
                <div className="text-neutral-600 text-sm mb-1">Horário</div>
                <div className="font-bold">{appointment.time}</div>
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Informações do Cliente</div>
            <div className="space-y-3">
              <div>
                <div className="text-neutral-600 text-sm mb-1">Nome</div>
                <div className="font-bold">{appointment.client}</div>
              </div>
              <div>
                <div className="text-neutral-600 text-sm mb-1">Telefone</div>
                <div className="font-bold">{appointment.phone}</div>
              </div>
              <div>
                <div className="text-neutral-600 text-sm mb-1">Email</div>
                <div className="font-bold">{appointment.email}</div>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Serviço</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-neutral-600 text-sm mb-1">Serviço</div>
                <div className="font-bold">{appointment.service}</div>
              </div>
              <div>
                <div className="text-neutral-600 text-sm mb-1">Duração</div>
                <div className="font-bold">{appointment.duration}</div>
              </div>
              <div>
                <div className="text-neutral-600 text-sm mb-1">Valor</div>
                <div className="font-bold">{appointment.price}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t-2 border-neutral-300">
              <div className="text-neutral-600 text-sm mb-1">Profissional</div>
              <div className="font-bold">{appointment.staff}</div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-2 border-neutral-800 p-6">
            <div className="font-bold mb-4 pb-4 border-b-2 border-neutral-300">Observações</div>
            <div className="border-2 border-neutral-400 p-4 bg-neutral-50 min-h-[100px]">
              {appointment.notes}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-4">
            <button className="h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold">
              Iniciar Atendimento
            </button>
            <button className="h-12 border-2 border-neutral-800 bg-white font-bold">Reagendar</button>
            <button className="h-12 border-2 border-neutral-800 bg-white font-bold">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
