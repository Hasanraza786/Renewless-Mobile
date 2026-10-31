import type { AuthResponse, Gender, Profile } from '../types';
import { request } from './http';

export function signup(input: {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth?: string;
  gender?: Gender | null;
}) {
  return request<AuthResponse>('/auth/signup', { method: 'POST', body: input });
}

export function login(email: string, password: string) {
  return request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function forgotPassword(email: string) {
  return request<{ ok: true }>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
  });
}

export function verifyOtp(email: string, code: string) {
  return request<{ ok: true }>('/auth/verify-otp', {
    method: 'POST',
    body: { email, code },
  });
}

export function resetPassword(email: string, password: string) {
  return request<{ ok: true }>('/auth/reset-password', {
    method: 'POST',
    body: { email, password },
  });
}

export function changePassword(
  token: string,
  current_password: string,
  password: string,
) {
  return request<{ ok: true }>('/auth/change-password', {
    method: 'POST',
    token,
    body: { currentPassword: current_password, password },
  });
}

export function updateProfile(
  token: string,
  input: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: Gender | null;
  },
) {
  return request<AuthResponse>('/auth/profile', {
    method: 'PATCH',
    token,
    body: input,
  });
}

export function logout(token: string) {
  return request<{ ok: true }>('/auth/logout', { method: 'POST', token });
}

export type { Profile };
