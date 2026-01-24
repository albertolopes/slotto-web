interface BookingSuccessProps {
  onViewBookings: () => void;
  onNewBooking: () => void;
}

export function BookingSuccess({ onViewBookings, onNewBooking }: BookingSuccessProps) {
  return (
    <div className="flex flex-col h-full bg-white p-6 justify-between">
      {/* Spacer at the top */}
      <div></div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-neutral-900 text-white rounded-full flex items-center justify-center mb-6 animate-in zoom-in-75 duration-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Agendamento Realizado!</h1>
        <p className="text-neutral-600 max-w-xs">
          Enviamos uma confirmação para seu email com todos os detalhes do seu agendamento.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={onViewBookings}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors"
        >
          Ver Meus Agendamentos
        </button>
        <button
          onClick={onNewBooking}
          className="w-full h-12 bg-neutral-100 text-neutral-800 font-bold rounded-xl hover:bg-neutral-200 transition-colors"
        >
          Novo Agendamento
        </button>
      </div>
    </div>
  );
}
