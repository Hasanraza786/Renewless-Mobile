import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { ReminderApply, ReminderSettings, SentAlert, SubscriptionRecord } from '../types';
import { localToday } from '../utils/dates';
import { addDays } from '../utils/scan';
import { request } from './http';
import { accountReminderSettings, allRecords, findRemoved, setAccountReminderSettings, updateRecord } from './subscription-store';

const mockDelay = () => new Promise<void>(resolve => setTimeout(resolve, 350));

// Only server-confirmed sent reminders, newest first.
export async function listAlerts(token: string): Promise<SentAlert[]> {
  if (!USE_MOCK_API) return request<SentAlert[]>('/alerts', { token });
  await mockDelay();
  if (MOCK_DATA.alerts_scenario === 'empty') return [];
  const today = localToday();
  const current = new Map(allRecords().map(item => [item.id, item]));
  return MOCK_DATA.sent_alerts.flatMap(item => {
    const record = current.get(item.subscription_id) ?? findRemoved(item.subscription_id);
    if (!record) return [];
    const [hours, minutes] = item.time.split(':').map(Number);
    const sent = new Date(`${addDays(today, -item.sent_days_ago)}T00:00:00`);
    sent.setHours(hours, minutes);
    return [{ id: item.id, subscription_id: record.id, platform_id: record.platform_id, name: record.name, kind: item.kind, event_date: addDays(today, item.event_in_days), amount: record.price, currency: record.currency, sent_at: sent.toISOString(), subscription_available: current.has(record.id) }];
  });
}

export async function getReminderSettings(token: string): Promise<ReminderSettings> {
  if (!USE_MOCK_API) return request<ReminderSettings>('/reminders/settings', { token });
  await mockDelay();
  return accountReminderSettings();
}

// Eligible for a bulk default change: active, and not a trial that ended without renewing.
const eligible = (record: SubscriptionRecord, today: string) => record.status === 'active' && !(record.trial && record.trial.end_date < today && !record.trial.auto_renew);

// How many subscriptions an "Existing subscriptions too" save would change; the server recounts when saving.
export async function previewReminderApply(token: string, keep_custom: boolean): Promise<{ count: number }> {
  if (!USE_MOCK_API) return request<{ count: number }>(`/reminders/apply-preview?keepCustom=${keep_custom}`, { token });
  await new Promise<void>(resolve => setTimeout(resolve, 150));
  const today = localToday();
  return { count: allRecords().filter(record => eligible(record, today) && (!keep_custom || record.reminder.mode === 'default')).length };
}

// Saves the account settings; with existing, also the chosen subscriptions' timing, as one operation.
export async function saveReminderSettings(token: string, settings: ReminderSettings, apply: ReminderApply): Promise<ReminderSettings> {
  if (!USE_MOCK_API) return request<ReminderSettings>('/reminders/settings', { method: 'PUT', token, body: { ...settings, apply } });
  await mockDelay();
  const today = localToday();
  const previous = accountReminderSettings().days;
  for (const record of allRecords().filter(item => eligible(item, today))) {
    // New subscriptions only: records following the old default keep that timing.
    if (!apply.existing && record.reminder.mode === 'default') updateRecord(record.id, item => ({ ...item, reminder: previous.length ? { mode: 'days', days: [...previous] } : { mode: 'off' } }));
    // Existing too without keeping custom: every eligible record follows the new default.
    if (apply.existing && !apply.keep_custom) updateRecord(record.id, item => ({ ...item, reminder: { mode: 'default' } }));
  }
  return setAccountReminderSettings(settings);
}
