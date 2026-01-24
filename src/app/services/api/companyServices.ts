import { apiFetch, jsonHeaders } from './client';

export async function listCompanyServices(companyId: string) {
  return apiFetch(`/api/companies/${companyId}/services`);
}

export async function createCompanyService(companyId: string, body: any) {
  return apiFetch(`/api/companies/${companyId}/services`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function updateCompanyService(companyId: string, serviceId: string, body: any) {
  return apiFetch(`/api/companies/${companyId}/services/${serviceId}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function deleteCompanyService(companyId: string, serviceId: string) {
  return apiFetch(`/api/companies/${companyId}/services/${serviceId}`, { method: 'DELETE' });
}
