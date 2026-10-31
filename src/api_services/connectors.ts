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

export function listReview(token: string, connector_id: string) {
  return request<{ items: ReviewItem[] }>(`/connectors/${connector_id}/review`, {
    token,
  });
}

export function addReviewItem(token: string, item_id: string) {
  return request<Subscription>(`/review/${item_id}/add`, {
    method: 'POST',
    token,
  });
}

export function dismissReviewItem(token: string, item_id: string) {
  return request<{ ok: true }>(`/review/${item_id}/dismiss`, {
    method: 'POST',
    token,
  });
}
