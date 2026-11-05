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
  // Home. 'account' is an existing account's saved subscriptions; 'two_events' / 'multiple_events' put two or
  // three on the nearest date; 'quiet' has nothing in the next 7 days; 'empty' has no subscriptions; 'error'
  // fails the first load (Try again succeeds). After onboarding saves records, Home shows those instead.
  home_scenario: 'account' as 'account' | 'two_events' | 'multiple_events' | 'quiet' | 'empty' | 'error',
  home_latency_ms: 700,
  // Next renewal (or trial end) as a day offset from today.
  home_subscriptions: [
    { id: 'sub-duolingo', platform_id: 'duolingo', name: 'Duolingo', plan: null, price: '9.99', currency: 'USD', cycle: 'Monthly', next_in_days: 2, estimated: false },
    { id: 'sub-netflix-standard', platform_id: 'netflix', name: 'Netflix', plan: 'Standard', price: '15.99', currency: 'USD', cycle: 'Monthly', next_in_days: 9, estimated: true },
    { id: 'sub-netflix-family', platform_id: 'netflix', name: 'Netflix', plan: 'Family', price: '22.99', currency: 'USD', cycle: 'Monthly', next_in_days: 12, estimated: false },
    { id: 'sub-figma', platform_id: 'figma', name: 'Figma', plan: null, price: '15.00', currency: 'USD', cycle: 'Monthly', next_in_days: 16, estimated: false },
    { id: 'sub-notion', platform_id: 'notion', name: 'Notion', plan: null, price: '10.00', currency: 'USD', cycle: 'Monthly', next_in_days: 20, estimated: false },
    { id: 'sub-icloud', platform_id: 'icloud', name: 'iCloud+', plan: null, price: '2.99', currency: 'USD', cycle: 'Monthly', next_in_days: 5, estimated: true },
    { id: 'sub-spotify', platform_id: 'spotify', name: 'Spotify', plan: null, price: '11.99', currency: 'USD', cycle: 'Monthly', next_in_days: 4, estimated: false, trial: { auto_renew: true } },
  ],
  // Successful Gmail receipts, as days before today (kept inside the current month).
  home_receipts: [
    { id: 'rcpt-netflix', subscription_id: 'sub-netflix-standard', amount: '15.99', currency: 'USD', paid_days_ago: 18 },
    { id: 'rcpt-figma', subscription_id: 'sub-figma', amount: '15.00', currency: 'USD', paid_days_ago: 12 },
  ],
  // Nearest-date overrides for the event scenarios.
  home_event_offsets: {
    two_events: { 'sub-netflix-standard': 2, 'sub-spotify': 2, 'sub-duolingo': 6 },
    multiple_events: { 'sub-netflix-family': 2, 'sub-netflix-standard': 2, 'sub-spotify': 2, 'sub-duolingo': 6 },
  } as Record<string, Record<string, number>>,
} as const;
