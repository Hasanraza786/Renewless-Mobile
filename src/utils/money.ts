import type { Subscription } from '../types';

export function formatMoney(amount: number | string, currency?: string) {
  const value = Number(amount) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
    }).format(value);
  } catch {
    return `${currency || 'USD'} ${value.toFixed(2)}`;
  }
}

export function monthTotalLine(items: Subscription[], today: string) {
  const month = today.slice(0, 7);
  const totals = new Map<string, number>();
  for (const item of items) {
    if (!String(item.nextRenewal || '').startsWith(month)) continue;
    const currency = item.currency || 'USD';
    totals.set(currency, (totals.get(currency) || 0) + Number(item.price || 0));
  }
  if (totals.size === 0) return 'This month · $0.00';
  const parts = [...totals.entries()].map(([currency, amount]) =>
    formatMoney(amount, currency),
  );
  return `This month · ${parts.join(' + ')}`;
}
