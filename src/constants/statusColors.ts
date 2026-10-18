import type { SubscriptionStatus } from '../types';

export const statusColors = {
  upcoming: { background: '#CCFBF1', text: '#0F766E' },
  inProgress: { background: '#E2E8F0', text: '#0F172A' },
  expired: { background: '#FEE2E2', text: '#B91C1C' },
};

export function colorsForStatus(status: SubscriptionStatus) {
  if (status === 'in_progress') return statusColors.inProgress;
  if (status === 'expired') return statusColors.expired;
  return statusColors.upcoming;
}

export function statusLabel(status: SubscriptionStatus) {
  if (status === 'in_progress') return 'In progress';
  if (status === 'expired') return 'Expired';
  return 'Upcoming';
}
