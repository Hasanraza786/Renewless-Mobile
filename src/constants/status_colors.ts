import { colors } from './theme';
import type { SubscriptionStatus } from '../types';

export const status_colors = {
  active: { background: colors.status_active_bg, text: colors.accent },
  trial: { background: colors.status_trial_bg, text: colors.trial },
  trial_ended: { background: colors.status_muted_bg, text: colors.text_secondary },
  renewing_soon: { background: colors.status_soon_bg, text: colors.renewing_soon },
  due_today: { background: colors.status_due_bg, text: colors.due_today },
  needs_date: { background: colors.status_trial_bg, text: colors.trial },
  cancelled: { background: colors.status_muted_bg, text: colors.text_secondary },
  expired: { background: colors.status_expired_bg, text: colors.expired },
  upcoming: { background: colors.status_muted_bg, text: colors.text_secondary },
  in_progress: { background: colors.status_active_bg, text: colors.accent },
};

export function colorsForStatus(status: SubscriptionStatus) {
  if (status === 'in_progress') return status_colors.in_progress;
  if (status === 'expired') return status_colors.expired;
  return status_colors.upcoming;
}

export function statusLabel(status: SubscriptionStatus) {
  if (status === 'in_progress') return 'In progress';
  if (status === 'expired') return 'Expired';
  return 'Upcoming';
}
