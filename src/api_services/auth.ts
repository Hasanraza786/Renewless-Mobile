import { USE_MOCK_API } from '../config/api';
import { MOCK_DATA } from '../config/mock-data';
import type { AuthProvider, AuthResponse, Gender, Profile } from '../types';
import { request } from './http';

// Development mock adapter: an isolated in-memory account repository; resetMockAuth restores it.
type MockAccount = { id: string; name: string; email: string; password: string; verified: boolean };
let accounts: MockAccount[] = [];
let code_sent_at: Record<string, number> = {};
let reset_tokens: Record<string, string> = {};
export function resetMockAuth() {
  accounts = MOCK_DATA.auth_accounts.map(account => ({ ...account, verified: true }));
  code_sent_at = {};
  reset_tokens = {};
}
resetMockAuth();

const WRONG_CREDENTIALS = 'Wrong email or password. Please try again.';
const WRONG_CODE = 'That code is incorrect or has expired.';
const sameEmail = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();
const mockSession = (account: MockAccount): AuthResponse => ({
  token: `mock-token-${account.id}`,
  user: { id: account.id, name: account.name, email: account.email, phone: '', dateOfBirth: null, gender: null },
});

// Returns a session, or `{ verify: true }` when the account still needs its signup code.
export async function login(email: string, password: string): Promise<AuthResponse | { verify: true }> {
  if (!USE_MOCK_API) return request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } });
  const account = accounts.find(item => sameEmail(item.email, email) && item.password === password);
  if (!account) throw new Error(WRONG_CREDENTIALS);
  return account.verified ? mockSession(account) : { verify: true };
}

// Creates an unverified account and sends its code; no session until the code is verified.
export async function signup(input: { name: string; email: string; password: string }): Promise<void> {
  if (!USE_MOCK_API) {
    await request<{ ok: true }>('/auth/signup', { method: 'POST', body: input });
    return;
  }
  if (accounts.some(item => sameEmail(item.email, input.email) && item.verified)) {
    throw new Error('An account with this email already exists. Log in instead.');
  }
  accounts = accounts.filter(item => !sameEmail(item.email, input.email));
  accounts.push({ id: `mock-user-${accounts.length + 1}`, name: input.name.trim(), email: input.email.trim(), password: input.password, verified: false });
  code_sent_at[input.email.trim().toLowerCase()] = Date.now();
}

export async function verifySignupCode(email: string, code: string): Promise<AuthResponse> {
  if (!USE_MOCK_API) return request<AuthResponse>('/auth/verify-otp', { method: 'POST', body: { email, code } });
  const account = accounts.find(item => sameEmail(item.email, email));
  if (!account || code !== MOCK_DATA.auth_code) throw new Error(WRONG_CODE);
  account.verified = true;
  return mockSession(account);
}

// Always succeeds for a well-formed email so the response never reveals whether an account exists.
export async function forgotPassword(email: string): Promise<{ ok: true }> {
  if (!USE_MOCK_API) return request<{ ok: true }>('/auth/forgot-password', { method: 'POST', body: { email } });
  code_sent_at[email.trim().toLowerCase()] = Date.now();
  return { ok: true };
}

// Returns a short-lived reset authorization, never an app session.
export async function verifyResetCode(email: string, code: string): Promise<{ reset_token: string }> {
  requireMock('Password reset');
  const account = accounts.find(item => sameEmail(item.email, email) && item.verified);
  if (!account || code !== MOCK_DATA.auth_code) throw new Error(WRONG_CODE);
  const reset_token = `mock-reset-${account.id}-${Date.now()}`;
  reset_tokens[reset_token] = account.email;
  return { reset_token };
}

export async function resetPassword(reset_token: string, password: string): Promise<{ ok: true }> {
  requireMock('Password reset');
  const email = reset_tokens[reset_token];
  const account = email && accounts.find(item => sameEmail(item.email, email));
  if (!account) throw new Error('This reset link has expired. Request a new code.');
  account.password = password;
  delete reset_tokens[reset_token];
  return { ok: true };
}

export async function resendCode(email: string): Promise<{ ok: true }> {
  requireMock('Resend code');
  const key = email.trim().toLowerCase();
  if (Date.now() - (code_sent_at[key] ?? 0) < MOCK_DATA.auth_resend_cooldown_ms) {
    throw new Error('You can request a new code after 2 minutes.');
  }
  code_sent_at[key] = Date.now();
  return { ok: true };
}

// shortcut: mock only; the real adapter signs in with @react-native-google-signin/google-signin or
// @invertase/react-native-apple-authentication and exchanges the ID token with the backend (integration phase).
export async function signInWithProvider(_provider: AuthProvider): Promise<AuthResponse> {
  requireMock('Social sign-in');
  return mockSession({ ...MOCK_DATA.auth_accounts[0], verified: true });
}

function requireMock(feature: string) {
  if (!USE_MOCK_API) throw new Error(`${feature} is not available yet.`);
}

export function changePassword(
  token: string,
  current_password: string,
  password: string,
) {
  return request<{ ok: true }>('/auth/change-password', {
    method: 'POST',
    token,
    body: { currentPassword: current_password, password },
  });
}

export function updateProfile(
  token: string,
  input: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: Gender | null;
  },
) {
  return request<AuthResponse>('/auth/profile', {
    method: 'PATCH',
    token,
    body: input,
  });
}

export function logout(token: string) {
  return request<{ ok: true }>('/auth/logout', { method: 'POST', token });
}

export type { Profile };
