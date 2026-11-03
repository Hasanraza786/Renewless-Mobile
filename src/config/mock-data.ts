// Development fixtures. Reached only through the mock service adapters, never imported by screens.
export const MOCK_DATA = {
  // Google sign-in and the Gmail grant from one connection.
  google_account: {
    email: 'alex@example.com',
    session: {
      token: 'mock-session-token',
      user: { id: 'mock-user-1', name: 'Alex Morgan', email: 'alex@example.com', phone: '', dateOfBirth: null, gender: null },
    },
  },
  // Email accounts for Login; Sign up adds unverified accounts until the OTP is verified.
  auth_accounts: [{ id: 'mock-user-1', name: 'Alex Morgan', email: 'alex@example.com', password: 'sample123' }],
  // Every sent code is this value; a new code can be requested after the cooldown.
  auth_code: '481926',
  auth_resend_cooldown_ms: 120000,
  // Switch to review the other states: 'cancelled' sign-in, or 'denied' Gmail access after sign-in.
  connect_scenario: 'granted' as 'granted' | 'cancelled' | 'denied',
  // 'interrupted' fails the first scan with a network error (Try again succeeds); 'access_expired' needs Reconnect.
  scan_scenario: 'found' as 'found' | 'no_results' | 'interrupted' | 'access_expired',
  scan_stage_ms: 1100,
  // Dates are day offsets from the device's local today, so the 7-day summary stays meaningful.
  scan_candidates: [
    { id: 'cand-netflix', platform_id: 'netflix', name: 'Netflix', price: '15.99', currency: 'USD', cycle: 'Monthly', next_in_days: 0, estimated: true },
    { id: 'cand-spotify', platform_id: 'spotify', name: 'Spotify', price: '11.99', currency: 'USD', cycle: 'Monthly', next_in_days: 4, estimated: false, trial: { auto_renew: true } },
    { id: 'cand-icloud', platform_id: 'icloud', name: 'iCloud+', price: '2.99', currency: 'USD', cycle: 'Monthly', next_in_days: 3, estimated: true },
  ],
} as const;
