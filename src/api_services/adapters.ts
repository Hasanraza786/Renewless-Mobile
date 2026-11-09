import { platform_logos } from '../assets/icons';
import { PLATFORM_CATALOG } from '../constants/catalog';
import type {
  CalendarMonth,
  HomeEvent,
  HomePlatformSpend,
  HomeSnapshot,
  HomeTrial,
  PaymentRecord,
  PriceChange,
  Profile,
  ProfileInbox,
  ReminderPreference,
  ReminderSettings,
  ScanCycle,
  SentAlert,
  SubscriptionDetail,
  SubscriptionFormInput,
  SubscriptionRecord,
} from '../types';
import { localToday } from '../utils/dates';
import type {
  AlertDto,
  CalendarDto,
  CategoryDto,
  ConnectorDto,
  CycleDto,
  DetailDto,
  EventDto,
  HomeDto,
  PaymentDto,
  PlatformSpendDto,
  PriceHistoryDto,
  ReminderSettingsDto,
  SpendingDto,
  SummaryDto,
  TrialDto,
  UpcomingDto,
  UserDto,
} from './dto';

// Backend DTOs → app types, mapped once here. Screens keep using the app types.

export const toCycle = (cycle: CycleDto) => (cycle.charAt(0).toUpperCase() + cycle.slice(1)) as ScanCycle;
export const fromCycle = (cycle: ScanCycle) => cycle.toLowerCase() as CycleDto;

// Bundled logos are keyed by catalog slug; backend platforms have ObjectIds, so link the two by name.
// shortcut: name-matched bundled logos; use the backend logoUrl once platform logos are hosted.
const slugByName = new Map(PLATFORM_CATALOG.map(entry => [entry.name.toLowerCase(), entry.platform_id]));
// Subscription ID → platform ID, so events (which carry no platform) still find their logo.
const platformBySubscription = new Map<string, string>();

function logoKey(name: string, platform_id: string) {
  const slug = slugByName.get(name.toLowerCase());
  if (slug && platform_logos[slug] && !platform_logos[platform_id]) platform_logos[platform_id] = platform_logos[slug];
  return platform_id;
}

function platformOf(subscription_id: string, name: string) {
  return platformBySubscription.get(subscription_id) ?? logoKey(name, slugByName.get(name.toLowerCase()) ?? subscription_id);
}

// Categories: the form offers six names; the backend has its own list, linked by name.
const FORM_TO_BACKEND: Record<string, string> = { Entertainment: 'Streaming', Utilities: 'Other' };
let categories: CategoryDto[] = [];
export const setCategories = (list: CategoryDto[]) => {
  categories = list;
};
export const hasCategories = () => categories.length > 0;
const categoryName = (id: string | null) => {
  const name = categories.find(item => item.id === id)?.name ?? 'Other';
  return name === 'Streaming' ? 'Entertainment' : name;
};
const categoryId = (name: string) => {
  const wanted = (FORM_TO_BACKEND[name] ?? name).toLowerCase();
  return categories.find(item => item.name.toLowerCase() === wanted)?.id ?? null;
};

export function toProfile(user: UserDto): Profile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone ?? '',
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    provider: user.providers.includes('password') ? 'email' : user.providers[0] === 'apple' ? 'apple' : 'google',
    hasPassword: user.hasPassword,
    revision: user.revision,
  };
}

function toReminder(reminder: DetailDto['reminder']): ReminderPreference {
  if (!reminder.custom) return { mode: 'default' };
  return reminder.offsets.length ? { mode: 'days', days: reminder.offsets } : { mode: 'off' };
}

export function fromReminder(reminder: ReminderPreference) {
  if (reminder.mode === 'default') return { useDefault: true };
  return { offsets: reminder.mode === 'off' ? [] : reminder.days };
}

export function toRecord(item: SummaryDto | DetailDto): SubscriptionRecord {
  const detail = 'revision' in item ? item : null;
  const platform_id = logoKey(item.name, item.platformId ?? item.id);
  platformBySubscription.set(item.id, platform_id);
  const start = detail?.startDate ?? null;
  const connector = detail?.source.connector ?? null;
  return {
    id: item.id,
    platform_id,
    name: item.name,
    plan: item.plan,
    category: categoryName(item.categoryId),
    price: item.price.amount,
    currency: item.price.currency,
    cycle: toCycle(item.cycle),
    next_date: item.nextEvent?.type === 'renewal' ? item.nextEvent.date : null,
    estimated: item.estimated,
    auto_renew: item.trial ? item.trial.autoRenew : null,
    trial: item.trial ? { start_date: start ?? item.trial.endDate, end_date: item.trial.endDate, auto_renew: item.trial.autoRenew } : null,
    status: item.lifecycle,
    cancelled_on: item.cancelledAt,
    access_until: item.accessUntil ?? item.expiredAt,
    start_date: start,
    source: { kind: detail?.source.type === 'gmail' ? 'gmail' : 'manual', email: detail?.source.email ?? '' },
    inbox: connector ? { email: connector.email, last_sync: connector.lastSuccessfulSyncAt ?? '', disconnected: connector.status === 'disconnected' } : null,
    reminder: detail ? toReminder(detail.reminder) : { mode: 'default' },
    notes: detail?.note ?? null,
    manage_url: null,
    price_history: [],
    revision: detail?.revision ?? 0,
  };
}

function toPriceChanges(history: PriceHistoryDto): PriceChange[] {
  return history.changes.map(change => ({
    id: change.id,
    reason: change.reason === 'correction' ? 'correction' : 'price_changed',
    from_amount: change.old.price.amount,
    from_cycle: toCycle(change.old.cycle),
    to_amount: change.new.price.amount,
    to_cycle: toCycle(change.new.cycle),
    currency: change.new.price.currency,
    effective_on: change.effectiveDate ?? change.recordedAt.slice(0, 10),
    source: change.source,
  }));
}

export function toDetail(detail: DetailDto, history: PriceHistoryDto | null, settings: ReminderSettingsDto | null): SubscriptionDetail {
  return {
    record: { ...toRecord(detail), price_history: history ? toPriceChanges(history) : [] },
    today: localToday(),
    receipts: { totals: detail.spending.totals, count: detail.spending.count },
    annual_estimate: detail.spending.annualEquivalent.amount,
    related_count: detail.samePlatformCount,
    account_reminder_days: settings?.defaultOffsets ?? [3],
  };
}

// Add/Edit form → create body. Edit sends the same fields as a PATCH with the record's revision.
export function toSubscriptionBody(input: SubscriptionFormInput, platform_id: string | null) {
  return {
    name: input.name,
    platformId: platform_id,
    categoryId: categoryId(input.category),
    price: { currency: input.currency, amount: input.price },
    cycle: fromCycle(input.cycle),
    startDate: input.start_date,
    ...(input.trial
      ? { trial: { days: input.trial.days }, autoRenew: input.trial.auto_renew }
      : { trial: null, anchorDate: input.next_date }),
    note: input.notes,
    ...(input.price_change
      ? { priceChange: { reason: input.price_change.reason === 'correction' ? 'correction' : 'price_change', effectiveDate: input.price_change.effective_on } }
      : {}),
  };
}

export function toEvent(event: EventDto): HomeEvent {
  return {
    id: `${event.subscriptionId}:${event.type}:${event.date}`,
    subscription_id: event.subscriptionId,
    platform_id: platformOf(event.subscriptionId, event.name),
    name: event.name,
    plan: event.plan,
    date: event.date,
    kind: event.type,
    amount: event.amount?.amount ?? '0.00',
    currency: event.amount?.currency ?? '',
    cycle: toCycle(event.cycle),
    expected_charge: event.expectedCharge,
    estimated: event.estimated,
  };
}

const toSpend = (item: PlatformSpendDto): HomePlatformSpend => ({
  platform_id: logoKey(item.name, item.platformId),
  name: item.name,
  amount: item.monthly.amount,
  percent: item.percent,
  subscription_count: item.subscriptionCount,
});

const toTrial = (trial: TrialDto): HomeTrial => ({
  subscription_id: trial.subscriptionId,
  platform_id: platformOf(trial.subscriptionId, trial.name),
  name: trial.name,
  end_date: trial.endDate,
  then_amount: trial.after.amount,
  currency: trial.after.currency,
  cycle: toCycle(trial.cycle),
});

export function toCalendarMonth(calendar: CalendarDto): CalendarMonth {
  return { month: calendar.month, today: localToday(), events: calendar.events.map(toEvent), expected: calendar.expected };
}

// Home combines /home, /upcoming, this month's /calendar and /spending into the one snapshot the screens read.
export function toHome(home: HomeDto, upcoming: UpcomingDto, calendar: CalendarDto, spending: SpendingDto): HomeSnapshot {
  const events = calendar.events.map(toEvent);
  const currencies = [...new Set(home.forecast.flatMap(month => month.totals.map(total => total.currency)))];
  return {
    as_of: home.asOf,
    today: home.today,
    has_subscriptions: home.hasSubscriptions,
    nearest_events: home.nearest?.events.map(toEvent) ?? [],
    upcoming_count: upcoming.events.length,
    upcoming: upcoming.events.map(toEvent),
    upcoming_until: upcoming.through,
    month: {
      month: home.month.label,
      paid: home.month.paid,
      receipt_count: home.month.paidCount,
      upcoming: home.month.upcoming,
      charge_count: events.filter(event => event.expected_charge && event.date >= home.today).length,
      expected: calendar.expected,
      events,
    },
    spending: spending.byCurrency.map(group => {
      const top = home.topSpending.find(item => item.currency === group.currency);
      const all = group.platforms.map(toSpend);
      const rest = all.slice(3);
      return {
        currency: group.currency,
        total: group.total.amount,
        platforms: (top?.items ?? group.platforms.slice(0, 3)).map(toSpend),
        all_platforms: all,
        others: top?.others ? { amount: top.others.monthly.amount, percent: rest.reduce((sum, item) => sum + item.percent, 0), platform_count: top.others.count } : null,
      };
    }),
    trials: home.trials.map(toTrial),
    forecast: currencies.map(currency => ({
      currency,
      months: home.forecast.map(month => ({ month: month.month, amount: month.totals.find(total => total.currency === currency)?.amount ?? '0.00' })),
    })),
  };
}

export function toPayment(payment: PaymentDto): PaymentRecord {
  return {
    id: payment.id,
    subscription_id: payment.subscriptionId,
    amount: payment.amount.amount,
    currency: payment.amount.currency,
    paid_on: payment.paidDate,
    name: payment.name,
    platform_id: platformOf(payment.subscriptionId, payment.name),
    billing_date: payment.billingDate,
    source: payment.source === 'gmail' ? 'gmail' : payment.source === 'manual' ? 'manual' : 'reviewed',
    inbox_email: payment.inboxEmail,
    subscription_available: payment.subscriptionAvailable,
  };
}

export function toAlert(alert: AlertDto): SentAlert {
  return {
    id: alert.id,
    subscription_id: alert.subscriptionId,
    platform_id: platformOf(alert.subscriptionId, alert.name),
    name: alert.name,
    kind: alert.eventType,
    event_date: alert.eventDate,
    amount: alert.amount?.amount ?? '0.00',
    currency: alert.amount?.currency ?? '',
    sent_at: alert.sentAt ?? '',
    subscription_available: alert.subscriptionAvailable,
  };
}

export function toReminderSettings(settings: ReminderSettingsDto): ReminderSettings {
  return {
    push_enabled: settings.pushEnabled,
    renewals: settings.renewalsEnabled,
    trials: settings.trialsEnabled,
    days: settings.defaultOffsets,
    time: settings.sendTime,
    revision: settings.revision,
  };
}

export function fromReminderSettings(settings: ReminderSettings) {
  return {
    revision: settings.revision,
    pushEnabled: settings.push_enabled,
    renewalsEnabled: settings.renewals,
    trialsEnabled: settings.trials,
    defaultOffsets: settings.days,
    customOffset: null,
    sendTime: settings.time,
  };
}

export function toInbox(connector: ConnectorDto): ProfileInbox {
  return {
    id: connector.id,
    email: connector.email,
    status: connector.status === 'active' ? 'synced' : connector.status === 'paused' ? 'paused' : 'reconnect',
    lastSync: connector.lastSuccessfulSyncAt,
  };
}
