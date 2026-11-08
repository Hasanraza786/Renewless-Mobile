export type Cycle = 'weekly' | 'monthly' | 'yearly' | 'custom';
export type RenewalSource = 'confirmed' | 'predicted' | 'user';
export type SubscriptionStatus = 'upcoming' | 'in_progress' | 'expired';
export type Gender = 'male' | 'female' | 'other';

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string | null;
  gender: Gender | null;
  // How the account signs in; social-only accounts have no Renewless password.
  provider: 'email' | AuthProvider;
  hasPassword: boolean;
};

// A Gmail inbox the account connected for receipts; lastSync is an ISO time or null.
export type ProfileInbox = {
  id: string;
  email: string;
  status: 'synced' | 'paused' | 'reconnect';
  lastSync: string | null;
};

// Profile data beyond identity: connected inboxes and all-time confirmed payment totals per currency.
// Connected inbox detail: authorization/sync state, last success (ISO or null) and imported count.
export type InboxDetail = ProfileInbox & { imported_count: number };

export type InboxState = {
  inbox: InboxDetail | null;
  imported: SubscriptionRecord[] | null;
  syncing: boolean;
  sync_error: string;
  loading: { inbox: boolean; imported: boolean; reconnect: boolean; disconnect: boolean };
  error: { inbox: string; imported: string; reconnect: string; disconnect: string };
};

export type ProfileOverview = {
  inboxes: ProfileInbox[];
  payment_totals: { currency: string; amount: string }[];
};

export type AuthResponse = {
  token: string;
  user: Profile;
};

export type Subscription = {
  id: string;
  name: string;
  price: number;
  currency: string;
  cycle: Cycle;
  startDate: string;
  nextRenewal: string;
  renewalSource: RenewalSource;
  status: SubscriptionStatus;
  note: string | null;
};

// Exact decimal amount per currency; currencies are never converted or combined.
export type MoneyTotal = { currency: string; amount: string };

// One renewal or trial ending on a local calendar date, with the owning subscription's stable ID.
export type HomeEvent = {
  id: string;
  subscription_id: string;
  platform_id: string;
  name: string;
  plan: string | null;
  date: string;
  kind: 'renewal' | 'trial_end';
  amount: string;
  currency: string;
  cycle: ScanCycle;
  // False for a trial that ends without a charge.
  expected_charge: boolean;
  estimated: boolean;
};

export type HomePlatformSpend = {
  platform_id: string;
  name: string;
  amount: string;
  percent: number;
  subscription_count: number;
};

export type HomeSpending = {
  currency: string;
  total: string;
  // Top three for Home; every paid platform for Spending breakdown.
  platforms: HomePlatformSpend[];
  all_platforms: HomePlatformSpend[];
  others: { amount: string; percent: number; platform_count: number } | null;
};

export type HomeTrial = {
  subscription_id: string;
  platform_id: string;
  name: string;
  end_date: string;
  then_amount: string;
  currency: string;
  cycle: ScanCycle;
};

// Server-authoritative Home snapshot in the user's local calendar.
export type HomeSnapshot = {
  as_of: string;
  today: string;
  has_subscriptions: boolean;
  // Every event on the nearest date within the next seven days; empty means the quiet state.
  nearest_events: HomeEvent[];
  // Distinct subscriptions shown by Upcoming (See all).
  upcoming_count: number;
  // Upcoming: each dated subscription's next event, date ascending, through upcoming_until.
  upcoming: HomeEvent[];
  upcoming_until: string;
  month: {
    month: string;
    paid: MoneyTotal[];
    receipt_count: number;
    upcoming: MoneyTotal[];
    charge_count: number;
    // This month: full-month expected total and every scheduled event, earlier ones included.
    expected: MoneyTotal[];
    events: HomeEvent[];
  };
  spending: HomeSpending[];
  trials: HomeTrial[];
  // Six months from the current one, scheduled charges per currency.
  forecast: { currency: string; months: { month: string; amount: string }[] }[];
};

export type TrackingStatus = 'active' | 'cancelled' | 'expired';

export type PriceChange = {
  id: string;
  reason: 'price_changed' | 'correction';
  from_amount: string;
  from_cycle: ScanCycle;
  to_amount: string;
  to_cycle: ScanCycle;
  currency: string;
  effective_on: string;
  source: 'user' | 'gmail';
};

export type Receipt = { id: string; subscription_id: string; amount: string; currency: string; paid_on: string };

// A confirmed payment as Payments lists it: the receipt plus the retained subscription snapshot and evidence.
// subscription_available is false once the subscription was removed; the payment record is kept.
export type PaymentRecord = Receipt & {
  name: string;
  platform_id: string;
  billing_date: string;
  source: 'gmail' | 'reviewed' | 'manual';
  inbox_email: string | null;
  subscription_available: boolean;
};

// Per-subscription override: follow the account default, Off, or one or more days before the event.
export type ReminderPreference = { mode: 'default' } | { mode: 'off' } | { mode: 'days'; days: number[] };

// A tracked subscription as the backend owns it (stable ID; dates are local YYYY-MM-DD).
export type SubscriptionRecord = {
  id: string;
  platform_id: string;
  name: string;
  plan: string | null;
  category: string;
  price: string;
  currency: string;
  cycle: ScanCycle;
  next_date: string | null;
  estimated: boolean;
  // Tracking assumption, not a provider setting; null = not set.
  auto_renew: boolean | null;
  trial: { start_date: string; end_date: string; auto_renew: boolean } | null;
  status: TrackingStatus;
  cancelled_on: string | null;
  access_until: string | null;
  start_date: string | null;
  source: { kind: 'manual' | 'gmail'; email: string };
  // disconnected: the inbox was disconnected; the source still names it (Profile contract).
  inbox: { email: string; last_sync: string; disconnected?: boolean } | null;
  reminder: ReminderPreference;
  notes: string | null;
  manage_url: string | null;
  price_history: PriceChange[];
};

// Detail: the record plus server-computed spending and relations.
export type SubscriptionDetail = {
  record: SubscriptionRecord;
  today: string;
  receipts: { totals: MoneyTotal[]; count: number };
  annual_estimate: string;
  related_count: number;
  // Account default reminder days (Reminder settings), shown and used by "Account default".
  account_reminder_days: number[];
};

// The complete tracked collection; null until the first successful load.
// Add/Edit save payload. A trial replaces Next renewal: its end is start + days unless an exact end is kept.
export type SubscriptionFormInput = {
  name: string;
  platform_id: string | null;
  price: string;
  currency: string;
  cycle: ScanCycle;
  category: string;
  start_date: string | null;
  next_date: string | null;
  trial: { days: number; end_date: string; auto_renew: boolean } | null;
  notes: string | null;
  // Edit only, when amount/currency/cycle changed: why, and from when (today for a correction).
  price_change: { reason: 'price_changed' | 'correction'; effective_on: string } | null;
};

// A reminder the server confirms it sent; sent_at is ISO time, event_date the local event date.
export type SentAlert = {
  id: string;
  subscription_id: string;
  platform_id: string;
  name: string;
  kind: 'renewal' | 'trial_end';
  event_date: string;
  amount: string;
  currency: string;
  sent_at: string;
  subscription_available: boolean;
};

// Account reminder preferences. days empty = Off; time is local HH:MM.
export type ReminderSettings = {
  push_enabled: boolean;
  renewals: boolean;
  trials: boolean;
  days: number[];
  time: string;
};

// Apply the new default to existing subscriptions too; keep_custom spares individually changed ones.
export type ReminderApply = { existing: boolean; keep_custom: boolean };

export type AlertsState = {
  alerts: SentAlert[] | null;
  settings: ReminderSettings | null;
  loading: { alerts: boolean; settings: boolean; save: boolean };
  error: { alerts: string; settings: string; save: string };
};

// A Gmail scan result for review: a new plan, an update to a tracked one, or an already-tracked match.
export type GmailCandidate = {
  id: string;
  kind: 'new' | 'update' | 'duplicate';
  name: string;
  platform_id: string;
  plan: string | null;
  price: string;
  currency: string;
  cycle: ScanCycle;
  category: string;
  start_date: string | null;
  next_date: string | null;
  // Trial: days, exact end from the receipt, and the tracked auto-renew assumption.
  trial: { days: number; end_date: string; auto_renew: boolean } | null;
  // Updates: the tracked record and its saved values against the receipt's.
  target_id: string | null;
  old: { price: string; next_date: string | null } | null;
  // Already saved from this scan; no longer selectable.
  saved: boolean;
};

export type GmailScanStatus = { status: 'running' | 'completed' | 'failed'; stage: number; candidates: GmailCandidate[]; error: string };

// What the user keeps for one selected candidate (edited fields for new plans; date choice for updates).
export type GmailSelection = { id: string; price: string; next_date: string | null; start_date: string | null; trial: { days: number; end_date: string; auto_renew: boolean } | null; replace_date: boolean };

// The subscription Loop is assembling in chat; missing required fields stay null until the user gives them.
export type AiDraft = {
  name: string | null;
  platform_id: string | null;
  category: string | null;
  price: string | null;
  currency: string | null;
  cycle: ScanCycle | null;
  next_date: string | null;
  start_date: string | null;
  trial: { days: number | null; end_date: string | null; auto_renew: boolean } | null;
  notes: string | null;
};

// What the user sent: text, a recorded voice clip, or one image/PDF.
export type AiInput = { kind: 'text'; text: string } | { kind: 'voice'; uri: string; duration_ms: number } | { kind: 'file'; uri: string; name: string; file_kind: 'image' | 'pdf' };

// Free AI messages this calendar month (backend `usage`); resetsOn is the local YYYY-MM-DD of the next reset.
export type AiUsage = { used: number; limit: number; remaining: number; resetsOn: string };

export type AiReply = { reply: string; draft: AiDraft | null; usage: AiUsage };

// One month of scheduled events (renewals and trial endings) with expected charges per currency.
export type CalendarMonth = { month: string; today: string; events: HomeEvent[]; expected: MoneyTotal[] };

export type CalendarState = {
  months: Record<string, CalendarMonth>;
  loading: boolean;
  error: string;
};

// Confirmed payments per scope: 'account' or an owned subscription ID.
export type PaymentsState = {
  scopes: Record<string, PaymentRecord[]>;
  today: string;
  loading: boolean;
  error: string;
};

export type ListState = {
  records: SubscriptionRecord[] | null;
  today: string;
  loading: boolean;
  error: string;
};

export type DetailState = {
  detail: SubscriptionDetail | null;
  // Just-removed tracking that can still be undone (eight seconds).
  removed: { id: string; name: string } | null;
  platform: SubscriptionRecord[];
  loading: { detail: boolean; platform: boolean; mutation: boolean };
  error: { detail: string; platform: string; mutation: string };
};

export type ConstantState = {
  token: string | null;
  user: Profile | null;
  splash_seen: boolean;
  // The one-time Home prompt to add the widget was closed on this device.
  widget_prompt_seen: boolean;
  // AI chat consent (Google Gemini) given on this device for the signed-in account; cleared on sign-out.
  ai_consent: boolean;
};

export type AuthRequest =
  | 'login'
  | 'signup'
  | 'forgot'
  | 'otp'
  | 'resend'
  | 'reset'
  | 'password'
  | 'social'
  | 'logout';

export type AuthState = {
  loading: Record<AuthRequest, boolean>;
  error: Record<AuthRequest, string>;
};

export type ProfileState = {
  user: Profile | null;
  loading: boolean;
  error: string;
  // null until the first successful load.
  overview: ProfileOverview | null;
  overview_loading: boolean;
  overview_error: string;
  // One-line app notice (e.g. Profile updated.); shown by the app toast.
  notice: string | null;
};

export type DashboardState = {
  data: HomeSnapshot | null;
  loading: boolean;
  error: string;
};

export type SubscriptionRequest = 'list' | 'detail' | 'edit' | 'create' | 'update' | 'delete';

export type OnboardingState = {
  connect_loading: boolean;
  connect_message: string;
  inbox_email: string;
  scan_job_id: string;
  scan_stages: number;
  scan_status: 'idle' | 'running' | 'completed' | 'failed';
  scan_failure: ScanFailure | '';
  candidates: ScanCandidate[];
  selected_ids: string[];
  saved: ScanCandidate[];
  save_loading: boolean;
  save_error: string;
};

export type RootState = {
  constant: ConstantState;
  auth: AuthState;
  profile: ProfileState;
  dashboard: DashboardState;
  detail: DetailState;
  list: ListState;
  payments: PaymentsState;
  calendar: CalendarState;
  alerts: AlertsState;
  inbox: InboxState;
  onboarding: OnboardingState;
};

export type OnboardingStep =
  | 'welcome'
  | 'connectInbox'
  | 'discovering'
  | 'yourSubscriptions'
  | 'readyToGo'
  | 'scanNoResults'
  | 'scanInterrupted';

export type ScanCycle = 'Monthly' | 'Quarterly' | 'Yearly' | 'Weekly';

export type ScanCandidate = {
  id: string;
  platform_id: string;
  name: string;
  // Exact decimal string; for an active trial this is the price after the trial.
  price: string;
  currency: string;
  cycle: ScanCycle;
  // Next renewal, or the trial end for a trial; null when unknown.
  next_date: string | null;
  // The date was inferred from receipts rather than stated or reviewed.
  estimated: boolean;
  trial?: { auto_renew: boolean };
};

export type ScanFailure = 'network' | 'access';

export type ScanStatus = {
  job_id: string;
  completed_stages: number;
  status: 'running' | 'completed' | 'failed';
  failure?: ScanFailure;
  candidates: ScanCandidate[];
};

// Google identity and the Gmail grant come back from one connection, but are checked separately.
export type GoogleConnection =
  | { status: 'cancelled' }
  | { status: 'signed_in'; session: AuthResponse; gmail_granted: boolean; inbox_email: string };

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: { step?: OnboardingStep } | undefined;
  Login: { intent?: AuthIntent } | undefined;
  Signup: { intent?: AuthIntent } | undefined;
  ForgotPassword: undefined;
  // One verification screen for both purposes: signup creates a session, reset only authorizes a new password.
  Otp: { purpose: 'signup' | 'reset'; email: string; intent?: AuthIntent };
  ResetPassword: { reset_token: string };
};

// Where the user goes after authenticating: the Add form for manual entry, otherwise Home.
export type AuthIntent = 'add_manual';
export type AuthProvider = 'google' | 'apple';

export type TabParamList = {
  // Settings › Add the widget opens the add-widget prompt; the value is a timestamp so each tap reopens it.
  // add_sheet: AI chat consent Not now reopens the Add sheet that opened it (a timestamp, so each time counts).
  Home: { add_widget?: number; add_sheet?: number } | undefined;
  List: { add_sheet?: number } | undefined;
  Calendar: { add_sheet?: number } | undefined;
  // Home Paid this month opens the account view on that YYYY-MM.
  Payments: { month?: string } | undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  AuthStack: undefined;
  Tabs: undefined;
  AddSubscription: undefined;
  SubscriptionDetail: { id: string };
  EditSubscription: { id: string };
  EditProfile: undefined;
  ChangePassword: undefined;
  Upcoming: undefined;
  ThisMonth: undefined;
  SpendingBreakdown: undefined;
  // From Detail exclude_id hides the current plan; from spending every plan on the platform shows.
  PlatformSubscriptions: { platform_id: string; name: string; exclude_id?: string };
  PriceHistory: { id: string };
  Alerts: undefined;
  ReminderSettings: undefined;
  Settings: undefined;
  History: undefined;
  ConnectedInbox: { id: string };
  // Authenticated Gmail scan and review; without an inbox the first connected one is used.
  GmailScan: { inbox_id?: string } | undefined;
  AiChat: undefined;
  InboxSubscriptions: { id: string };
  // Calendar date with several events; date is YYYY-MM-DD.
  CalendarDay: { date: string };
  // Detail's View payments: the Payments screen scoped to one owned subscription.
  SubscriptionPayments: { id: string; name: string };
};
