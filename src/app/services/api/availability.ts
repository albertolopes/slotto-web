import { apiFetch } from './client';

/**
 * Fetches available time slots for a given service and professional on a specific date.
 */
export async function getAvailability(params: {
  companyId: string;
  date: string; // YYYY-MM-DD
  serviceId: string;
  staffId?: string;
}) {
  const query = new URLSearchParams(params as any).toString();
  return apiFetch(`/api/availability?${query}`);
}

/**
 * Fetches the availability status for each day of a given month.
 */
export async function getMonthAvailability(params: {
  companyId: string;
  year: number;
  month: number;
  serviceId: string;
  staffId?: string;
}) {
  const query = new URLSearchParams(params as any).toString();
  return apiFetch(`/api/availability/month?${query}`);
}
