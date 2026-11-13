import { CURRENCIES, CURRENCY_NAMES, amountKeyboard, amountPlaceholder, formatAmount, money, spokenMoney } from '../src/utils/money';
import { amountError, isValidAmount } from '../src/utils/subscription-form';

test('UI shows symbols, unknown currencies keep their code', () => {
  expect(money('USD', '17.99')).toBe('$17.99');
  expect(money('PKR', '1500')).toBe('Rs 1500');
  expect(money('SAR', '49.00')).toBe('\uE900 49.00');
  expect(money('AED', '49.00')).toBe('\uE901 49.00');
  expect(money('CHF', '9.00')).toBe('CHF 9.00');
});

test('screen readers and widgets hear the code instead of the riyal and dirham signs', () => {
  expect(spokenMoney(`${money('SAR', '49.00')} · ${money('AED', '12.00')}`)).toBe('SAR 49.00 · AED 12.00');
});

test('the currency picker lists the common seven first', () => {
  expect(CURRENCIES.slice(0, 7)).toEqual(['USD', 'EUR', 'GBP', 'PKR', 'AED', 'INR', 'SAR']);
  expect(CURRENCIES).toHaveLength(33);
  expect(CURRENCIES.every(code => CURRENCY_NAMES[code])).toBe(true);
  expect(CURRENCIES).not.toContain('JPY');
});

test('amounts use the decimals of their currency, like the backend: USD 2, PKR and JPY 0, KWD 3', () => {
  expect(money('USD', 11.5)).toBe('$11.50');
  expect(money('PKR', '1500.00')).toBe('Rs 1500');
  expect(money('JPY', 980)).toBe('JPY 980');
  expect(formatAmount('KWD', '4.5')).toBe('4.500');
  // Text that isn't a number is shown as given.
  expect(money('USD', '')).toBe('$');
});

test('the amount rule follows the currency and never rounds', () => {
  expect(isValidAmount('15.99', 'USD')).toBe(true);
  expect(isValidAmount('15.999', 'USD')).toBe(false);
  expect(isValidAmount('1500', 'PKR')).toBe(true);
  expect(isValidAmount('1500.00', 'PKR')).toBe(true);
  expect(isValidAmount('1500.50', 'PKR')).toBe(false);
  expect(amountError('PKR')).toBe('PKR amounts have no decimals. Enter a whole amount.');
  expect(isValidAmount('4.125', 'KWD')).toBe(true);
  expect(isValidAmount('0', 'USD')).toBe(false);
});

test('whole-number currencies get a keyboard without a decimal point', () => {
  expect(amountKeyboard('PKR')).toBe('number-pad');
  expect(amountKeyboard('IDR')).toBe('number-pad');
  expect(amountKeyboard('USD')).toBe('decimal-pad');
  expect(amountPlaceholder('PKR')).toBe('0');
  expect(amountPlaceholder('USD')).toBe('0.00');
});
