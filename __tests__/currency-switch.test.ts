import { currencyOrder, orderByCount } from '../src/utils/currency-switch';

describe('orderByCount', () => {
  it('puts the currency with most rows first and keeps first-found order on ties', () => {
    expect(orderByCount(['USD', 'PKR', 'EUR', 'PKR', 'GBP', 'USD', 'PKR'])).toEqual(['PKR', 'USD', 'EUR', 'GBP']);
  });

  it('returns one code for one currency', () => {
    expect(orderByCount(['USD', 'USD'])).toEqual(['USD']);
  });
});

test('a currency holding only usage bills comes after the ones with spending, even with more records', () => {
  const home = { by_currency: [{ currency: 'EUR', subscription_count: 2, paid_count: 2 }, { currency: 'USD', subscription_count: 2, paid_count: 0 }], spending: [{ currency: 'USD', all_platforms: [] }], trials: [] } as never;
  expect(currencyOrder(home, ['EUR', 'USD', 'PKR'])).toEqual(['USD', 'EUR', 'PKR']);
});
