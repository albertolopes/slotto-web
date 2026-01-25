'use client';

import { useState, useEffect } from 'react';
import { appointments as appointmentsApi, staff as staffApi } from '../../services/api';
import { format, startOfToday } from 'date-fns';

interface AgendaViewProps {
  companyId: string;
}

export function AgendaView({ companyId }: AgendaViewProps) {
  const [date, setDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
  const [staffList, setStaffList] = useState<any[]>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string>('all');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch staff list for the filter dropdown
  useEffect(() => {
    staffApi.listStaff(companyId).then(setStaffList);
  }, [companyId]);

  // Fetch appointments when date or staff filter changes
  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams({ date });
    if (selectedStaffId !== 'all') {
      queryParams.append('staffId', selectedStaffId);
    }

    appointmentsApi.listAppointments(queryParams.toString())
      .then(data => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load appointments", err);
        setLoading(false);
      });
  }, [date, selectedStaffId]);

  return (
    <div className="p-4 md:p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Agenda Completa</h1>
        <p className="text-neutral-500">Visualize e gerencie todos os seus agendamentos.</p>
      </header>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="date-filter" className="block text-sm font-medium text-neutral-700 mb-1">Data</label>
          <input
            type="date"
            id="date-filter"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-10 px-3 border border-neutral-300 rounded-lg"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="staff-filter" className="block text-sm font-medium text-neutral-700 mb-1">Profissional</label>
          <select
            id="staff-filter"
            value={selectedStaffId}
            onChange={(e) => setSelectedStaffId(e.target.value)}
            className="w-full h-10 px-3 border border-neutral-300 rounded-lg"
          >
            <option value="all">Todos</option>
            {staffList.map(staff => (
              <option key={staff.id} value={staff.id}>{staff.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="font-bold mb-4">Agendamentos para {format(new Date(date), 'dd/MM/yyyy')}</h3>
        <div className="space-y-4">
          {loading ? (
            <p>Carregando...</p>
          ) : appointments.length > 0 ? (
            appointments.map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50">
                <div className="w-20 font-bold">{format(new Date(apt.startTime), 'HH:mm')}</div>
                <div className="flex-1">
                  <p className="font-semibold">{apt.customerName}</p>
                  <p className="text-sm text-neutral-500">{apt.service?.name}</p>
                </div>
                <div className="text-sm text-neutral-600">{apt.staff?.name}</div>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-500 text-center py-8">Nenhum agendamento para esta data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
