import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface TimeSelectionProps {
  onNext: (time: string) => void;
  onBack: () => void;
}

export function TimeSelection({ onNext, onBack }: TimeSelectionProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '09:30', available: false },
    { time: '10:00', available: true },
    { time: '10:30', available: true },
    { time: '11:00', available: false },
    { time: '11:30', available: true },
    { time: '13:00', available: true },
    { time: '13:30', available: true },
    { time: '14:00', available: false },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: true },
    { time: '16:00', available: false },
    { time: '16:30', available: true },
    { time: '17:00', available: true },
    { time: '17:30', available: false },
  ];

  const handleContinue = () => {
    if (selectedTime) {
      onNext(selectedTime);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Selecione o Horário</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4 border-2 border-neutral-800 p-3 text-center">
          <div className="font-bold">15 de Janeiro, 2025</div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => slot.available && setSelectedTime(slot.time)}
              disabled={!slot.available}
              className={`
                h-12 md:h-14 border-2 font-bold rounded-md
                ${
                  !slot.available
                    ? 'border-neutral-300 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'border-neutral-800 bg-neutral-800 text-white'
                    : 'border-neutral-800 hover:bg-neutral-200'
                }
              `}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button
          onClick={handleContinue}
          disabled={!selectedTime}
          className={`w-full h-12 border-2 border-neutral-800 font-bold ${
            selectedTime ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
