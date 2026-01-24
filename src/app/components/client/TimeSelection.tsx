import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { format, isSameDay, startOfToday, setHours, setMinutes, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { availability as availabilityApi } from '../../services/api';
import { BookingData } from '../ClientFlow';

interface TimeSelectionProps {
  bookingData: BookingData;
  onNext: (time: string) => void;
  onBack: () => void;
}

export function TimeSelection({ bookingData, onNext, onBack }: TimeSelectionProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { date: selectedDate, companyId, serviceId, staffId } = bookingData;

  useEffect(() => {
    if (selectedDate && companyId && serviceId) {
      setLoading(true);
      availabilityApi.getAvailability({
        companyId,
        date: format(selectedDate, 'yyyy-MM-dd'),
        serviceId,
        staffId,
      })
      .then(slots => {
        setAvailableSlots(slots || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to get availability", err);
        setAvailableSlots([]);
        setLoading(false);
      });
    }
  }, [selectedDate, companyId, serviceId, staffId]);

  const now = new Date();
  const isToday = selectedDate && isSameDay(selectedDate, startOfToday());

  const handleContinue = () => {
    if (selectedTime) {
      onNext(selectedTime);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {onBack && <BackButton onClick={onBack} />}
          <div className="flex-1">
            <h1 className="font-bold text-lg text-center">Selecione o Horário</h1>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="text-center font-bold mb-4 p-3 bg-white rounded-lg border border-neutral-200">
          {selectedDate ? format(selectedDate, "eeee, dd 'de' MMMM", { locale: ptBR }) : 'Selecione uma data'}
        </div>

        {loading ? (
          <div className="text-center text-neutral-500 py-8">Buscando horários...</div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableSlots.length > 0 ? availableSlots.map((slot, index) => {
              const [hour, minute] = slot.split(':').map(Number);
              const slotTime = selectedDate ? setMinutes(setHours(selectedDate, hour), minute) : now;
              const isSlotInPast = isToday && isBefore(slotTime, now);

              return (
                <button
                  key={index}
                  onClick={() => !isSlotInPast && setSelectedTime(slot)}
                  disabled={isSlotInPast}
                  className={`
                    h-12 font-bold rounded-lg transition-colors
                    ${isSlotInPast 
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200'
                      : selectedTime === slot
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white border border-neutral-200 hover:border-neutral-900'
                    }
                  `}
                >
                  {slot}
                </button>
              );
            }) : (
              <div className="col-span-full text-center text-neutral-500 py-8">
                Nenhum horário disponível para esta data.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <button
          onClick={handleContinue}
          disabled={!selectedTime}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
