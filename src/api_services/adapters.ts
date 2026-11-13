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
  AiReply,
  ChatDraft,
  ReceiptItem,
  GmailCandidate,
  GmailScanStatus,
  GmailSelection,
  ScanCandidate,
  ScanCycle,
  ScanStatus,
  SentAlert,
  SubscriptionDetail,
  SubscriptionFormInput,
  SubscriptionRecord,
} from '../types';
import { localToday } from '../utils/dates';
import type {
  AlertDto,
  CalendarDto,
  CandidateDto,
  CategoryDto,
  ChatDraftDto,
  ChatTurnDto,
  ReceiptDto,
  ReceiptsDto,
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
  ScanJobDto,
} from './dto';

// Backend DTOs → app types, mapped once here. Screens keep using the app types.

export const toCycle = (cycle: CycleDto) => (cycle.charAt(0).toUpperCase() + cycle.slice(1)) as ScanCycle;
export const fromCycle = (cycle: ScanCycle) => cycle.toLowerCase() as CycleDto;

// Bundled logos are keyed by catalog slug; backend platforms have ObjectIds, so link the two by name.
// The backend's hosted logo (logoUrl) covers platforms without a bundled one.
const slugByName = new Map(PLATFORM_CATALOG.map(entry => [entry.name.toLowerCase(), entry.platform_id]));
// Subscription ID → platform ID, so events (which carry no platform) still find their logo.
const platformBySubscription = new Map<string, string>();

// Platform ID → hosted logo URL, read by PlatformLogo.
export const logo_urls: Record<string, string> = {};

function logoKey(name: string, platform_id: string, logo_url?: string | null) {
  const slug = slugByName.get(name.toLowerCase());
  if (slug && platform_logos[slug] && !platform_logos[platform_id]) platform_logos[platform_id] = platform_logos[slug];
  if (logo_url) logo_urls[platform_id] = logo_url;
  return platform_id;
}

function platformOf(subscription_id: string, name: string, logo_url?: string | null) {
  const platform_id = platformBySubscription.get(subscription_id) ?? logoKey(name, slugByName.get(name.toLowerCase()) ?? subscription_id);
  if (logo_url) logo_urls[platform_id] = logo_url;
  return platform_id;
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
  const platform_id = logoKey(item.name, item.platformId ?? item.id, item.logoUrl);
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

export function toDetail(detail: DetailDto, history: PriceHistoryDto | null, settings: ReminderSettingsDto | null, receipt_emails: ReceiptsDto | null = null): SubscriptionDetail {
  return {
    record: { ...toRecord(detail), price_history: history ? toPriceChanges(history) : [] },
    today: localToday(),
    receipts: { totals: detail.spending.totals, count: detail.spending.count },
    receipt_emails: { count: receipt_emails?.total ?? 0, latest: receipt_emails?.items[0] ? receiptDate(receipt_emails.items[0]) : null },
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
    platform_id: platformOf(event.subscriptionId, event.name, event.logoUrl),
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
  platform_id: logoKey(item.name, item.platformId, item.logoUrl),
  name: item.name,
  amount: item.monthly.amount,
  percent: item.percent,
  subscription_count: item.subscriptionCount,
});

const toTrial = (trial: TrialDto): HomeTrial => ({
  subscription_id: trial.subscriptionId,
  platform_id: platformOf(trial.subscriptionId, trial.name, trial.logoUrl),
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
    platform_id: platformOf(payment.subscriptionId, payment.name, payment.logoUrl),
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
    platform_id: platformOf(alert.subscriptionId, alert.name, alert.logoUrl),
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
    status: connector.status === 'connected' ? 'synced' : 'reconnect',
    lastSync: connector.lastSuccessfulSyncAt,
    nextSync: connector.nextSyncAt ?? null,
  };
}

// Onboarding shows only complete new finds; an update or already-tracked row belongs to the signed-in Gmail review.
// shortcut: finds the backend marks needsDetails are left out, until the review panel has a state for them.
export function toScanCandidate(dto: CandidateDto): ScanCandidate | null {
  // The price/cycle checks only narrow the types; needsDetails already covers them.
  if (dto.classification !== 'new' || dto.needsDetails || !dto.price || !dto.cycle) return null;
  return {
    id: dto.id,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    name: dto.name,
    price: dto.price.amount,
    currency: dto.price.currency,
    cycle: toCycle(dto.cycle),
    next_date: dto.trial?.endDate ?? dto.anchorDate,
    estimated: dto.estimated,
    trial: dto.trial ? { auto_renew: dto.trial.autoRenew } : undefined,
    revision: dto.revision,
    selected: dto.selected && !dto.imported,
  };
}

// The access-expired failure sends the person back to Connect; anything else can be retried.
export function toScanStatus(dto: ScanJobDto): ScanStatus {
  const status = dto.status === 'succeeded' ? 'completed' : dto.status === 'failed' ? 'failed' : 'running';
  return {
    job_id: dto.id,
    completed_stages: dto.stages.filter(stage => stage.status === 'done').length,
    status,
    failure: status === 'failed' ? (dto.error?.code === 'GMAIL_AUTH_EXPIRED' ? 'access' : 'network') : undefined,
    candidates: dto.candidates.map(toScanCandidate).filter((item): item is ScanCandidate => !!item),
  };
}

// A review edit: price, cycle and the renewal (or trial end) date.
export function fromScanCandidate(item: ScanCandidate) {
  return {
    revision: item.revision,
    price: { currency: item.currency, amount: item.price },
    cycle: fromCycle(item.cycle),
    ...(item.trial ? { trial: { endDate: item.next_date ?? '', autoRenew: item.trial.auto_renew } } : item.next_date ? { anchorDate: item.next_date } : {}),
  };
}

// AI chat draft → the draft card. A trial keeps its end date; the renewal date is the anchor.
export function toChatDraft(dto: ChatDraftDto): ChatDraft {
  const { fields } = dto;
  const trial = fields.trial ? { days: fields.trial.days ?? null, end_date: fields.trial.endDate ?? null, auto_renew: fields.autoRenew ?? true } : null;
  return {
    id: dto.id,
    revision: dto.revision,
    ready: dto.status === 'ready',
    name: fields.name ?? null,
    platform_id: fields.name ? logoKey(fields.name, fields.platformId ?? fields.name) : null,
    category: fields.categoryId ? categoryName(fields.categoryId) : null,
    price: fields.price?.amount ?? null,
    currency: fields.price?.currency ?? null,
    cycle: fields.cycle ? toCycle(fields.cycle) : null,
    next_date: fields.anchorDate ?? null,
    start_date: fields.startDate ?? null,
    trial,
    notes: fields.note ?? null,
  };
}

// One answered turn: the reply text and the draft it changed (the newest, when several changed).
export function toAiReply(turn: ChatTurnDto): AiReply {
  const draft = turn.drafts.filter(item => item.status !== 'added').pop();
  return { reply: turn.reply.text ?? '', draft: draft ? toChatDraft(draft) : null, usage: turn.usage };
}

// Signed-in Gmail review. Rows the review has no state for (missing price or cycle, or no safe match) are left out.
// shortcut: the backend sends no trial start or length, so a trial edit starts from an empty start date.
export function toGmailCandidate(dto: CandidateDto): GmailCandidate | null {
  if (dto.classification === 'unresolved' || dto.needsDetails || !dto.price || !dto.cycle) return null;
  const old = dto.changes?.price.from;
  return {
    id: dto.id,
    kind: dto.classification === 'tracked' ? 'duplicate' : dto.classification,
    name: dto.name,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    plan: dto.plan,
    price: dto.price.amount,
    currency: dto.price.currency,
    cycle: toCycle(dto.cycle),
    category: 'Other',
    start_date: null,
    next_date: dto.trial ? null : dto.anchorDate,
    trial: dto.trial ? { days: 0, end_date: dto.trial.endDate, auto_renew: dto.trial.autoRenew } : null,
    target_id: dto.targetSubscriptionId,
    // shortcut: minor units shown with two decimals, like every amount in the app.
    old: old ? { price: (old.amountMinor / 100).toFixed(2), next_date: null } : null,
    saved: dto.imported,
    revision: dto.revision,
    selected: dto.selected,
  };
}

export function toGmailScan(dto: ScanJobDto): GmailScanStatus {
  const status = toScanStatus(dto).status;
  return {
    status,
    stage: dto.stages.filter(stage => stage.status === 'done').length,
    candidates: dto.candidates.map(toGmailCandidate).filter((item): item is GmailCandidate => !!item),
    error: '',
  };
}

// A reviewed row before import: edited price and dates for a new plan, the date choice for an update.
export function fromGmailSelection(item: GmailCandidate, selection: GmailSelection) {
  if (item.kind === 'update') return { revision: item.revision, replaceAnchorDate: selection.replace_date };
  return {
    revision: item.revision,
    price: { currency: item.currency, amount: selection.price },
    ...(selection.trial ? { trial: { endDate: selection.trial.end_date, autoRenew: selection.trial.auto_renew } } : selection.next_date ? { anchorDate: selection.next_date } : {}),
  };
}

const RECEIPT_KINDS: Record<string, { label: string; tone: ReceiptItem['tone'] }> = {
  receipt: { label: 'Payment receipt', tone: 'paid' },
  invoice: { label: 'Invoice', tone: 'info' },
  failed_payment: { label: 'Payment failed', tone: 'alert' },
  trial_started: { label: 'Trial started', tone: 'info' },
  trial_ending: { label: 'Trial ending', tone: 'info' },
  price_change: { label: 'Price change', tone: 'info' },
  cancellation: { label: 'Cancelled', tone: 'alert' },
  access_ended: { label: 'Access ended', tone: 'alert' },
  refund: { label: 'Refund', tone: 'paid' },
};

// The billing date when the email gives one, else the day it arrived (local).
const receiptDate = (dto: ReceiptDto) => dto.billingDate ?? localToday(new Date(dto.receivedAt));

export function toReceipt(dto: ReceiptDto): ReceiptItem {
  const kind = RECEIPT_KINDS[dto.kind] ?? { label: 'Billing email', tone: 'info' as const };
  return {
    id: dto.id,
    kind_label: kind.label,
    tone: kind.tone,
    date: receiptDate(dto),
    amount: dto.amount,
    subject: dto.subject,
    from: dto.from,
    files: dto.attachments.map(file => ({ id: file.id, name: file.filename, kind: file.mimeType === 'application/pdf' ? 'pdf' : 'image' })),
  };
}
