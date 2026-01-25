'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appointments as appointmentsApi } from '../../services/api';
import { BackButton } from '../ui/BackButton';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BookingDetailProps {
  appointmentId: string;
  onBack: () => void;
}

export function BookingDetail({ appointmentId, onBack }: BookingDetailProps) {
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (appointmentId) {
      setLoading(true);
      appointmentsApi.getAppointment(appointmentId)
        .then(data => {
          setAppointment(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load appointment details", err);
          setError("Não foi possível carregar os detalhes do agendamento.");
          setLoading(false);
        });
    }
  }, [appointmentId]);

  const handleCancel = async () => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await appointmentsApi.cancelAppointment(appointmentId);
        router.push('/my-bookings'); // Go back to the list
      } catch (err) {
        alert("Erro ao cancelar o agendamento.");
      }
    }
  };

  const handleReschedule = () => {
    router.push(`/my-bookings/${appointmentId}/reschedule`);
  };

  if (loading) return <div className="p-6 text-center">Carregando...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!appointment) return <div className="p-6 text-center">Agendamento não encontrado.</div>;

  const appointmentDate = new Date(appointment.startTime);
  const isPastAppointment = isPast(appointmentDate);
  const canModify = appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELED' && !isPastAppointment;

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      <div className="bg-white p-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} />
          <h1 className="font-bold text-lg text-center flex-1">Detalhes do Agendamento</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5 space-y-4">
          <div>
            <p className="text-sm text-neutral-500">Serviço</p>
            <p className="font-bold text-xl">{appointment.service?.name}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Empresa</p>
            <p className="font-medium">{appointment.company?.name}</p>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-500">Data</span>
              <span className="font-bold text-neutral-800">{format(appointmentDate, "dd/MM/yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Hora</span>
              <span className="font-bold text-neutral-800">{format(appointmentDate, "HH:mm")}</span>
            </div>
            {appointment.staff?.name && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Profissional</span>
                <span className="font-bold text-neutral-800">{appointment.staff.name}</span>
              </div>
            )}
            {appointment.service?.price && (
              <div className="flex justify-between">
                <span className="text-neutral-500">Valor</span>
                <span className="font-bold text-neutral-800">R$ {appointment.service.price.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {canModify && (
        <div className="p-4 space-y-3">
          <button
            onClick={handleReschedule}
            className="w-full h-12 bg-neutral-900 text-white font-bold rounded-xl"
          >
            Reagendar
          </button>
          <button
            onClick={handleCancel}
            className="w-full h-12 bg-transparent text-red-600 font-bold rounded-xl"
          >
            Cancelar Agendamento
          </button>
        </div>
      )}
    </div>
  );
}
