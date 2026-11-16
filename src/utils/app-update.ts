import type { AppConfig, AppUpdate } from '../types';

// Integer build numbers only (Android versionCode, iOS CFBundleVersion): below the minimum the prompt is required,
// below the latest it is optional unless Not now was already pressed for that latest build. A bad or missing build shows nothing.
export function appUpdateFor(config: AppConfig | null, installed_build: number, dismissed_build: number): AppUpdate | null {
  if (!config || !Number.isInteger(installed_build) || installed_build <= 0) return null;
  const update = { latest_version: config.latest_version, latest_build: config.latest_build, notes: config.notes, store_url: config.store_url };
  if (installed_build < config.min_build) return { ...update, required: true };
  if (installed_build < config.latest_build && dismissed_build !== config.latest_build) return { ...update, required: false };
  return null;
}
