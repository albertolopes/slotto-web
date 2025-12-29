import { BackButton } from '../ui/BackButton';

interface MyBookingsProps {
  onBack: () => void;
}

export function MyBookings({ onBack }: MyBookingsProps) {
  const bookings = [
    {
      id: 1,
      service: 'Corte de Cabelo',
      date: '15 Jan 2025',
      time: '14:00',
      staff: 'João Silva',
      status: 'confirmado',
    },
    {
      id: 2,
      service: 'Barba',
      date: '22 Jan 2025',
      time: '10:00',
      staff: 'Pedro Costa',
      status: 'confirmado',
    },
    {
      id: 3,
      service: 'Corte + Barba',
      date: '05 Jan 2025',
      time: '15:30',
      staff: 'João Silva',
      status: 'concluído',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Meus Agendamentos</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="border-2 border-neutral-800 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="font-bold">{booking.service}</div>
                <div
                  className={`px-2 py-1 border-2 text-xs font-bold ${
                    booking.status === 'confirmado'
                      ? 'border-neutral-800 bg-neutral-800 text-white'
                      : 'border-neutral-400 bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {booking.status.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-neutral-600">Data:</span>
                  <span className="font-bold">{booking.date}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-600">Horário:</span>
                  <span className="font-bold">{booking.time}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-neutral-600">Profissional:</span>
                  <span className="font-bold">{booking.staff}</span>
                </div>
              </div>

              {booking.status === 'confirmado' && (
                <div className="mt-3 pt-3 border-t-2 border-neutral-300">
                  <button className="w-full h-10 border-2 border-neutral-800 font-bold hover:bg-neutral-200">
                    Cancelar Agendamento
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button
          onClick={onBack}
          className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
        >
          Novo Agendamento
        </button>
      </div>
    </div>
  );
}
