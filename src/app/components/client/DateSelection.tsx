import { useState } from 'react';
import { BackButton } from '../ui/BackButton';

interface DateSelectionProps {
  onNext: (date: string) => void;
  onBack: () => void;
}

export function DateSelection({ onNext, onBack }: DateSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const days = [
    { day: 1, available: true },
    { day: 2, available: true },
    { day: 3, available: false },
    { day: 4, available: true },
    { day: 5, available: true },
    { day: 6, available: true },
    { day: 7, available: false },
    { day: 8, available: true },
    { day: 9, available: true },
    { day: 10, available: false },
    { day: 11, available: true },
    { day: 12, available: true },
    { day: 13, available: true },
    { day: 14, available: false },
    { day: 15, available: true },
    { day: 16, available: true },
    { day: 17, available: false },
    { day: 18, available: true },
    { day: 19, available: true },
    { day: 20, available: true },
    { day: 21, available: false },
    { day: 22, available: true },
    { day: 23, available: true },
    { day: 24, available: false },
    { day: 25, available: true },
    { day: 26, available: true },
    { day: 27, available: true },
    { day: 28, available: false },
    { day: 29, available: true },
    { day: 30, available: true },
  ];

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
  };

  const handleContinue = () => {
    if (selectedDate) {
      onNext(`2025-01-${selectedDate.toString().padStart(2, '0')}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-4">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold flex-1 text-center">Selecione a Data</h1>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4 border-2 border-neutral-800 p-3 text-center">
          <div className="font-bold">Janeiro 2025</div>
        </div>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center font-bold text-sm p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayInfo, index) => (
            <button
              key={index}
              onClick={() => dayInfo.available && handleDateSelect(dayInfo.day)}
              disabled={!dayInfo.available}
              className={`
                aspect-square border-2 flex items-center justify-center text-sm
                ${
                  !dayInfo.available
                    ? 'border-neutral-300 bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    : selectedDate === dayInfo.day
                    ? 'border-neutral-800 bg-neutral-800 text-white'
                    : 'border-neutral-800 hover:bg-neutral-200'
                }
              `}
            >
              {dayInfo.day}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="border-t-2 border-neutral-800 p-4">
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className={`w-full h-12 border-2 border-neutral-800 font-bold ${
            selectedDate ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
