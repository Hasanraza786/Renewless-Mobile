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
  // The account's tracked subscriptions. Dates are day offsets from today (null = not set).
  home_subscriptions: [
    { id: 'sub-duolingo', platform_id: 'duolingo', name: 'Duolingo', plan: null, category: 'Education', price: '9.99', currency: 'USD', cycle: 'Monthly', next_in_days: 2, estimated: false, auto_renew: true, start_in_days: -300, source: 'manual', reminder_days: 1 },
    { id: 'sub-netflix-standard', platform_id: 'netflix', name: 'Netflix', plan: 'Standard', category: 'Entertainment', price: '15.99', currency: 'USD', cycle: 'Monthly', next_in_days: 9, estimated: true, auto_renew: null, start_in_days: null, source: 'manual', reminder_days: null,
      price_history: [
        { id: 'ph-1', from_amount: '13.99', to_amount: '15.99', effective_in_days: -40, source: 'user' },
        { id: 'ph-2', from_amount: '11.99', to_amount: '13.99', effective_in_days: -132, source: 'gmail' },
      ] },
    { id: 'sub-netflix-family', platform_id: 'netflix', name: 'Netflix', plan: 'Family', category: 'Entertainment', price: '22.99', currency: 'USD', cycle: 'Monthly', next_in_days: 12, estimated: false, auto_renew: true, start_in_days: -210, source: 'gmail', reminder_days: 3 },
    { id: 'sub-figma', platform_id: 'figma', name: 'Figma', plan: null, category: 'Productivity', price: '15.00', currency: 'USD', cycle: 'Monthly', next_in_days: null, estimated: false, auto_renew: null, start_in_days: null, source: 'manual', reminder_days: null },
    { id: 'sub-notion', platform_id: 'notion', name: 'Notion', plan: null, category: 'Productivity', price: '10.00', currency: 'USD', cycle: 'Monthly', next_in_days: 20, estimated: false, auto_renew: true, start_in_days: -400, source: 'gmail', reminder_days: 3 },
    { id: 'sub-icloud', platform_id: 'icloud', name: 'iCloud+', plan: null, category: 'Storage', price: '2.99', currency: 'USD', cycle: 'Monthly', next_in_days: 5, estimated: true, auto_renew: true, start_in_days: -700, source: 'gmail', reminder_days: null },
    { id: 'sub-spotify', platform_id: 'spotify', name: 'Spotify', plan: null, category: 'Entertainment', price: '11.99', currency: 'USD', cycle: 'Monthly', next_in_days: 4, estimated: false, auto_renew: true, start_in_days: -10, source: 'gmail', reminder_days: 3, trial: { start_in_days: -10, auto_renew: true } },
    // Not active: an ended trial and a cancelled plan, for the Detail variants and Platform subscriptions.
    { id: 'sub-spotify-duo', platform_id: 'spotify', name: 'Spotify', plan: 'Duo', category: 'Entertainment', price: '16.99', currency: 'USD', cycle: 'Monthly', next_in_days: -19, estimated: false, auto_renew: false, start_in_days: -33, source: 'gmail', reminder_days: null, trial: { start_in_days: -33, auto_renew: false } },
    { id: 'sub-netflix-basic', platform_id: 'netflix', name: 'Netflix', plan: 'Basic', category: 'Entertainment', price: '7.99', currency: 'USD', cycle: 'Monthly', next_in_days: null, estimated: false, auto_renew: false, start_in_days: -500, source: 'manual', reminder_days: null, cancelled_in_days: -60 },
  ],
  // Reminder settings default (days before the event); records without their own override follow it.
  account_reminder_days: [3],
  // The inbox receipts are read from, and verified provider management links by platform.
  home_inbox: { email: 'alex@example.com', last_sync_hours_ago: 4 },
  manage_urls: { netflix: 'https://www.netflix.com/youraccount', spotify: 'https://www.spotify.com/account/subscription/' } as Record<string, string>,
  // Successful Gmail receipts as days before today; this_month ones are kept inside the current month.
  home_receipts: [
    { id: 'rcpt-netflix', subscription_id: 'sub-netflix-standard', amount: '15.99', currency: 'USD', paid_days_ago: 18, this_month: true },
    { id: 'rcpt-figma', subscription_id: 'sub-figma', amount: '15.00', currency: 'USD', paid_days_ago: 12, this_month: true },
    { id: 'rcpt-netflix-prev', subscription_id: 'sub-netflix-standard', amount: '15.99', currency: 'USD', paid_days_ago: 48, this_month: false },
    { id: 'rcpt-family', subscription_id: 'sub-netflix-family', amount: '22.99', currency: 'USD', paid_days_ago: 18, this_month: false },
    { id: 'rcpt-spotify-duo', subscription_id: 'sub-spotify-duo', amount: '16.99', currency: 'USD', paid_days_ago: 80, this_month: false },
  ],
  // Nearest-date overrides for the event scenarios.
  home_event_offsets: {
    two_events: { 'sub-netflix-standard': 2, 'sub-spotify': 2, 'sub-duolingo': 6 },
    multiple_events: { 'sub-netflix-family': 2, 'sub-netflix-standard': 2, 'sub-spotify': 2, 'sub-duolingo': 6 },
  } as Record<string, Record<string, number>>,
} as const;
