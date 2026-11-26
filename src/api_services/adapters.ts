import { formatAmount, minorDigits } from '../utils/money';
import { platform_logos } from '../assets/icons';
import { bundledLogoKey } from '../assets/icons/platform_logos';
import type {
  AppConfig,
  CalendarMonth,
  DatedAmount,
  HomeEvent,
  HomePlatformSpend,
  HomeSnapshot,
  HomeTrial,
  PaymentRecord,
  PriceChange,
  Profile,
  ProfileInbox,
  ProfileOverview,
  ReminderPreference,
  ReminderSettings,
  AiReply,
  ChatDraft,
  ReceiptItem,
  PlatformSuggestion,
  GmailCandidate,
  GmailScanStatus,
  GmailSelection,
  ScanAttention,
  ScanCandidate,
  ScanCycle,
  ScanMeter,
  ScanStatus,
  SentAlert,
  SupportMessage,
  SupportTopic,
  SubscriptionDetail,
  SubscriptionFormInput,
  SubscriptionRecord,
} from '../types';
import { localToday } from '../utils/dates';
import type {
  AppConfigDto,
  AlertDto,
  SupportMessageDto,
  CalendarDto,
  CandidateDto,
  CategoryDto,
  ChatDraftDto,
  ChatTurnDto,
  ReceiptDto,
  ReceiptsDto,
  ConnectorDto,
  ConnectorsDto,
  CycleDto,
  DatedMoneyDto,
  DetailDto,
  EventDto,
  HomeDto,
  PaymentDto,
  PlatformDto,
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

// Values a newer backend may add are left out instead of shown wrong (a review row, an event, an alert).
const CYCLES = new Set<string>(['weekly', 'monthly', 'quarterly', 'yearly']);
const EVENT_TYPES = new Set<string>(['renewal', 'trial_end', 'usage_bill']);
const REVIEW_KINDS: Record<string, GmailCandidate['kind']> = { new: 'new', update: 'update', tracked: 'duplicate' };
export const knownEventType = (type: string) => EVENT_TYPES.has(type);

// Bundled logos are keyed by name; backend platforms have ObjectIds, so link the two by name.
// The backend's hosted logo (logoUrl) covers platforms without a bundled one.
// Subscription ID → platform ID, so events (which carry no platform) still find their logo.
const platformBySubscription = new Map<string, string>();

// Platform ID → hosted logo URL, read by PlatformLogo.
export const logo_urls: Record<string, string> = {};

function logoKey(name: string, platform_id: string, logo_url?: string | null) {
  const bundled = platform_logos[bundledLogoKey(name)];
  if (bundled && !platform_logos[platform_id]) platform_logos[platform_id] = bundled;
  if (logo_url) logo_urls[platform_id] = logo_url;
  return platform_id;
}

function platformOf(subscription_id: string, name: string, logo_url?: string | null) {
  const platform_id = platformBySubscription.get(subscription_id) ?? logoKey(name, subscription_id);
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
// An Add form suggestion from the backend catalog: its platform, name and category (never a price or date).
export function toPlatformSuggestion(dto: PlatformDto): PlatformSuggestion {
  return { name: dto.name, category: categoryName(dto.categoryId), platform_id: logoKey(dto.name, dto.id, dto.logoUrl) };
}
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
    provider: user.providers.includes('password') ? 'email' : user.providers[0] === 'apple' || user.providers[0] === 'microsoft' ? user.providers[0] : 'google',
    hasPassword: user.hasPassword,
    productUpdates: user.productUpdates ?? false,
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

// Records and payments from a connected inbox carry its provider, 'gmail' or 'outlook' (older Outlook records say
// 'gmail' until the backend's one-off migration runs).
const inboxSource = (source: string | undefined) => source === 'gmail' || source === 'outlook';

const toDated = (item: DatedMoneyDto): DatedAmount => ({ date: item.date, amount: item.amount.amount, currency: item.amount.currency });

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
    billing: item.billing === 'usage' ? 'usage' : 'fixed',
    // A usage record has no price; Detail knows its currency from the last bills.
    price: item.price?.amount ?? '',
    currency: item.price?.currency ?? detail?.lastCharges?.at(-1)?.amount.currency ?? '',
    cycle: toCycle(item.cycle),
    next_date: item.nextEvent && item.nextEvent.type !== 'trial_end' ? item.nextEvent.date : null,
    estimated: item.estimated,
    auto_renew: item.trial ? item.trial.autoRenew : null,
    trial: item.trial ? { start_date: start ?? item.trial.endDate, end_date: item.trial.endDate, auto_renew: item.trial.autoRenew } : null,
    status: item.lifecycle,
    cancelled_on: item.cancelledAt,
    access_until: item.accessUntil ?? item.expiredAt,
    start_date: start,
    source: { kind: inboxSource(detail?.source.type) ? 'gmail' : detail?.source.type === 'ai' ? 'ai' : 'manual', email: detail?.source.email ?? '', provider: detail?.source.connector?.provider ?? (detail?.source.type === 'outlook' ? 'outlook' : 'gmail') },
    inbox: connector ? { email: connector.email, last_sync: connector.lastSuccessfulSyncAt ?? '', disconnected: connector.status === 'disconnected' } : null,
    reminder: detail ? toReminder(detail.reminder) : { mode: 'default' },
    notes: detail?.note ?? null,
    // Only a web link opens from Detail.
    manage_url: detail?.manageUrl?.startsWith('https://') ? detail.manageUrl : null,
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
    source: inboxSource(change.source) ? 'gmail' : 'user',
  }));
}

export function toDetail(detail: DetailDto, history: PriceHistoryDto | null, settings: ReminderSettingsDto | null, receipt_emails: ReceiptsDto | null = null): SubscriptionDetail {
  return {
    record: { ...toRecord(detail), price_history: history ? toPriceChanges(history) : [] },
    today: localToday(),
    receipts: { totals: detail.spending.totals, count: detail.spending.count },
    receipt_emails: { count: receipt_emails?.total ?? 0, latest: receipt_emails?.items[0] ? receiptDate(receipt_emails.items[0]) : null },
    annual_estimate: detail.spending.annualEquivalent?.amount ?? null,
    last_charges: (detail.lastCharges ?? []).map(toDated),
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

const toEvents = (events: EventDto[]) => events.filter(event => knownEventType(event.type)).map(toEvent);

export function toCalendarMonth(calendar: CalendarDto): CalendarMonth {
  return { month: calendar.month, today: localToday(), events: toEvents(calendar.events), expected: calendar.expected };
}

// Home combines /home, /upcoming, this month's /calendar and /spending into the one snapshot the screens read.
export function toHome(home: HomeDto, upcoming: UpcomingDto, calendar: CalendarDto, spending: SpendingDto): HomeSnapshot {
  const events = toEvents(calendar.events);
  const upcoming_events = toEvents(upcoming.events);
  const currencies = [...new Set(home.forecast.flatMap(month => month.totals.map(total => total.currency)))];
  return {
    as_of: home.asOf,
    today: home.today,
    has_subscriptions: home.hasSubscriptions,
    // Next renewal shows fixed renewals and trials; a usage bill has its own USAGE BILL block below it.
    nearest_events: toEvents(home.nearest?.events ?? []).filter(event => event.kind !== 'usage_bill'),
    upcoming_count: upcoming_events.length,
    upcoming: upcoming_events,
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
    background_scan: home.backgroundScan
      ? { status: home.backgroundScan.status, new_count: home.backgroundScan.newCount, connector_id: home.backgroundScan.connectorId, job_id: home.backgroundScan.jobId }
      : null,
    by_currency: (home.byCurrency ?? []).map(row => ({ currency: row.currency, subscription_count: row.subscriptionCount, paid_count: row.paidCount })),
  };
}

export function toPayment(payment: PaymentDto): PaymentRecord {
  return {
    id: payment.id,
    subscription_id: payment.subscriptionId,
    amount: payment.amount.amount,
    currency: payment.amount.currency,
    refunded: payment.refunded?.amount ?? null,
    paid_on: payment.paidDate,
    name: payment.name,
    platform_id: platformOf(payment.subscriptionId, payment.name, payment.logoUrl),
    billing_date: payment.billingDate,
    source: payment.source === 'gmail' || payment.source === 'outlook' ? payment.source : payment.source === 'manual' ? 'manual' : 'reviewed',
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
    timezone: settings.timezone,
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
    provider: connector.provider ?? 'gmail',
    status: connector.status === 'connected' ? 'synced' : 'reconnect',
    lastSync: connector.lastSuccessfulSyncAt,
    nextSync: connector.nextSyncAt ?? null,
  };
}

// Profile's Connected inboxes card. An older backend sends no slot fields: count the listed inboxes against 2.
export function toInboxSlots(dto: ConnectorsDto): ProfileOverview['inbox_slots'] {
  const limit = dto.limit ?? 2;
  return { limit, remaining: dto.remaining ?? Math.max(0, limit - dto.connectors.length), used_before: dto.usedBefore ?? [] };
}

// Onboarding shows only complete new finds; an update or already-tracked row belongs to the signed-in Gmail review.
// shortcut: finds the backend marks needsDetails are left out, until the review panel has a state for them.
export function toScanCandidate(dto: CandidateDto): ScanCandidate | null {
  if (dto.paymentFailing) return failingRow(dto);
  if (dto.billing === 'usage') return usageCandidate(dto);
  // The price/cycle checks only narrow the types; needsDetails already covers them.
  if (dto.classification !== 'new' || dto.needsDetails || !dto.price || !dto.cycle || !CYCLES.has(dto.cycle)) return null;
  return {
    id: dto.id,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    name: dto.name,
    plan: dto.plan,
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

const jobStatus = (status: ScanJobDto['status']) => (status === 'succeeded' ? 'completed' : status === 'failed' ? 'failed' : 'running');

// Progress, live counts and the background (deep) read of a Gmail first scan.
function toScanMeter(dto: ScanJobDto): ScanMeter {
  return {
    job_id: dto.id,
    phase: dto.phase ?? null,
    progress: dto.progress ?? { total: 0, done: 0 },
    live: dto.live ?? { found: 0, read: 0, checked: 0, candidates: 0 },
    messages: dto.counts.messages,
    deep: dto.deep ? { job_id: dto.deep.jobId, status: jobStatus(dto.deep.status), progress: dto.deep.progress } : null,
  };
}

// PAYMENTS FAILING: a new plan with only failed payments, never preselected. Without a price or cycle from the server
// it is shown but can't be added (shortcut: the backend sends no price for these yet; ask for the failed amount).
function failingRow(dto: CandidateDto): ScanCandidate | null {
  if (dto.classification !== 'new' || dto.imported) return null;
  const cycle = dto.cycle && CYCLES.has(dto.cycle) ? dto.cycle : null;
  return {
    id: dto.id,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    name: dto.name,
    plan: dto.plan,
    failing: { since: dto.failedSince ?? null, count: dto.failedCount ?? 0, incomplete: !dto.price || !cycle },
    price: dto.price?.amount ?? '',
    currency: dto.price?.currency ?? '',
    cycle: cycle ? toCycle(cycle) : 'Monthly',
    next_date: dto.anchorDate,
    estimated: dto.estimated,
    revision: dto.revision,
    selected: false,
  };
}

// Onboarding's USAGE BILLS (approved 25 Nov 2026): a new usage bill with its last bills; its currency is the last bill's.
function usageCandidate(dto: CandidateDto): ScanCandidate | null {
  if (dto.classification !== 'new' || dto.imported) return null;
  const last_charges = (dto.lastCharges ?? []).map(toDated);
  return {
    id: dto.id,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    name: dto.name,
    plan: dto.plan,
    usage: { last_charges },
    price: '',
    currency: last_charges[last_charges.length - 1]?.currency ?? '',
    cycle: dto.cycle && CYCLES.has(dto.cycle) ? toCycle(dto.cycle) : 'Monthly',
    next_date: dto.anchorDate,
    estimated: dto.estimated,
    revision: dto.revision,
    selected: false,
  };
}

// The access-expired failure sends the person back to Connect; anything else can be retried.
export function toScanStatus(dto: ScanJobDto): ScanStatus {
  const status = jobStatus(dto.status);
  return {
    ...toScanMeter(dto),
    completed_stages: dto.stages.filter(stage => stage.status === 'done').length,
    status,
    failure: status === 'failed' ? (isAuthExpired(dto.error?.code) ? 'access' : 'network') : undefined,
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
// A trial keeps the start and length the backend found; without them its edit starts from an empty start date.
export function toGmailCandidate(dto: CandidateDto): GmailCandidate | null {
  if (dto.paymentFailing) {
    const row = failingRow(dto);
    return row
      ? { ...row, kind: 'new', plan: dto.plan, category: 'Other', start_date: null, next_date: dto.anchorDate, trial: null, target_id: null, old: null, saved: dto.imported }
      : null;
  }
  const kind = REVIEW_KINDS[dto.classification];
  if (!kind || dto.needsDetails || !dto.price || !dto.cycle || !CYCLES.has(dto.cycle)) return null;
  const old = dto.changes?.price.from;
  return {
    id: dto.id,
    kind,
    name: dto.name,
    platform_id: logoKey(dto.name, dto.platformId ?? dto.id, dto.logoUrl),
    plan: dto.plan,
    price: dto.price.amount,
    currency: dto.price.currency,
    cycle: toCycle(dto.cycle),
    category: 'Other',
    start_date: dto.trial?.startDate ?? null,
    next_date: dto.trial ? null : dto.anchorDate,
    trial: dto.trial ? { days: dto.trial.days ?? 0, end_date: dto.trial.endDate, auto_renew: dto.trial.autoRenew } : null,
    target_id: dto.targetSubscriptionId,
    old: old ? { price: formatAmount(old.currency, old.amountMinor / 10 ** minorDigits(old.currency)), next_date: null } : null,
    saved: dto.imported,
    revision: dto.revision,
    selected: dto.selected,
  };
}

// Rows the plain review leaves out: usage bills (no price) and payments that fit two plans.
function toAttention(dto: ScanJobDto): ScanAttention {
  const usage = dto.candidates.filter(c => c.billing === 'usage' && !c.paymentFailing && c.classification === 'new');
  return {
    usage: usage.map(c => ({
      id: c.id,
      platform_id: logoKey(c.name, c.platformId ?? c.id, c.logoUrl),
      name: c.name,
      plan: c.plan,
      cycle: c.cycle && CYCLES.has(c.cycle) ? toCycle(c.cycle) : null,
      next_date: c.anchorDate,
      last_charges: (c.lastCharges ?? []).map(toDated),
      revision: c.revision,
      selected: c.selected,
      saved: c.imported,
    })),
    // Open payments first, then the ones already matched (their pick can still be changed).
    needs_match: [...(dto.needsMatch ?? []).map(m => ({ ...m, resolved: null })), ...(dto.matched ?? [])].map(m => ({
      receipt_id: m.receiptId,
      revision: m.revision,
      platform_id: logoKey(m.service.name, m.service.platformId ?? m.receiptId, m.service.logoUrl),
      name: m.service.name,
      amount: m.amount.amount,
      currency: m.amount.currency,
      paid_date: m.paidDate,
      // Options are tracked records; a usage one has no price.
      options: m.options
        .filter(o => CYCLES.has(o.cycle))
        .map(o => ({ subscription_id: o.subscriptionId, name: o.name, plan: o.plan, price: o.price?.amount ?? '', currency: o.price?.currency ?? '', cycle: toCycle(o.cycle), next_date: o.nextRenewal })),
      resolved: m.resolved ?? null,
    })),
  };
}

export function toGmailScan(dto: ScanJobDto): GmailScanStatus {
  return {
    ...toScanMeter(dto),
    status: jobStatus(dto.status),
    stage: dto.stages.filter(stage => stage.status === 'done').length,
    candidates: dto.candidates.map(toGmailCandidate).filter((item): item is GmailCandidate => !!item),
    attention: toAttention(dto),
    error: '',
  };
}

// A status read that failed: nothing found, no progress.
export const failedGmailScan = (job_id: string, error: string): GmailScanStatus => ({
  job_id,
  phase: null,
  progress: { total: 0, done: 0 },
  live: { found: 0, read: 0, checked: 0, candidates: 0 },
  messages: 0,
  deep: null,
  status: 'failed',
  stage: 0,
  candidates: [],
  attention: { usage: [], needs_match: [] },
  error,
});

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

const SUPPORT_TOPICS: SupportTopic[] = ['gmail', 'reminders', 'subscriptions', 'ai_chat', 'account', 'other'];
const dayLabel = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

export function toSupportMessage(message: SupportMessageDto): SupportMessage {
  return {
    id: message.id,
    topic: SUPPORT_TOPICS.includes(message.topic as SupportTopic) ? (message.topic as SupportTopic) : 'other',
    message: message.message,
    // Open shows as Sent only while no reply exists; an open message the team has answered (reopened) shows Replied.
    status: message.status === 'closed' ? 'closed' : message.status === 'replied' || message.replies.length ? 'replied' : 'sent',
    unread: message.unread,
    sent_label: dayLabel(message.createdAt),
    replies: message.replies.map(reply => ({ body: reply.body, sent_label: `${dayLabel(reply.sentAt)} · ${timeLabel(reply.sentAt)}` })),
  };
}

// Expired inbox permission: Outlook reports its own code and is handled exactly like Gmail's.
export function isAuthExpired(code?: string) {
  return code === 'GMAIL_AUTH_EXPIRED' || code === 'OUTLOOK_AUTH_EXPIRED';
}

// Admin release notes: one bullet per non-empty line.
export const toAppConfig = (dto: AppConfigDto): AppConfig => ({
  latest_version: dto.latestVersion,
  min_version: dto.minVersion,
  notes: dto.releaseNotes.map(note => note.trim()).filter(Boolean),
  store_url: dto.storeUrl,
});
