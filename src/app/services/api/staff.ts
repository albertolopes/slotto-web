import { apiFetch, jsonHeaders } from './client';

export async function listStaff(companyId: string) {
  return apiFetch(`/api/companies/${companyId}/staff`);
}

export async function addStaff(companyId: string, body: any) {
  return apiFetch(`/api/companies/${companyId}/staff`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function updateStaff(id: string, body: any) {
  return apiFetch(`/api/staff/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function deleteStaff(id: string) {
  return apiFetch(`/api/staff/${id}`, { method: 'DELETE' });
}
