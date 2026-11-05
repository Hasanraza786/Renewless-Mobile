import { USE_MOCK_API } from '../config/api';
import type { PaymentRecord } from '../types';
import { localToday } from '../utils/dates';
import { request } from './http';
import { allPayments } from './subscription-store';

// Confirmed payments for the account, or for one owned subscription when subscription_id is given.
// shortcut: returns the whole collection and the screen derives period totals and monthly aggregates; switch to the paged year/month query when the backend ships it.
export async function listPayments(token: string, subscription_id?: string): Promise<{ payments: PaymentRecord[]; today: string }> {
  if (!USE_MOCK_API) {
    return request<{ payments: PaymentRecord[]; today: string }>(`/payments${subscription_id ? `?subscriptionId=${encodeURIComponent(subscription_id)}` : ''}`, { token });
  }
  await new Promise<void>(resolve => setTimeout(resolve, 350));
  const payments = allPayments().filter(item => !subscription_id || item.subscription_id === subscription_id);
  return { payments, today: localToday() };
}
