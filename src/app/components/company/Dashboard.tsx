'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appointments as appointmentsApi } from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { Calendar, CreditCard, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    appointmentsApi.listAppointments(`date=${today}`)
      .then(data => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load today's appointments", err);
        setLoading(false);
      });
  }, []);

  const totalAppointments = appointments.length;
  const revenue = appointments.reduce((acc, apt) => acc + (apt.service?.price || 0), 0);

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">Bom dia, Barbearia do Beto!</h1>
        <p className="text-neutral-500 mt-1">Aqui está um resumo do seu dia.</p>
      </header>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link href="/company/agenda" legacyBehavior>
          <a className="bg-white p-6 rounded-xl border border-neutral-200 flex items-center justify-between hover:border-neutral-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-neutral-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Ver Agenda</h3>
                <p className="text-sm text-neutral-500">Gerencie seus horários</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-neutral-400" />
          </a>
        </Link>
        <Link href="/company/subscription" legacyBehavior>
          <a className="bg-white p-6 rounded-xl border border-neutral-200 flex items-center justify-between hover:border-neutral-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                <CreditCard size={24} className="text-neutral-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Assinatura</h3>
                <p className="text-sm text-neutral-500">Gerencie seu plano</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-neutral-400" />
          </a>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Agendamentos Hoje</h3>
          <p className="text-3xl font-bold mt-1">{totalAppointments}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Faturamento Previsto</h3>
          <p className="text-3xl font-bold mt-1">R$ {revenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Novos Clientes (Mês)</h3>
          <p className="text-3xl font-bold mt-1">12</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="font-bold mb-4">Próximos Agendamentos</h3>
        <div className="space-y-4">
          {loading ? (
            <p>Carregando...</p>
          ) : appointments.length > 0 ? (
            appointments.slice(0, 5).map(apt => (
              <div key={apt.id} className="flex items-center justify-between">
                <div>
                  <p className="font-bold">{apt.customerName}</p>
                  <p className="text-sm text-neutral-500">{apt.service?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{format(new Date(apt.startTime), 'HH:mm')}</p>
                  <p className="text-sm text-neutral-500">{apt.staff?.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-500 text-center py-4">Nenhum agendamento para hoje.</p>
          )}
        </div>
      </div>
    </div>
  );
}
