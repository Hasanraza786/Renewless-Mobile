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

export type MonthTotal = { currency: string; amount: number };

export type DashboardData = {
  active: number;
  renewingSoon: number;
  thisMonth: MonthTotal[];
  expired: number;
  upcoming: Subscription[];
};

export type RenewalNotice = {
  id: string;
  name: string;
  date: string;
  estimated: boolean;
};

export type Connector = {
  id: string;
  email: string;
  status: string;
  lastSync: string | null;
};

export type ReviewItem = {
  id: string;
  name: string;
  price: number;
  currency: string;
  nextRenewal: string;
};

export type ConstantState = {
  token: string | null;
  user: Profile | null;
  splash_seen: boolean;
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
};

export type DashboardState = {
  data: DashboardData | null;
  loading: boolean;
  error: string;
};

export type SubscriptionRequest = 'list' | 'detail' | 'edit' | 'create' | 'update' | 'delete';

export type SubscriptionsState = {
  items: Subscription[];
  current: Subscription | null;
  loading: Record<SubscriptionRequest, boolean>;
  error: Record<SubscriptionRequest, string>;
};

export type NotificationsState = {
  items: RenewalNotice[];
  loading: boolean;
  error: string;
};

export type ConnectorRequest = 'list' | 'create' | 'review';

export type ConnectorsState = {
  connectors: Connector[];
  reviewItems: ReviewItem[];
  reviewConnectorId: string | null;
  reviewBusyId: string;
  reviewActionError: string;
  loading: Record<ConnectorRequest, boolean>;
  error: Record<ConnectorRequest, string>;
};

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
  subscriptions: SubscriptionsState;
  notifications: NotificationsState;
  connectors: ConnectorsState;
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
  Dashboard: undefined;
  Subscriptions: undefined;
  Calendar: undefined;
  Alerts: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  AuthStack: undefined;
  Tabs: undefined;
  Connectors: undefined;
  AddSubscription: undefined;
  SubscriptionDetail: { id: string };
  EditSubscription: { id: string };
  EditProfile: undefined;
  ChangePassword: undefined;
  AddConnector: undefined;
  Review: { connectorId: string; email: string };
};
