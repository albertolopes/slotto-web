import { apiFetch } from './client';

export async function listCategories() {
  return apiFetch('/api/categories');
}
