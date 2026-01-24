// Minimal API client for frontend services
export const API_BASE = 'http://localhost:8080';

export type ApiError = any;

function parseJsonSafe(response: any) {
  return response.text().then((text: string) => {
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text;
    }
  });
}

export function apiFetch(path: string, opts: any = {}): Promise<any> {
  const url = (path && path.indexOf('http') === 0) ? path : `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...((opts.headers as Record<string, string>) || {}),
  };

  return fetch(url, { ...opts, headers }).then((response) =>
    parseJsonSafe(response).then((data) => {
      if (!response.ok) {
        const err: ApiError = {
          status: response.status,
          message: response.statusText || 'API error',
          body: data,
        };
        throw err;
      }
      return data;
    })
  );
}

export function jsonHeaders() {
  return { 'Content-Type': 'application/json' };
}
