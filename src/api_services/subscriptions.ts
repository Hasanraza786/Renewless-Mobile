import type { Cycle, DashboardData, RenewalNotice, Subscription } from '../types';
import { request } from './http';

export type SubscriptionInput = {
  name: string;
  price: number;
  currency: string;
  cycle: Cycle;
  startDate: string;
  nextRenewal: string;
  note?: string;
};

export function getDashboard(token: string) {
  return request<DashboardData>('/dashboard', { token });
}

export function listSubscriptions(token: string) {
  return request<{ subscriptions: Subscription[] }>('/subscriptions', { token });
}

export function getSubscription(token: string, id: string) {
  return request<Subscription>(`/subscriptions/${id}`, { token });
}

export function createSubscription(token: string, input: SubscriptionInput) {
  return request<Subscription>('/subscriptions', {
    method: 'POST',
    token,
    body: input,
  });
}

export function updateSubscription(
  token: string,
  id: string,
  input: SubscriptionInput,
) {
  return request<Subscription>(`/subscriptions/${id}`, {
    method: 'PATCH',
    token,
    body: input,
  });
}

export function deleteSubscription(token: string, id: string) {
  return request<{ ok: true }>(`/subscriptions/${id}`, {
    method: 'DELETE',
    token,
  });
}

export function listNotifications(token: string) {
  return request<{ notifications: RenewalNotice[] }>('/notifications', { token });
}
