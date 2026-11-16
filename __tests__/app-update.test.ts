import { toAppConfig } from '../src/api_services/adapters';
import { appUpdateFor } from '../src/utils/app-update';

const config = toAppConfig({ platform: 'android', latestVersion: '1.10', latestBuild: 10, minBuild: 7, releaseNotes: ['Faster scans', '  ', ' Fixes '], storeUrl: 'market://x' });

test('below the minimum build the prompt is required, even after Not now', () => {
  expect(appUpdateFor(config, 6, 10)).toMatchObject({ required: true, latest_version: '1.10', notes: ['Faster scans', 'Fixes'] });
});

test('between minimum and latest it is optional until Not now for that latest build', () => {
  expect(appUpdateFor(config, 9, 0)?.required).toBe(false);
  expect(appUpdateFor(config, 9, 10)).toBeNull();
  expect(appUpdateFor(config, 9, 8)?.required).toBe(false);
});

test('builds compare as integers: 9 is older than 10 although "9" > "10" as text', () => {
  expect(appUpdateFor(config, 9, 0)).not.toBeNull();
  expect(appUpdateFor(config, 10, 0)).toBeNull();
  expect(appUpdateFor(config, 11, 0)).toBeNull();
});

test('no config or an unreadable installed build shows nothing', () => {
  expect(appUpdateFor(null, 1, 0)).toBeNull();
  expect(appUpdateFor(config, Number('unknown'), 0)).toBeNull();
  expect(appUpdateFor(config, 0, 0)).toBeNull();
});
