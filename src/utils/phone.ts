import { COUNTRIES, PREFERRED_FOR_DIAL } from '../config/countries';

const DEFAULT_COUNTRY = 'US';

// Saved as "+<dial> <national number as typed>"; an empty number saves as empty.
export function joinPhone(country: string, national: string) {
  const number = national.trim();
  const dial = COUNTRIES.find(item => item.code === country)?.dial;
  return number && dial ? `+${dial} ${number}` : number;
}

// Splits a saved number back into its country (longest matching calling code) and national part.
export function splitPhone(value: string): { country: string; national: string } {
  const trimmed = value.trim();
  if (!trimmed.startsWith('+')) return { country: DEFAULT_COUNTRY, national: trimmed };
  const digits = trimmed.slice(1).replace(/\D/g, '');
  const match = COUNTRIES.filter(item => digits.startsWith(item.dial)).sort((a, b) => b.dial.length - a.dial.length)[0];
  if (!match) return { country: DEFAULT_COUNTRY, national: trimmed };
  const country = PREFERRED_FOR_DIAL[match.dial] ?? match.code;
  // Drop "+", the dial digits and any separator after them, keeping the user's own spacing.
  let seen = 0;
  let index = 1;
  while (index < trimmed.length && seen < match.dial.length) {
    if (/\d/.test(trimmed[index])) seen += 1;
    index += 1;
  }
  return { country, national: trimmed.slice(index).trim() };
}
