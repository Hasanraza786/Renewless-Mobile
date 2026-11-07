import { joinPhone, splitPhone } from '../src/utils/phone';

test('phone numbers round-trip through country and national parts', () => {
  expect(joinPhone('PK', '300 1234567')).toBe('+92 300 1234567');
  expect(splitPhone('+92 300 1234567')).toEqual({ country: 'PK', national: '300 1234567' });
  expect(splitPhone('+1 202 555 0143')).toEqual({ country: 'US', national: '202 555 0143' });
  expect(splitPhone('+971501234567')).toEqual({ country: 'AE', national: '501234567' });
  expect(splitPhone('')).toEqual({ country: 'US', national: '' });
  expect(joinPhone('GB', '  ')).toBe('');
});
