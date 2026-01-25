'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { appointments as appointmentsApi } from '../../../services/api';
import { DateSelection } from '../../../components/client/DateSelection';
import { TimeSelection } from '../../../components/client/TimeSelection';
import { format } from 'date-fns';

type RescheduleStep = 'date' | 'time' | 'confirm';

export default function ReschedulePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [step, setStep] = useState<RescheduleStep>('date');
  const [appointment, setAppointment] = useState<any>(null);
  const [newBookingData, setNewBookingData] = useState<any>({});

  useEffect(() => {
    if (id) {
      appointmentsApi.getAppointment(id).then(setAppointment);
    }
  }, [id]);

  const handleReschedule = async () => {
    if (!newBookingData.date || !newBookingData.time) return;

    const newDateISO = `${format(newBookingData.date, 'yyyy-MM-dd')}T${newBookingData.time}:00`;
    
    try {
      await appointmentsApi.rescheduleAppointment(id, { newDateISO });
      alert("Agendamento reagendado com sucesso!");
      router.push('/my-bookings');
    } catch (err) {
      alert("Erro ao reagendar.");
    }
  };

  if (!appointment) return <div>Carregando...</div>;

  const bookingDataForSelection = {
    ...appointment,
    ...newBookingData,
  };

  switch (step) {
    case 'date':
      return <DateSelection bookingData={bookingDataForSelection} onNext={(date) => { setNewBookingData({ date }); setStep('time'); }} onBack={() => router.back()} />;
    case 'time':
      return <TimeSelection bookingData={bookingDataForSelection} onNext={(time) => { setNewBookingData(prev => ({ ...prev, time })); setStep('confirm'); }} onBack={() => setStep('date')} />;
    case 'confirm':
      // A simple confirmation step
      handleReschedule();
      return <div>Confirmando reagendamento...</div>;
    default:
      return null;
  }
}
