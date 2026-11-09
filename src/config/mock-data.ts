// Fixtures for the two features not yet on the backend: Onboarding's Gmail scan and AI chat.
// Reached only through their mock services, never imported by screens.
export const MOCK_DATA = {
  scan_scenario: 'found' as 'found' | 'no_results' | 'interrupted' | 'access_expired',
  scan_stage_ms: 1100,
  // Dates are day offsets from the device's local today, so the 7-day summary stays meaningful.
  scan_candidates: [
    { id: 'cand-netflix', platform_id: 'netflix', name: 'Netflix', price: '15.99', currency: 'USD', cycle: 'Monthly', next_in_days: 0, estimated: true },
    { id: 'cand-spotify', platform_id: 'spotify', name: 'Spotify', price: '11.99', currency: 'USD', cycle: 'Monthly', next_in_days: 4, estimated: false, trial: { auto_renew: true } },
    { id: 'cand-icloud', platform_id: 'icloud', name: 'iCloud+', price: '2.99', currency: 'USD', cycle: 'Monthly', next_in_days: 3, estimated: true },
  ],
  ai_voice_transcript: 'I pay USD 9.99 monthly for Duolingo. My next renewal is 20 November 2026.',
  ai_receipt: { name: 'YouTube Premium', price: '13.99', currency: 'USD', cycle: 'Monthly', renews_in_days: 21 },
  ai_reply_ms: 1200,
  // Free AI messages already used this month (limit 50): 12 → 38 left, 47 → low, 50 → limit reached.
  ai_usage_used: 12,
} as const;
