import type { AppConfig, AppUpdate } from '../types';

// A store version name: one to three whole numbers joined by dots (1, 1.1, 1.0.1), as the backend accepts.
const VERSION = /^\d{1,6}(\.\d{1,6}){0,2}$/;

// 1.9 < 1.10 and 1.0 = 1.0.0: each part compared as a number, missing parts as 0.
export function compareVersions(a: string, b: string) {
  const x = a.split('.').map(Number);
  const y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i += 1) {
    const diff = (x[i] ?? 0) - (y[i] ?? 0);
    if (diff) return Math.sign(diff);
  }
  return 0;
}

// Store version names only (Android versionName, iOS CFBundleShortVersionString); build numbers are never compared.
// Below the minimum the prompt is required; below the latest it is optional unless Not now was already pressed for
// that latest version. An unreadable installed or configured version shows nothing.
export function appUpdateFor(config: AppConfig | null, installed_version: string, dismissed_version: string): AppUpdate | null {
  if (!config || ![installed_version, config.latest_version, config.min_version].every(version => VERSION.test(version))) return null;
  const update = { latest_version: config.latest_version, notes: config.notes, store_url: config.store_url };
  if (compareVersions(installed_version, config.min_version) < 0) return { ...update, required: true };
  const behind = compareVersions(installed_version, config.latest_version) < 0;
  const dismissed = VERSION.test(dismissed_version) && compareVersions(dismissed_version, config.latest_version) === 0;
  if (behind && !dismissed) return { ...update, required: false };
  return null;
}
