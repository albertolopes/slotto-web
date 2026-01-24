import { apiFetch, jsonHeaders } from './client';

export async function listCompanyReviews(companyId: string, query?: string) {
  return apiFetch(`/api/companies/${companyId}/reviews${query ? `?${query}` : ''}`);
}

export async function getCompanyReviewSummary(companyId: string) {
  return apiFetch(`/api/companies/${companyId}/reviews/summary`);
}

export async function createReview(companyId: string, body: any) {
  return apiFetch(`/api/companies/${companyId}/reviews`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function getReview(reviewId: string) {
  return apiFetch(`/api/reviews/${reviewId}`);
}

// Optional: if users can update/delete their own reviews
export async function updateReview(reviewId: string, body: any) {
  return apiFetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

export async function deleteReview(reviewId: string) {
  return apiFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
}
