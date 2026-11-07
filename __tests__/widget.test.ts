import { navigate } from '../src/navigation/service';
import { openWidgetUrl } from '../src/utils/widget';

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
    openWidgetUrl('https://example.com', true);
    openWidgetUrl(null, true);
    expect(navigate).not.toHaveBeenCalled();
  });
});
