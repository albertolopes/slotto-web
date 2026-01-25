import { apiFetch, jsonHeaders } from './client';

export async function listCompanies(query?: string) {
  return apiFetch(`/api/companies${query ? `?${query}` : ''}`);
}

export async function getCompany(id: string) {
  return apiFetch(`/api/companies/${id}`);
}

export async function getCompanyBySlug(slug: string) {
  return apiFetch(`/api/companies/slug/${slug}`);
}

export async function createCompany(body: any) {
  return apiFetch(`/api/companies`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function updateCompany(id: string, body: any) {
  return apiFetch(`/api/companies/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function deleteCompany(id: string) {
  return apiFetch(`/api/companies/${id}`, { method: 'DELETE' });
}

export async function uploadCompanyPhoto(id: string, formData: FormData) {
  return apiFetch(`/api/companies/${id}/photos`, {
    method: 'POST',
    body: formData,
  });
}

export async function deleteCompanyPhoto(id: string, photoId: string) {
  return apiFetch(`/api/companies/${id}/photos/${photoId}`, { method: 'DELETE' });
}
