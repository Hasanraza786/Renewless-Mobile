// Development fixtures. Reached only through the mock service adapters, never imported by screens.
export const MOCK_DATA = {
  google_account: { email: 'alex@example.com' },
  account: {
    token: 'mock-session-token',
    user: { id: 'mock-user-1', name: 'Alex Morgan', email: 'alex@example.com', phone: '', dateOfBirth: null, gender: null },
  },
  // Switch to 'no_results' or 'interrupted' to review the recovery panels.
  scan_scenario: 'found' as 'found' | 'no_results' | 'interrupted',
  scan_stage_ms: 1100,
  // Dates are day offsets from the device's local today, so upcoming-week totals stay meaningful.
  scan_candidates: [
    { id: 'cand-netflix', platform_id: 'netflix', name: 'Netflix', price: '15.99', currency: 'USD', cycle: 'monthly', next_in_days: 1 },
    { id: 'cand-spotify', platform_id: 'spotify', name: 'Spotify', price: '11.99', currency: 'USD', cycle: 'monthly', next_in_days: 5, trial: { auto_renew: true } },
    { id: 'cand-icloud', platform_id: 'icloud', name: 'iCloud+', price: '2.99', currency: 'USD', cycle: 'monthly', next_in_days: 4 },
  ],
} as const;
