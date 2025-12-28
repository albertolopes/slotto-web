interface BookingSuccessProps {
  onViewBookings: () => void;
  onNewBooking: () => void;
}

export function BookingSuccess({ onViewBookings, onNewBooking }: BookingSuccessProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="text-center">
          <h1 className="font-bold">Agendamento Confirmado</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 border-4 border-neutral-800 rounded-full flex items-center justify-center mb-6">
          <div className="text-4xl">✓</div>
        </div>

        <div className="text-center mb-8">
          <h2 className="font-bold mb-2">Agendamento Realizado!</h2>
          <p className="text-neutral-600">
            Enviamos uma confirmação para seu email com todos os detalhes.
          </p>
        </div>

        <div className="border-2 border-neutral-800 p-4 w-full mb-4">
          <div className="text-center">
            <div className="text-neutral-600 text-sm mb-1">Próximo agendamento</div>
            <div className="font-bold">15 de Janeiro, 2025</div>
            <div className="font-bold">às 14:00</div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={onViewBookings}
            className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
          >
            Ver Meus Agendamentos
          </button>

          <button
            onClick={onNewBooking}
            className="w-full h-12 border-2 border-neutral-800 bg-white text-neutral-800 font-bold"
          >
            Novo Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}
