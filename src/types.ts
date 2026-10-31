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

export type SessionState = {
  token: string | null;
  user: Profile | null;
};

export type AuthRequest =
  | 'login'
  | 'signup'
  | 'forgot'
  | 'otp'
  | 'resend'
  | 'reset'
  | 'password'
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

export type RootState = {
  session: SessionState;
  auth: AuthState;
  profile: ProfileState;
  dashboard: DashboardState;
  subscriptions: SubscriptionsState;
  notifications: NotificationsState;
  connectors: ConnectorsState;
};

export type AuthStackParamList = {
  Welcome: undefined;
  ConnectInbox: undefined;
  InboxPermission: undefined;
  Discovering: undefined;
  YourSubscriptions: undefined;
  SaveYourFinds: {
    count: number;
    monthly: string;
    saved_total: string;
    next_name?: string;
    next_when?: string;
    next_amount?: string;
  };
  ReadyToGo: {
    count: number;
    monthly: string;
    next_name?: string;
    next_when?: string;
    next_amount?: string;
  };
  ScanNoResults: undefined;
  ScanInterrupted: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: { email: string };
  ResetPassword: { email: string };
};

export type TabParamList = {
  Dashboard: undefined;
  Subscriptions: undefined;
  Calendar: undefined;
  Alerts: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Main: undefined;
  Connectors: undefined;
  AddSubscription: undefined;
  SubscriptionDetail: { id: string };
  EditSubscription: { id: string };
  EditProfile: undefined;
  ChangePassword: undefined;
  AddConnector: undefined;
  Review: { connectorId: string; email: string };
};
