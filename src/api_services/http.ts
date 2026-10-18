import { API_BASE_URL } from '../config/api';

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
};

export async function apiReachable() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function request<T>(
  path: string,
  { method = 'GET', body, token }: RequestOptions = {},
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Can't reach the server. Start the backend and try again.");
  }

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  };
  if (!response.ok) {
    const error = new Error(data.error || 'Request failed') as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }
  return data as T;
}
