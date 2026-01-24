import { apiFetch, jsonHeaders } from './client';

export async function listNotifications(query?: string) {
  return apiFetch(`/api/notifications${query ? `?${query}` : ''}`);
}

export async function createNotification(body: any) {
  return apiFetch(`/api/notifications`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function markNotificationAsSent(id: string) {
  return apiFetch(`/api/notifications/${id}/mark-sent`, { method: 'POST' });
}

export async function processScheduledNotifications() {
  return apiFetch(`/api/notifications/process`, { method: 'POST' });
}

export async function getNotification(id: string) {
  return apiFetch(`/api/notifications/${id}`);
}

export async function deleteNotification(id: string) {
  return apiFetch(`/api/notifications/${id}`, { method: 'DELETE' });
}

