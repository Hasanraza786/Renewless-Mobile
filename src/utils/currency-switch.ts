import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSelectedCurrency } from '../redux/slices/constant-slice';
import type { HomeSnapshot } from '../types';

// Most subscriptions first (paid platforms plus trials from the Home snapshot), then any other currency by code.
// shortcut: counts come from Home's spending and trials, so a currency with only "others" rows may rank low; switch to the backend's per-currency count when it ships.
export function currencyOrder(home: HomeSnapshot | null, present: string[]) {
  const counts = new Map<string, number>();
  for (const item of home?.spending ?? []) counts.set(item.currency, (counts.get(item.currency) ?? 0) + item.all_platforms.reduce((sum, platform) => sum + platform.subscription_count, 0));
  for (const trial of home?.trials ?? []) counts.set(trial.currency, (counts.get(trial.currency) ?? 0) + 1);
  return [...new Set(present)].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0) || a.localeCompare(b));
}

// One app-wide selected currency; with fewer than two currencies there is nothing to switch.
export function useCurrencySwitch(present: string[]) {
  const dispatch = useAppDispatch();
  const home = useAppSelector(state => state.dashboard.data);
  const stored = useAppSelector(state => state.constant.selected_currency);
  const currencies = currencyOrder(home, present);
  const selected = currencies.includes(stored) ? stored : currencies[0] ?? '';
  const several = currencies.length > 1;
  const selectCurrency = (currency: string) => dispatch(setSelectedCurrency(currency));
  // Keeps every currency when there is only one, so single-currency screens are unchanged.
  const only = <T extends { currency: string }>(items: T[]) => (several ? items.filter(item => item.currency === selected) : items);
  return { currencies, selected, several, selectCurrency, only };
}

// Onboarding and Gmail review: most found rows first, then first found. Counted over every found row, not the ticked
// ones, so a tab never moves while the user ticks rows.
export function orderByCount(codes: string[]) {
  const counts = new Map<string, number>();
  for (const code of codes) counts.set(code, (counts.get(code) ?? 0) + 1);
  return [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);
}
