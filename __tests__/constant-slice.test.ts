import reducer, { clearSession, setAiConsent, setSession, setSplashSeen } from '../src/redux/slices/constant-slice';

test('splash_seen survives logout so the brand Splash only shows on first launch', () => {
  let state = reducer(undefined, { type: 'init' });
  expect(state.splash_seen).toBe(false);
  state = reducer(state, setSplashSeen());
  state = reducer(state, setSession({ token: 't', user: { id: 'u' } as any }));
  state = reducer(state, setAiConsent(true));
  state = reducer(state, clearSession());
  // AI consent belongs to the signed-in account, so the next account is asked again.
  expect(state).toEqual({ token: null, user: null, splash_seen: true, widget_prompt_seen: false, ai_consent: false });
});
