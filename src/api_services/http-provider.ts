import axios, { type AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../config/api';
import { sessionToken } from '../utils/session-token';

// Backend error envelope: { error: { code, message, fieldErrors?, retryable, requestId, ... } }.
export class ApiError extends Error {
  status: number;
  code: string;
  field_errors: Record<string, string>;
  extra: Record<string, unknown>;

  constructor(status: number, code: string, message: string, field_errors: Record<string, string> = {}, extra: Record<string, unknown> = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.field_errors = field_errors;
    this.extra = extra;
  }
}

const client = axios.create({ baseURL: `${API_BASE_URL}/v1`, timeout: 20000, headers: { Accept: 'application/json' } });

client.interceptors.request.use(config => {
  const token = sessionToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  response => response,
  error => {
    if (!axios.isAxiosError(error) || !error.response) {
      return Promise.reject(new ApiError(0, 'NETWORK', 'Can’t reach the server. Check your connection and try again.'));
    }
    const body = (error.response.data as { error?: { code?: string; message?: string; fieldErrors?: Record<string, string> } & Record<string, unknown> })?.error;
    const { code, message, fieldErrors, ...extra } = body ?? {};
    return Promise.reject(new ApiError(error.response.status, code ?? 'INTERNAL', message ?? 'Something went wrong. Please try again.', fieldErrors ?? {}, extra));
  },
);

// A fresh key per create/import request, so a retry of the same tap is not saved twice.
const idempotencyKey = () => `rl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

async function request<T>(config: AxiosRequestConfig & { idempotent?: boolean }): Promise<T> {
  const { idempotent, ...rest } = config;
  const response = await client.request<T>({ ...rest, headers: { ...rest.headers, ...(idempotent ? { 'Idempotency-Key': idempotencyKey() } : {}) } });
  return response.data;
}

// AI turns read files with Gemini and can take longer than a plain request.
const LONG_TIMEOUT = 90000;
export const postLong = <T>(url: string, data: object) => request<T>({ method: 'POST', url, data, timeout: LONG_TIMEOUT });
// Raw file bytes; the server reads the type from the bytes.
export const upload = <T>(url: string, file: Blob) => request<T>({ method: 'POST', url, data: file, timeout: LONG_TIMEOUT, headers: { 'Content-Type': 'application/octet-stream' } });

export const get = <T>(url: string, params?: object) => request<T>({ method: 'GET', url, params });
export const post = <T>(url: string, data?: object, idempotent = false) => request<T>({ method: 'POST', url, data: data ?? {}, idempotent });
export const put = <T>(url: string, data?: object) => request<T>({ method: 'PUT', url, data: data ?? {} });
export const patch = <T>(url: string, data?: object) => request<T>({ method: 'PATCH', url, data: data ?? {} });
export const del = <T>(url: string, data?: object) => request<T>({ method: 'DELETE', url, data: data ?? {} });
