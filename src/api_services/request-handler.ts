import { del, get, patch, post, put } from './http-provider';
import type {
  AlertsDto,
  CalendarDto,
  CategoryDto,
  ChallengeDto,
  ConnectorDto,
  DetailDto,
  HomeDto,
  PaymentsDto,
  PaymentsSummaryDto,
  PlatformDto,
  PriceHistoryDto,
  ReminderSettingsDto,
  SessionDto,
  SpendingDto,
  SubscriptionListDto,
  UpcomingDto,
  UserDto,
} from './dto';

export const SERVICE_URLS = {
  signup: '/auth/signup',
  verifySignup: '/auth/signup/verify',
  resendCode: '/auth/otp/resend',
  login: '/auth/login',
  social: '/auth/social',
  forgotPassword: '/auth/password/forgot',
  verifyReset: '/auth/password/verify',
  resetPassword: '/auth/password/reset',
  changePassword: '/auth/password/change',
  logout: '/auth/logout',
  me: '/me',
  device: '/me/device',
  platforms: '/platforms',
  categories: '/categories',
  subscriptions: '/subscriptions',
  home: '/home',
  upcoming: '/upcoming',
  calendar: '/calendar',
  spending: '/spending',
  payments: '/payments',
  paymentsSummary: '/payments/summary',
  reminderSettings: '/reminder-settings',
  reminderPreview: '/reminder-settings/apply-preview',
  reminderApply: '/reminder-settings/apply',
  alerts: '/alerts',
  connectors: '/connectors',
};

const subscription = (id: string, action = '') => `${SERVICE_URLS.subscriptions}/${id}${action}`;

type Id<T = object> = { id: string } & T;

// Auth
const signup = (data: { name: string; email: string; password: string; timezone: string }) => post<ChallengeDto>(SERVICE_URLS.signup, data);
const verifySignup = (data: { challengeId: string; code: string }) => post<SessionDto>(SERVICE_URLS.verifySignup, data);
const resendCode = (data: { challengeId: string }) => post<ChallengeDto>(SERVICE_URLS.resendCode, data);
const login = (data: { email: string; password: string }) => post<SessionDto>(SERVICE_URLS.login, data);
const social = (data: { provider: 'google' | 'apple'; idToken: string; nonce?: string; name?: string }) => post<SessionDto & { isNewUser: boolean }>(SERVICE_URLS.social, data);
const forgotPassword = (data: { email: string }) => post<ChallengeDto>(SERVICE_URLS.forgotPassword, data);
const verifyReset = (data: { challengeId: string; code: string }) => post<{ resetToken: string }>(SERVICE_URLS.verifyReset, data);
const resetPassword = (data: { resetToken: string; password: string }) => post<void>(SERVICE_URLS.resetPassword, data);
const changePassword = (data: { currentPassword: string; password: string }) => post<void>(SERVICE_URLS.changePassword, data);
const logout = () => post<void>(SERVICE_URLS.logout);

// Account
const getMe = () => get<{ user: UserDto }>(SERVICE_URLS.me);
const updateMe = (data: { revision: number; name: string; phone: string | null; dateOfBirth: string | null; gender: string | null }) => patch<{ user: UserDto }>(SERVICE_URLS.me, data);
const updateDevice = (data: { timezone?: string; fcmToken?: string | null }) => put<void>(SERVICE_URLS.device, data);
const deleteMe = (data: { password: string }) => del<{ deleted: true }>(SERVICE_URLS.me, data);

// Catalog
const getPlatforms = (data: { q: string }) => get<{ platforms: PlatformDto[] }>(SERVICE_URLS.platforms, data);
const getCategories = () => get<{ categories: CategoryDto[] }>(SERVICE_URLS.categories);

// Subscriptions
const getSubscriptions = (data: { platformId?: string; exclude?: string; connectorId?: string; cursor?: string; limit: number }) => get<SubscriptionListDto>(SERVICE_URLS.subscriptions, data);
const createSubscription = (data: object) => post<DetailDto>(SERVICE_URLS.subscriptions, data, true);
const getSubscription = ({ id }: Id) => get<DetailDto>(subscription(id));
const updateSubscription = ({ id, ...data }: Id) => patch<DetailDto>(subscription(id), data);
const cancelSubscription = ({ id, ...data }: Id) => post<DetailDto>(subscription(id, '/cancel'), data);
const resumeSubscription = ({ id, ...data }: Id) => post<DetailDto>(subscription(id, '/resume'), data);
const setSubscriptionReminder = ({ id, ...data }: Id) => put<DetailDto>(subscription(id, '/reminder'), data);
const removeSubscription = ({ id, ...data }: Id<{ revision: number }>) => del<{ undoToken: string }>(subscription(id), data);
const restoreSubscription = ({ id, ...data }: Id<{ undoToken: string }>) => post<DetailDto>(subscription(id, '/restore'), data);
const getPriceHistory = ({ id }: Id) => get<PriceHistoryDto>(subscription(id, '/price-history'));

// Dashboard
const getHome = () => get<HomeDto>(SERVICE_URLS.home);
const getUpcoming = () => get<UpcomingDto>(SERVICE_URLS.upcoming);
const getCalendar = ({ month }: { month: string }) => get<CalendarDto>(`${SERVICE_URLS.calendar}/${month}`);
const getSpending = () => get<SpendingDto>(SERVICE_URLS.spending);
const getPayments = (data: { year?: number; subscriptionId?: string; cursor?: string; limit: number }) => get<PaymentsDto>(SERVICE_URLS.payments, data);
const getPaymentsSummary = () => get<PaymentsSummaryDto>(SERVICE_URLS.paymentsSummary);

// Reminders
const getReminderSettings = () => get<ReminderSettingsDto>(SERVICE_URLS.reminderSettings);
const saveReminderSettings = (data: Omit<ReminderSettingsDto, 'timezone'>) => put<ReminderSettingsDto>(SERVICE_URLS.reminderSettings, data);
const previewReminderApply = (data: { preserveCustom: boolean }) => post<{ affectedCount: number }>(SERVICE_URLS.reminderPreview, data);
const applyReminderDefault = (data: { revision: number; preserveCustom: boolean; expectedCount: number }) => post<{ updated: number }>(SERVICE_URLS.reminderApply, data, true);
const getAlerts = (data: { cursor?: string; limit: number }) => get<AlertsDto>(SERVICE_URLS.alerts, data);

// Connected inboxes
const getConnectors = () => get<{ connectors: ConnectorDto[] }>(SERVICE_URLS.connectors);
const getConnector = ({ id }: Id) => get<ConnectorDto>(`${SERVICE_URLS.connectors}/${id}`);
const disconnectConnector = ({ id }: Id) => del<void>(`${SERVICE_URLS.connectors}/${id}`);

const apiServices = {
  signup,
  verifySignup,
  resendCode,
  login,
  social,
  forgotPassword,
  verifyReset,
  resetPassword,
  changePassword,
  logout,
  getMe,
  updateMe,
  updateDevice,
  deleteMe,
  getPlatforms,
  getCategories,
  getSubscriptions,
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  resumeSubscription,
  setSubscriptionReminder,
  removeSubscription,
  restoreSubscription,
  getPriceHistory,
  getHome,
  getUpcoming,
  getCalendar,
  getSpending,
  getPayments,
  getPaymentsSummary,
  getReminderSettings,
  saveReminderSettings,
  previewReminderApply,
  applyReminderDefault,
  getAlerts,
  getConnectors,
  getConnector,
  disconnectConnector,
};

export default apiServices;
