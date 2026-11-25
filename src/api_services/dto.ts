// Backend wire shapes (renewless-backend /v1). Screens never use these; adapters.ts maps them once.
export type MoneyDto = { currency: string; amount: string };
export type CycleDto = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type InboxProvider = 'gmail' | 'outlook';
// usage: the amount changes every bill (ads, cloud); such a record has no price and stays out of totals.
export type BillingDto = 'fixed' | 'usage';
export type DatedMoneyDto = { date: string; amount: MoneyDto };

export type UserDto = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  providers: ('password' | 'google' | 'apple' | 'microsoft')[];
  hasPassword: boolean;
  phone: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  timezone: string;
  onboardingCompleted: boolean;
  // The account's AI chat consent (PUT /me/ai-consent).
  aiConsent?: { consented: boolean; consentedAt: string | null; copyVersion: string | null };
  // Settings › Product updates: admin pushes of kind update (PATCH /me/preferences).
  productUpdates?: boolean;
  revision: number;
};

export type SessionDto = { token: string; user: UserDto };
export type ChallengeDto = { challengeId: string; email: string; expiresAt: string; resendAfter: string };

export type EventDto = {
  subscriptionId: string;
  name: string;
  plan: string | null;
  logoUrl: string | null;
  // usage_bill: a usage record's next bill, expectedCharge false and amount null.
  type: 'renewal' | 'trial_end' | 'usage_bill';
  date: string;
  expectedCharge: boolean;
  amount: MoneyDto | null;
  cycle: CycleDto;
  estimated: boolean;
};

export type SummaryDto = {
  id: string;
  name: string;
  plan: string | null;
  platformId: string | null;
  categoryId: string | null;
  logoUrl: string | null;
  billing?: BillingDto;
  // null on a usage record.
  price: MoneyDto | null;
  cycle: CycleDto;
  statusGroup: string;
  nextEvent: EventDto | null;
  estimated: boolean;
  trial: { endDate: string; autoRenew: boolean } | null;
  lifecycle: 'active' | 'cancelled' | 'expired';
  cancelledAt: string | null;
  accessUntil: string | null;
  expiredAt: string | null;
};

export type DetailDto = SummaryDto & {
  startDate: string | null;
  note: string | null;
  manageUrl: string | null;
  reminder: { offsets: number[]; custom: boolean };
  source: {
    type: 'manual' | 'ai' | 'gmail' | 'outlook';
    email: string;
    connector: { id: string; email: string; provider?: InboxProvider; status: string; lastSuccessfulSyncAt: string | null } | null;
  };
  // annualEquivalent is null on a usage record; lastCharges (oldest first, up to 3) only on a usage record.
  spending: { totals: MoneyDto[]; count: number; annualEquivalent: MoneyDto | null };
  lastCharges?: DatedMoneyDto[];
  samePlatformCount: number;
  priceChangeCount: number;
  revision: number;
};

export type SubscriptionListDto = { items: SummaryDto[]; total: number; nextCursor: string | null };

export type PlatformSpendDto = { platformId: string; name: string; logoUrl: string | null; monthly: MoneyDto; percent: number; subscriptionCount: number };
export type TrialDto = { subscriptionId: string; name: string; logoUrl: string | null; endDate: string; autoRenew: boolean; after: MoneyDto; cycle: CycleDto };

export type HomeDto = {
  asOf: string;
  today: string;
  timezone: string;
  hasSubscriptions: boolean;
  nearest: { date: string; events: EventDto[]; upcomingCount: number } | null;
  month: { label: string; paid: MoneyDto[]; paidCount: number; upcoming: MoneyDto[] };
  topSpending: { currency: string; total: MoneyDto; items: PlatformSpendDto[]; others: { count: number; monthly: MoneyDto } | null }[];
  trials: TrialDto[];
  forecast: { month: string; totals: MoneyDto[] }[];
  // The rest of a first scan's year, read after onboarding (Home · still checking / more found); null when nothing to show.
  backgroundScan?: { status: 'running' | 'done'; newCount: number; connectorId: string; jobId: string } | null;
  // Live records and this month's inbox receipts per currency, most records first (currency switcher).
  byCurrency?: { currency: string; subscriptionCount: number; paidCount: number }[];
};

export type UpcomingDto = { through: string; events: EventDto[] };
export type CalendarDto = { month: string; expected: MoneyDto[]; stillUpcoming: MoneyDto[]; eventCount: number; events: EventDto[] };
export type SpendingDto = { byCurrency: { currency: string; total: MoneyDto; platforms: PlatformSpendDto[] }[]; trials: TrialDto[] };

export type PaymentDto = {
  id: string;
  subscriptionId: string;
  name: string;
  logoUrl: string | null;
  paidDate: string;
  billingDate: string;
  amount: MoneyDto;
  refunded: MoneyDto | null;
  source: string;
  inboxEmail: string | null;
  subscriptionAvailable: boolean;
};
export type PaymentsDto = { years: number[]; items: PaymentDto[]; total: number; nextCursor: string | null };
export type PaymentsSummaryDto = { totals: MoneyDto[]; count: number };

export type PriceHistoryDto = {
  current: { price: MoneyDto; cycle: CycleDto };
  changes: { id: string; old: { price: MoneyDto; cycle: CycleDto }; new: { price: MoneyDto; cycle: CycleDto }; reason: 'price_change' | 'correction'; effectiveDate: string | null; recordedAt: string; source: 'user' | 'gmail' | 'outlook' }[];
};

export type ReminderSettingsDto = {
  pushEnabled: boolean;
  renewalsEnabled: boolean;
  trialsEnabled: boolean;
  defaultOffsets: number[];
  customOffset: number | null;
  sendTime: string;
  timezone: string;
  revision: number;
};

export type AlertDto = {
  id: string;
  subscriptionId: string;
  name: string;
  eventType: 'renewal' | 'trial_end';
  eventDate: string;
  amount: MoneyDto | null;
  sentAt: string | null;
  subscriptionAvailable: boolean;
  logoUrl: string | null;
};
export type AlertsDto = { items: AlertDto[]; total: number; nextCursor: string | null };

// provider is missing on an older backend: treat it as gmail.
export type ConnectorDto = {
  id: string;
  email: string;
  provider?: InboxProvider;
  status: 'connected' | 'reconnect_needed' | 'disconnected';
  lastSuccessfulSyncAt: string | null;
  nextSyncAt: string | null;
  importedCount?: number;
  backgroundScan?: { status: 'running' | 'done' | 'failed'; newCount: number; jobId: string; dismissed: boolean } | null;
};
// GET /connectors. remaining counts disconnected inboxes too; usedBefore lists those that still hold a slot.
export type ConnectorsDto = { connectors: ConnectorDto[]; limit?: number; remaining?: number; usedBefore?: { email: string; provider: InboxProvider }[] };

export type OutlookConnectDto = { connector: ConnectorDto; scannedBefore: boolean };
// Continue with Outlook: logs in or opens the account and connects that inbox; connector is null when inboxLimit.
export type OutlookLoginDto = SessionDto & { isNewUser: boolean; inboxLimit: boolean; scannedBefore: boolean; connector: ConnectorDto | null };

// Google sign-in plus the Gmail grant; a token comes back only when the app had no session.
// scannedBefore: a deleted account already read this inbox, so no first scan runs.
export type GoogleConnectDto = { token?: string; user: UserDto; isNewUser: boolean; gmailGranted: boolean; inboxLimit: boolean; scannedBefore: boolean; connector: ConnectorDto | null };

export type CandidateDto = {
  id: string;
  classification: 'new' | 'update' | 'tracked' | 'unresolved';
  selected: boolean;
  name: string;
  plan: string | null;
  platformId: string | null;
  logoUrl: string | null;
  price: MoneyDto | null;
  cycle: CycleDto | null;
  anchorDate: string | null;
  estimated: boolean;
  // startDate/days only when an email dates the trial's start (e.g. a "trial started" email).
  trial: { endDate: string; autoRenew: boolean; startDate?: string | null; days?: number | null } | null;
  targetSubscriptionId: string | null;
  changes: { price: { from: { currency: string; amountMinor: number }; to: { currency: string; amountMinor: number } } } | null;
  imported: boolean;
  // Backend: true when price or cycle is missing.
  needsDetails: boolean;
  billing?: BillingDto;
  // Only failed payments found: never selected, no price. failedSince is a local date.
  paymentFailing?: boolean;
  failedSince?: string | null;
  failedCount?: number;
  // Usage bills: the last paid bills, oldest first (up to 3).
  lastCharges?: DatedMoneyDto[];
  revision: number;
};

export type ScanProgressDto = { total: number; done: number };

// A paid receipt that fits two or more tracked plans; resolved with POST /scans/:jobId/matches/:receiptId.
export type NeedsMatchDto = {
  receiptId: string;
  revision: number;
  service: { name: string; platformId: string | null; logoUrl: string | null };
  amount: MoneyDto;
  paidDate: string;
  options: { subscriptionId: string; name: string; plan: string | null; price: MoneyDto | null; cycle: CycleDto; nextRenewal: string | null }[];
};

export type ScanJobDto = {
  id: string;
  connectorId: string;
  kind: 'initial' | 'incremental' | 'renewal' | 'deep';
  // A Gmail first scan: quick (the job the app starts) then deep (the rest of the year, in the background).
  phase?: 'quick' | 'deep' | null;
  // Quick job only: its deep job once it exists.
  deep?: { jobId: string; status: 'queued' | 'running' | 'succeeded' | 'failed'; progress: ScanProgressDto } | null;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  stages: { key: 'finding' | 'grouping' | 'checking'; status: 'pending' | 'running' | 'done' | 'failed' }[];
  error: { code: string; retryable: boolean } | null;
  counts: { messages: number; candidates: number };
  // Two steps per mail (read, checked); total 0 = still listing the inbox.
  progress?: ScanProgressDto;
  live?: { found: number; read: number; checked: number; candidates: number };
  candidates: CandidateDto[];
  needsMatch?: NeedsMatchDto[];
};

// AI chat. Draft `fields` use the POST /subscriptions body shape; a value the AI has not found yet is absent or null.
export type AiUsageDto = { used: number; limit: number; remaining: number; resetsOn: string };
export type ChatDraftDto = {
  id: string;
  revision: number;
  status: 'incomplete' | 'ready' | 'added';
  fields: {
    name?: string;
    platformId?: string | null;
    categoryId?: string | null;
    price?: { currency: string | null; amount: string | null };
    cycle?: CycleDto;
    startDate?: string;
    anchorDate?: string;
    trial?: { endDate?: string; days?: number };
    autoRenew?: boolean;
    note?: string;
  };
  missing: string[];
  match: { kind: string; subscriptionIds: string[] };
  subscriptionId: string | null;
};
export type ChatTurnDto = { reply: { id: string | null; text: string | null; draftIds: string[] }; drafts: ChatDraftDto[]; usage: AiUsageDto };

// A billing email Gmail matched to a subscription: extracted details and its kept files, never the email body.
export type ReceiptDto = {
  id: string;
  kind: string;
  subject: string;
  from: string;
  receivedAt: string;
  amount: MoneyDto | null;
  billingDate: string | null;
  attachments: { id: string; filename: string; mimeType: string; size: number }[];
};
export type ReceiptsDto = { items: ReceiptDto[]; total: number; nextCursor: string | null };

// subscriptions: the created and updated records (missing from a backend before 16 November 2026).
export type ScanImportDto = { created: string[]; updated: string[]; alreadyApplied: string[]; subscriptions?: DetailDto[] };

export type PlatformDto = { id: string; name: string; categoryId: string | null; logoUrl: string | null };
export type CategoryDto = { id: string; key: string; name: string };

// Help & support messages; the backend's open status shows as Sent until the team replies.
export type SupportMessageDto = {
  id: string;
  topic: string;
  message: string;
  status: 'open' | 'sent' | 'replied' | 'closed';
  createdAt: string;
  unread: boolean;
  replies: { body: string; sentAt: string }[];
};

// GET /app-config?platform= (public): the newest store version, the oldest version still allowed, and the newest one's notes.
// Versions are the store version names (Android versionName, iOS CFBundleShortVersionString, e.g. 1.1). null until the admin sets it.
export type AppConfigDto = {
  platform: 'ios' | 'android';
  latestVersion: string;
  minVersion: string;
  releaseNotes: string[];
  storeUrl: string;
};
