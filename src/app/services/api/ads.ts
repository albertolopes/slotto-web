import { apiFetch } from './client';

/**
 * Fetches a list of ads from the backend API.
 * @param placement - The placement where the ads will be displayed (e.g., 'category-search', 'company-list', 'my-bookings').
 * @returns A list of ad objects.
 */
export async function getAds(placement?: string) {
  const query = placement ? `?placement=${placement}` : '';
  return apiFetch(`/api/ads${query}`);
}
