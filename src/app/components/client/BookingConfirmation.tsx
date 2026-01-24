import { useState } from 'react';
import { BookingData } from '../ClientFlow';
import { BackButton } from '../ui/BackButton';
import { appointments as appointmentsApi } from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookingConfirmationProps {
  bookingData: BookingData;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingConfirmation({ bookingData, onConfirm, onBack }: BookingConfirmationProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    setLoading(true);
    setError(null);

    const dateString = bookingData.date ? format(bookingData.date, 'yyyy-MM-dd') : '';

    const appointmentPayload = {
      companyId: bookingData.companyId,
      customerName: bookingData.clientName,
      customerPhone: bookingData.clientPhone,
      customerEmail: bookingData.clientEmail,
      serviceId: bookingData.serviceId,
      staffId: bookingData.staffId,
      startTime: `${dateString}T${bookingData.time}:00`,
      notes: ''
    };

    appointmentsApi.createAppointment(appointmentPayload)
      .then(() => {
        setLoading(false);
        onConfirm();
      })
      .catch((err) => {
        console.error('Failed to create appointment', err);
        setError('Erro ao confirmar agendamento. Tente novamente.');
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {onBack && <BackButton onClick={onBack} />}
          <div className="flex-1">
            <h1 className="font-bold text-lg text-center">Confirmar Agendamento</h1>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          <p className="text-center text-sm text-neutral-600 mb-4">
            Revise os detalhes do seu agendamento antes de confirmar.
          </p>

          {/* Booking Summary Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4">
            <div>
              <div className="font-bold text-lg text-neutral-900">
                {bookingData.date ? format(bookingData.date, "eeee, dd 'de' MMMM", { locale: ptBR }) : 'Data não selecionada'}
              </div>
              <div className="text-base text-neutral-600">
                às {bookingData.time || '--:--'}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">Serviço</span>
                <span className="font-bold text-neutral-900">{bookingData.serviceName || '-'}</span>
              </div>
              {bookingData.staffName && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Profissional</span>
                  <span className="font-bold text-neutral-900">{bookingData.staffName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Client Data Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5">
            <h3 className="font-bold mb-3">Seus Dados</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-500">Nome</span>
                <span className="font-bold text-neutral-900">{bookingData.clientName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Telefone</span>
                <span className="font-bold text-neutral-900">{bookingData.clientPhone || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Email</span>
                <span className="font-bold text-neutral-900">{bookingData.clientEmail || '-'}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm font-bold rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors disabled:bg-neutral-300"
        >
          {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
        </button>
      </div>
    </div>
  );
}
