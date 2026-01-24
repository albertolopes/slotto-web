import { useState, useEffect } from 'react';
import { appointments as appointmentsApi } from '../../services/api';

interface DailyAgendaProps {
  onViewDetail: (appointmentId: string) => void;
  onCreateBooking: () => void;
  onSettings: () => void;
}

export function DailyAgenda({ onViewDetail, onCreateBooking, onSettings }: DailyAgendaProps) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    appointmentsApi.listAppointments()
      .then((data) => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load appointments', err);
        setLoading(false);
      });
  }, []);

  // Calculate stats
  const total = appointments.length;
  const confirmed = appointments.filter(a => a.status === 'CONFIRMED').length;
  const inProgress = appointments.filter(a => a.status === 'IN_PROGRESS').length;
  const completed = appointments.filter(a => a.status === 'COMPLETED').length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b-2 border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold mb-1">Agenda do Dia</h1>
            <div className="text-neutral-600">{new Date().toLocaleDateString()}</div>
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
            <div className="font-bold mb-1">{total}</div>
            <div className="text-sm text-neutral-600">Total</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center bg-neutral-100">
            <div className="font-bold mb-1">{confirmed}</div>
            <div className="text-sm text-neutral-600">Confirmados</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center">
            <div className="font-bold mb-1">{inProgress}</div>
            <div className="text-sm text-neutral-600">Em Andamento</div>
          </div>
          <div className="border-2 border-neutral-800 p-4 text-center">
            <div className="font-bold mb-1">{completed}</div>
            <div className="text-sm text-neutral-600">Concluídos</div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="text-center p-4">Carregando agenda...</div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => {
              const time = new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <button
                  key={apt.id}
                  onClick={() => onViewDetail(apt.id)}
                  className="w-full border-2 border-neutral-800 p-4 text-left hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="w-16 text-center border-r-2 border-neutral-300 pr-4">
                      <div className="font-bold">{time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold">{apt.customerName}</div>
                        <div
                          className={`px-3 py-1 border-2 text-xs font-bold ${
                            apt.status === 'IN_PROGRESS'
                              ? 'border-neutral-800 bg-neutral-800 text-white'
                              : apt.status === 'CONFIRMED'
                              ? 'border-neutral-800 bg-white'
                              : 'border-neutral-400 bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {apt.status || 'PENDING'}
                        </div>
                      </div>
                      <div className="text-neutral-600 text-sm">
                        {apt.serviceName || 'Serviço'} • {apt.staffName || 'Profissional'}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            {appointments.length === 0 && !loading && (
              <div className="text-center text-neutral-600">Nenhum agendamento para hoje.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
