import { COLORS } from './theme';
import type { SubscriptionStatus } from '../types';

export const status_colors = {
  active: { background: COLORS.status_active_bg, text: COLORS.primary },
  trial: { background: COLORS.status_trial_bg, text: COLORS.trial },
  trial_ended: { background: COLORS.status_muted_bg, text: COLORS.text_secondary },
  renewing_soon: { background: COLORS.status_soon_bg, text: COLORS.renewing_soon },
  due_today: { background: COLORS.status_due_bg, text: COLORS.due_today },
  needs_date: { background: COLORS.status_trial_bg, text: COLORS.trial },
  cancelled: { background: COLORS.status_muted_bg, text: COLORS.text_secondary },
  expired: { background: COLORS.status_expired_bg, text: COLORS.expired },
  upcoming: { background: COLORS.status_muted_bg, text: COLORS.text_secondary },
  in_progress: { background: COLORS.status_active_bg, text: COLORS.primary },
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
