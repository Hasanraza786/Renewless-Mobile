import { USE_MOCK_API } from '../config/api';
import type { ProfileOverview } from '../types';
import { request } from './http';
import { mockInboxes } from './inbox';
import { allPayments } from './subscription-store';

// Connected Gmail inboxes and all-time confirmed payment totals (one per currency, never converted).
export async function getProfileOverview(token: string): Promise<ProfileOverview> {
  if (!USE_MOCK_API) return request<ProfileOverview>('/profile/overview', { token });
  await new Promise<void>(resolve => setTimeout(resolve, 300));
  const cents = new Map<string, number>();
  for (const receipt of allPayments()) cents.set(receipt.currency, (cents.get(receipt.currency) ?? 0) + Math.round(Number(receipt.amount) * 100));
  return {
    inboxes: mockInboxes(),
    payment_totals: [...cents].map(([currency, total]) => ({ currency, amount: (total / 100).toFixed(2) })),
  };
}
