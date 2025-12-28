interface DailyAgendaProps {
  onViewDetail: (appointmentId: string) => void;
  onCreateBooking: () => void;
  onSettings: () => void;
}

export function DailyAgenda({ onViewDetail, onCreateBooking, onSettings }: DailyAgendaProps) {
  const appointments = [
    {
      id: '1',
      time: '09:00',
      client: 'Maria Silva',
      service: 'Corte de Cabelo',
      staff: 'João Silva',
      status: 'confirmado',
    },
    {
      id: '2',
      time: '10:00',
      client: 'Pedro Santos',
      service: 'Barba',
      staff: 'Pedro Costa',
      status: 'confirmado',
    },
    {
      id: '3',
      time: '11:00',
      client: 'Ana Oliveira',
      service: 'Coloração',
      staff: 'Maria Santos',
      status: 'em-andamento',
    },
    {
      id: '4',
      time: '14:00',
      client: 'Carlos Ferreira',
      service: 'Corte + Barba',
      staff: 'João Silva',
      status: 'confirmado',
    },
    {
      id: '5',
      time: '15:30',
      client: 'Juliana Costa',
      service: 'Corte de Cabelo',
      staff: 'Ana Oliveira',
      status: 'confirmado',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold mb-1">Agenda do Dia</h1>
            <div className="text-neutral-600">27 de Dezembro, 2025</div>
          </div>
          <button
            onClick={onSettings}
            className="w-12 h-12 border-2 border-neutral-800 flex items-center justify-center"
          >
            ⚙
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCreateBooking}
            className="flex-1 h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
          >
            + Novo Agendamento
          </button>
          <button className="h-12 px-6 border-2 border-neutral-800 bg-white font-bold">Filtros</button>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b-2 border-neutral-800 p-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="border-2 border-neutral-800 p-4 text-center">
            <div className="font-bold mb-1">12</div>
            <div className="text-sm text-neutral-600">Total</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center bg-neutral-100">
            <div className="font-bold mb-1">8</div>
            <div className="text-sm text-neutral-600">Confirmados</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center">
            <div className="font-bold mb-1">1</div>
            <div className="text-sm text-neutral-600">Em Andamento</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center">
            <div className="font-bold mb-1">3</div>
            <div className="text-sm text-neutral-600">Concluídos</div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-3">
          {appointments.map((apt) => (
            <button
              key={apt.id}
              onClick={() => onViewDetail(apt.id)}
              className="w-full border-2 border-neutral-800 p-4 text-left hover:bg-neutral-100 transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-16 text-center border-r-2 border-neutral-300 pr-4">
                  <div className="font-bold">{apt.time}</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">{apt.client}</div>
                    <div
                      className={`px-3 py-1 border-2 text-xs font-bold ${
                        apt.status === 'em-andamento'
                          ? 'border-neutral-800 bg-neutral-800 text-white'
                          : apt.status === 'confirmado'
                          ? 'border-neutral-800 bg-white'
                          : 'border-neutral-400 bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {apt.status === 'em-andamento'
                        ? 'EM ANDAMENTO'
                        : apt.status === 'confirmado'
                        ? 'CONFIRMADO'
                        : 'CONCLUÍDO'}
                    </div>
                  </div>
                  <div className="text-neutral-600 text-sm">
                    {apt.service} • {apt.staff}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
