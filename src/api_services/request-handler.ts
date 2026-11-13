import { del, get, patch, post, postLong, put, upload } from './http-provider';
import type {
  AiUsageDto,
  AlertsDto,
  CalendarDto,
  CategoryDto,
  ChallengeDto,
  ChatTurnDto,
  CandidateDto,
  ConnectorDto,
  GoogleConnectDto,
  DetailDto,
  HomeDto,
  PaymentsDto,
  PaymentsSummaryDto,
  PlatformDto,
  PriceHistoryDto,
  ReceiptsDto,
  ReminderSettingsDto,
  ScanImportDto,
  ScanJobDto,
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
  googleConnect: '/auth/google-connect',
  onboardingComplete: '/me/onboarding/complete',
  aiConsent: '/me/ai-consent',
  scans: '/scans',
  uploads: '/uploads',
  conversations: '/conversations',
  drafts: '/drafts',
  receipts: '/receipts',
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
const saveAiConsent = (data: { consented: boolean; copyVersion?: string }) => put<{ user: UserDto }>(SERVICE_URLS.aiConsent, data);
// Google/Apple accounts verify with a fresh provider token; password accounts with the password.
const deleteMe = (data: { password: string } | { provider: 'google' | 'apple'; idToken: string; nonce?: string }) => del<{ deleted: true }>(SERVICE_URLS.me, data);

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
// Billing emails matched to this subscription, newest first, and a 5-minute private link to one kept file.
const getSubscriptionReceipts = ({ id, ...data }: Id<{ cursor?: string; limit: number }>) => get<ReceiptsDto>(subscription(id, '/receipts'), data);
const getReceiptFile = ({ id, attachment_id }: Id<{ attachment_id: string }>) => get<{ url: string; expiresAt: string }>(`${SERVICE_URLS.receipts}/${id}/attachments/${attachment_id}`);

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

// Gmail connect and scans
const googleConnect = (data: { idToken: string; serverAuthCode: string }) => post<GoogleConnectDto>(SERVICE_URLS.googleConnect, data);
const startScan = ({ id, kind }: Id<{ kind: 'initial' | 'incremental' }>) => post<{ jobId: string; status: string }>(`${SERVICE_URLS.connectors}/${id}/scans`, { kind });
const getScan = ({ id }: Id) => get<ScanJobDto>(`${SERVICE_URLS.scans}/${id}`);
const updateCandidate = ({ job_id, id, ...data }: Id<{ job_id: string; revision: number; price?: { currency: string; amount: string }; cycle?: string; anchorDate?: string; trial?: { endDate: string; autoRenew?: boolean } | null; replaceAnchorDate?: boolean; selected?: boolean }>) =>
  patch<CandidateDto>(`${SERVICE_URLS.scans}/${job_id}/candidates/${id}`, data);
const importScan = ({ job_id, candidate_ids }: { job_id: string; candidate_ids: string[] }) => post<ScanImportDto>(`${SERVICE_URLS.scans}/${job_id}/import`, { candidateIds: candidate_ids }, true);
const completeOnboarding = () => post<{ user: UserDto }>(SERVICE_URLS.onboardingComplete);

// AI chat
const startConversation = () => post<{ id: string; usage: AiUsageDto }>(SERVICE_URLS.conversations);
const uploadFile = (file: Blob) => upload<{ uploadId: string; kind: string }>(SERVICE_URLS.uploads, file);
// The client message ID makes a Retry of the same message answer once.
const sendChatMessage = ({ id, ...data }: Id<{ clientMessageId: string; text: string | null; uploadId: string | null }>) =>
  postLong<ChatTurnDto>(`${SERVICE_URLS.conversations}/${id}/messages`, data);
const createFromDraft = ({ id, ...data }: Id<{ revision: number; separatePlan: boolean }>) => post<{ subscriptionId: string }>(`${SERVICE_URLS.drafts}/${id}/create`, data, true);

const apiServices = {
  startConversation,
  uploadFile,
  sendChatMessage,
  createFromDraft,
  googleConnect,
  startScan,
  getScan,
  updateCandidate,
  importScan,
  completeOnboarding,
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
  saveAiConsent,
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
  getSubscriptionReceipts,
  getReceiptFile,
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
