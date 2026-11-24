import { orderByCount } from '../src/utils/currency-switch';

describe('orderByCount', () => {
  it('puts the currency with most rows first and keeps first-found order on ties', () => {
    expect(orderByCount(['USD', 'PKR', 'EUR', 'PKR', 'GBP', 'USD', 'PKR'])).toEqual(['PKR', 'USD', 'EUR', 'GBP']);
  });

  it('returns one code for one currency', () => {
    expect(orderByCount(['USD', 'USD'])).toEqual(['USD']);
  });
});
