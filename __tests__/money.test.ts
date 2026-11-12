import { EMPTY_DRAFT, applyMessage } from '../src/utils/ai-draft';
import { CURRENCIES, CURRENCY_NAMES, money, spokenMoney } from '../src/utils/money';

test('UI shows symbols, unknown currencies keep their code', () => {
  expect(money('USD', '17.99')).toBe('$17.99');
  expect(money('PKR', '1500.00')).toBe('Rs 1500.00');
  expect(money('SAR', '49.00')).toBe('\uE900 49.00');
  expect(money('AED', '49.00')).toBe('\uE901 49.00');
  expect(money('CHF', '9.00')).toBe('CHF 9.00');
});

test('screen readers and widgets hear the code instead of the riyal and dirham signs', () => {
  expect(spokenMoney(`${money('SAR', '49.00')} · ${money('AED', '12.00')}`)).toBe('SAR 49.00 · AED 12.00');
});

test('the currency picker lists the common seven first and only two-decimal currencies', () => {
  expect(CURRENCIES.slice(0, 7)).toEqual(['USD', 'EUR', 'GBP', 'PKR', 'AED', 'INR', 'SAR']);
  expect(CURRENCIES).toHaveLength(33);
  expect(CURRENCIES.every(code => CURRENCY_NAMES[code])).toBe(true);
  expect(CURRENCIES).not.toContain('JPY');
});

test('the AI draft reads any picker currency code', () => {
  expect(applyMessage(EMPTY_DRAFT, 'I pay QAR 39 monthly for Netflix.').draft).toMatchObject({ price: '39.00', currency: 'QAR' });
});
