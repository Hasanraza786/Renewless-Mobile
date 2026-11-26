import { navigate } from '../src/navigation/service';
import type { HomeEvent } from '../src/types';
import { openWidgetUrl, widgetAmount } from '../src/utils/widget';

jest.mock('../src/navigation/service', () => ({ navigate: jest.fn() }));

describe('widget links', () => {
  beforeEach(() => jest.mocked(navigate).mockClear());

  it('opens the tapped subscription or Home when signed in', () => {
    openWidgetUrl('renewless://subscription/sub_42', true);
    openWidgetUrl('renewless://home', true);
    expect(navigate).toHaveBeenNthCalledWith(1, 'SubscriptionDetail', { id: 'sub_42' });
    expect(navigate).toHaveBeenNthCalledWith(2, 'Home');
  });

  it('ignores signed-out taps and unknown links', () => {
    openWidgetUrl('renewless://subscription/sub_42', false);
    openWidgetUrl('renewless://subscription/a/b', true);
    openWidgetUrl('renewless://subscription/%E0%A4%A', true);
    openWidgetUrl('https://example.com', true);
    openWidgetUrl(null, true);
    expect(navigate).not.toHaveBeenCalled();
  });
});

test('the widget gets the amount in the app money format', () => {
  const event = { amount: '1200', currency: 'USD', expected_charge: true } as HomeEvent;
  expect(widgetAmount(event)).toBe('$1,200.00');
  expect(widgetAmount({ ...event, currency: 'SAR' })).toBe('SAR 1,200.00');
  expect(widgetAmount({ ...event, expected_charge: false })).toBe('Auto-renew off');
  expect(widgetAmount({ ...event, amount: '' })).toBe('Amount not set');
});
