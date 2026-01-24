import { useState, useEffect } from 'react';
import { BackButton } from '../ui/BackButton';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isBefore, startOfToday, getYear, getMonth, getDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { availability as availabilityApi } from '../../services/api';
import { BookingData } from '../ClientFlow';

interface DateSelectionProps {
  bookingData: BookingData;
  onNext: (date: Date) => void;
  onBack: () => void;
}

export function DateSelection({ bookingData, onNext, onBack }: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [monthlyAvailability, setMonthlyAvailability] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const today = startOfToday();

  const { companyId, serviceId, staffId } = bookingData;

  useEffect(() => {
    if (companyId && serviceId) {
      setLoading(true);
      availabilityApi.getMonthAvailability({
        companyId,
        year: getYear(currentMonth),
        month: getMonth(currentMonth) + 1, // API expects 1-12, date-fns gives 0-11
        serviceId,
        staffId,
      })
      .then(data => {
        const availabilityMap = (data || []).reduce((acc: Record<number, string>, day: any) => {
          acc[day.dia] = day.avaiable;
          return acc;
        }, {});
        setMonthlyAvailability(availabilityMap);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to get month availability", err);
        setLoading(false);
      });
    }
  }, [currentMonth, companyId, serviceId, staffId]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    if (!isSameMonth(currentMonth, today)) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleDateSelect = (day: Date) => {
    const dayNumber = getDate(day);
    const isAvailable = monthlyAvailability[dayNumber] === 'AVAILABLE';
    if (!isBefore(day, today) && isAvailable) {
      setSelectedDate(day);
    }
  };

  const handleContinue = () => {
    if (selectedDate) {
      onNext(selectedDate);
    }
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {onBack && <BackButton onClick={onBack} />}
          <div className="flex-1">
            <h1 className="font-bold text-lg text-center">Selecione a Data</h1>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Month Navigator */}
        <div className="flex items-center justify-between mb-4 px-2">
          <button onClick={prevMonth} disabled={isSameMonth(currentMonth, today)} className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-30">
            &lt;
          </button>
          <h2 className="font-bold text-lg capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-neutral-100">
            &gt;
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="text-center font-medium text-xs text-neutral-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const dayNumber = getDate(day);
              const isDayInPast = isBefore(day, today);
              const isDaySelected = selectedDate && isSameDay(day, selectedDate);
              const isDayInCurrentMonth = isSameMonth(day, currentMonth);
              const isAvailable = monthlyAvailability[dayNumber] === 'AVAILABLE';
              const isDisabled = isDayInPast || !isDayInCurrentMonth || (isDayInCurrentMonth && !isAvailable && !loading);

              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateSelect(day)}
                  disabled={isDisabled}
                  className={`
                    h-10 w-10 flex items-center justify-center text-sm rounded-full transition-colors
                    ${!isDayInCurrentMonth && 'text-neutral-300'}
                    ${isDisabled && 'text-neutral-300 cursor-not-allowed line-through'}
                    ${!isDisabled && 'hover:bg-neutral-100'}
                    ${isDaySelected && !isDisabled && 'bg-neutral-900 text-white hover:bg-neutral-700'}
                  `}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
          {loading && <div className="text-center text-xs text-neutral-400 pt-2">Carregando disponibilidade...</div>}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <button
          onClick={handleContinue}
          disabled={!selectedDate}
          className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
