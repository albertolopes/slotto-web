import { apiFetch, jsonHeaders } from './client';

export async function listPlans() {
  return apiFetch('/api/plans');
}

export async function getSubscription(companyId: string) {
  return apiFetch(`/api/companies/${companyId}/subscription`);
}

export async function updateSubscription(companyId: string, body: any) {
  return apiFetch(`/api/companies/${companyId}/subscription`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function processPaymentWebhook(body: any) {
  return apiFetch(`/api/subscriptions/webhook`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}
