import { passwordErrors } from '../src/screens/ChangePassword/index.function';
import { initials } from '../src/screens/Profile/index.function';

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));

const values = (current_password: string, new_password: string, confirm_password: string) => ({ current_password, new_password, confirm_password });

test('change password validation follows the approved messages', () => {
  expect(passwordErrors(values('', '', ''))).toEqual({
    current_password: 'Enter your current password.',
    new_password: 'Enter a new password.',
    confirm_password: 'Confirm your new password.',
  });
  expect(passwordErrors(values('sample123', 'short', 'short')).new_password).toBe('Use at least 8 characters.');
  expect(passwordErrors(values('sample123', 'sample123', 'sample123')).new_password).toBe('Choose a password different from your current one.');
  expect(passwordErrors(values('sample123', 'newpass12', 'newpass13')).confirm_password).toBe('Passwords don’t match.');
  expect(passwordErrors(values('sample123', 'newpass12', 'newpass12'))).toEqual({});
});

test('initials use the first two words', () => {
  expect(initials('Alex Morgan')).toBe('AM');
  expect(initials('  cher ')).toBe('C');
  expect(initials('')).toBe('R');
});
