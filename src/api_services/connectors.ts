import type { Connector, ReviewItem, Subscription } from '../types';
import { request } from './http';

export function listConnectors(token: string) {
  return request<{ connectors: Connector[] }>('/connectors', { token });
}

export function createConnector(token: string, email: string) {
  return request<Connector>('/connectors', {
    method: 'POST',
    token,
    body: { email },
  });
}

export function listReview(token: string, connectorId: string) {
  return request<{ items: ReviewItem[] }>(`/connectors/${connectorId}/review`, {
    token,
  });
}

export function addReviewItem(token: string, itemId: string) {
  return request<Subscription>(`/review/${itemId}/add`, {
    method: 'POST',
    token,
  });
}

export function dismissReviewItem(token: string, itemId: string) {
  return request<{ ok: true }>(`/review/${itemId}/dismiss`, {
    method: 'POST',
    token,
  });
}
