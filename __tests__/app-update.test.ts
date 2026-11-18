import { toAppConfig } from '../src/api_services/adapters';
import { appUpdateFor, compareVersions } from '../src/utils/app-update';

const config = toAppConfig({ platform: 'android', latestVersion: '1.10', minVersion: '1.7', releaseNotes: ['Faster scans', '  ', ' Fixes '], storeUrl: 'market://x' });

test('below the minimum version the prompt is required, even after Not now', () => {
  expect(appUpdateFor(config, '1.6', '1.10')).toMatchObject({ required: true, latest_version: '1.10', notes: ['Faster scans', 'Fixes'] });
  expect(appUpdateFor(config, '0.9.9', '')?.required).toBe(true);
});

test('between minimum and latest it is optional until Not now for that latest version', () => {
  expect(appUpdateFor(config, '1.9', '')?.required).toBe(false);
  expect(appUpdateFor(config, '1.7', '')?.required).toBe(false);
  expect(appUpdateFor(config, '1.9', '1.10')).toBeNull();
  expect(appUpdateFor(config, '1.9', '1.10.0')).toBeNull();
  expect(appUpdateFor(config, '1.9', '1.8')?.required).toBe(false);
  // A stored value that is not a version (left from an older install) never hides the prompt.
  expect(appUpdateFor(config, '1.9', 'x')?.required).toBe(false);
});

test('versions compare part by part as numbers: 1.9 is older than 1.10 and 1.10 = 1.10.0', () => {
  expect(compareVersions('1.9', '1.10')).toBe(-1);
  expect(compareVersions('1.10', '1.10.0')).toBe(0);
  expect(compareVersions('2.0', '1.99.99')).toBe(1);
  expect(appUpdateFor(config, '1.10', '')).toBeNull();
  expect(appUpdateFor(config, '1.10.0', '')).toBeNull();
  expect(appUpdateFor(config, '1.11', '')).toBeNull();
  expect(appUpdateFor(config, '2.0', '')).toBeNull();
});

test('build numbers play no part: an iOS build that restarts at 1 for a new version is still that version', () => {
  // 1.0 (2) installed, 1.1 (1) in the store: the version decides, not the build.
  const ios = toAppConfig({ platform: 'ios', latestVersion: '1.1', minVersion: '0', releaseNotes: [], storeUrl: '' });
  expect(appUpdateFor(ios, '1.0', '')?.required).toBe(false);
  expect(appUpdateFor(ios, '1.1', '')).toBeNull();
});

test('minimum 0 never requires an update', () => {
  const none = toAppConfig({ platform: 'ios', latestVersion: '1.1', minVersion: '0', releaseNotes: [], storeUrl: '' });
  expect(appUpdateFor(none, '0.1', '')?.required).toBe(false);
});

test('no config or an unreadable version shows nothing', () => {
  expect(appUpdateFor(null, '1.0', '')).toBeNull();
  expect(appUpdateFor(config, 'unknown', '')).toBeNull();
  expect(appUpdateFor(config, '', '')).toBeNull();
  expect(appUpdateFor(config, '1.0.0.1', '')).toBeNull();
  expect(appUpdateFor({ ...config, min_version: 'x' }, '1.0', '')).toBeNull();
});
