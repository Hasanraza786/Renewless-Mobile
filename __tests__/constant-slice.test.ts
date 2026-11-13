import reducer, { clearSession, restoreToken, setAiConsent, setSession, setSplashSeen } from '../src/redux/slices/constant-slice';

test('splash_seen survives logout so the brand Splash only shows on first launch', () => {
  let state = reducer(undefined, { type: 'init' });
  expect(state.splash_seen).toBe(false);
  state = reducer(state, setSplashSeen());
  state = reducer(state, setSession({ token: 't', user: { id: 'u' } as any }));
  state = reducer(state, setAiConsent(true));
  state = reducer(state, clearSession());
  // AI consent belongs to the signed-in account, so the next account is asked again.
  // Signing in ended onboarding for this install, and that survives logout and deletion, so they open Login.
  expect(state).toEqual({ token: null, user: null, splash_seen: true, onboarding_done: true, widget_prompt_seen: false, ai_consent: false, ai_withdrawal_unsent: false });
});

test('onboarding ends on this install at sign-in or a restored session', () => {
  const fresh = reducer(undefined, { type: 'init' });
  expect(reducer(fresh, restoreToken(null)).onboarding_done).toBe(false);
  expect(reducer(fresh, restoreToken('t')).onboarding_done).toBe(true);
});
