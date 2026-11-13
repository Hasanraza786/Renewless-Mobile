// Backend wire shapes (renewless-backend /v1). Screens never use these; adapters.ts maps them once.
export type MoneyDto = { currency: string; amount: string };
export type CycleDto = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export type UserDto = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  providers: ('password' | 'google' | 'apple')[];
  hasPassword: boolean;
  phone: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  timezone: string;
  onboardingCompleted: boolean;
  // The account's AI chat consent (PUT /me/ai-consent).
  aiConsent?: { consented: boolean; consentedAt: string | null; copyVersion: string | null };
  revision: number;
};

export type SessionDto = { token: string; user: UserDto };
export type ChallengeDto = { challengeId: string; email: string; expiresAt: string; resendAfter: string };

export type EventDto = {
  subscriptionId: string;
  name: string;
  plan: string | null;
  logoUrl: string | null;
  type: 'renewal' | 'trial_end';
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
  price: MoneyDto;
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
  reminder: { offsets: number[]; custom: boolean };
  source: {
    type: 'manual' | 'ai' | 'gmail';
    email: string;
    connector: { id: string; email: string; status: string; lastSuccessfulSyncAt: string | null } | null;
  };
  spending: { totals: MoneyDto[]; count: number; annualEquivalent: MoneyDto };
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
  source: string;
  inboxEmail: string | null;
  subscriptionAvailable: boolean;
};
export type PaymentsDto = { years: number[]; items: PaymentDto[]; total: number; nextCursor: string | null };
export type PaymentsSummaryDto = { totals: MoneyDto[]; count: number };

export type PriceHistoryDto = {
  current: { price: MoneyDto; cycle: CycleDto };
  changes: { id: string; old: { price: MoneyDto; cycle: CycleDto }; new: { price: MoneyDto; cycle: CycleDto }; reason: 'price_change' | 'correction'; effectiveDate: string | null; recordedAt: string; source: 'user' | 'gmail' }[];
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

export type ConnectorDto = { id: string; email: string; status: 'connected' | 'reconnect_needed' | 'disconnected'; lastSuccessfulSyncAt: string | null; nextSyncAt: string | null; importedCount?: number };

// Google sign-in plus the Gmail grant; a token comes back only when the app had no session.
// scannedBefore: a deleted account already read this inbox, so no first scan runs.
export type GoogleConnectDto = { token?: string; user: UserDto; isNewUser: boolean; gmailGranted: boolean; scannedBefore: boolean; connector: ConnectorDto | null };

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
  revision: number;
};

export type ScanJobDto = {
  id: string;
  connectorId: string;
  kind: 'initial' | 'incremental' | 'renewal';
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  stages: { key: 'finding' | 'grouping' | 'checking'; status: 'pending' | 'running' | 'done' | 'failed' }[];
  error: { code: string; retryable: boolean } | null;
  counts: { messages: number; candidates: number };
  candidates: CandidateDto[];
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

export type ScanImportDto = { created: string[]; updated: string[]; alreadyApplied: string[] };

export type PlatformDto = { id: string; name: string; categoryId: string | null; logoUrl: string | null };
export type CategoryDto = { id: string; key: string; name: string };
