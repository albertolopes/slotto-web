import { apiFetch, jsonHeaders } from './client';

export type RescheduleRequest = { newDateISO: string };

export async function listAppointments(query?: string) {
  return apiFetch(`/api/appointments${query ? `?${query}` : ''}`);
}

export async function getAppointment(id: string) {
  return apiFetch(`/api/appointments/${id}`);
}

export async function createAppointment(body: any) {
  return apiFetch(`/api/appointments`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function cancelAppointment(id: string) {
  return apiFetch(`/api/appointments/${id}`, { method: 'DELETE' });
}

export async function confirmAppointment(id: string) {
  return apiFetch(`/api/appointments/${id}/confirm`, { method: 'POST' });
}

export async function rescheduleAppointment(id: string, body: RescheduleRequest) {
  return apiFetch(`/api/appointments/${id}/reschedule`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

