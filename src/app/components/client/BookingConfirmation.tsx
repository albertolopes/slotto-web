import { BookingData } from '../ClientFlow';
import { BackButton } from '../ui/BackButton';

interface BookingConfirmationProps {
  bookingData: BookingData;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingConfirmation({ bookingData, onConfirm, onBack }: BookingConfirmationProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Confirmar Agendamento</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <div className="border-2 border-neutral-800 p-4 bg-neutral-100">
            <div className="font-bold mb-2">Resumo do Agendamento</div>
          </div>

          <div className="border-2 border-neutral-800 p-4">
            <div className="space-y-3">
              <div>
                <div className="text-neutral-600 text-sm">Serviço</div>
                <div className="font-bold">{bookingData.service || '-'}</div>
              </div>

              {bookingData.staff && (
                <div className="border-t-2 border-neutral-300 pt-3">
                  <div className="text-neutral-600 text-sm">Profissional</div>
                  <div className="font-bold">{bookingData.staff}</div>
                </div>
              )}

              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-neutral-600 text-sm">Data</div>
                <div className="font-bold">{bookingData.date || '-'}</div>
              </div>

              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-neutral-600 text-sm">Horário</div>
                <div className="font-bold">{bookingData.time || '-'}</div>
              </div>
            </div>
          </div>

          <div className="border-2 border-neutral-800 p-4">
            <div className="space-y-3">
              <div>
                <div className="text-neutral-600 text-sm">Nome</div>
                <div className="font-bold">{bookingData.clientName || '-'}</div>
              </div>

              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-neutral-600 text-sm">Telefone</div>
                <div className="font-bold">{bookingData.clientPhone || '-'}</div>
              </div>

              <div className="border-t-2 border-neutral-300 pt-3">
                <div className="text-neutral-600 text-sm">Email</div>
                <div className="font-bold">{bookingData.clientEmail || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button
          onClick={onConfirm}
          className="w-full h-12 border-2 border-neutral-800 bg-neutral-800 text-white font-bold"
        >
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
}
