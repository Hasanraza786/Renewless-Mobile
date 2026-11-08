import React from 'react';
import { Alert } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginScreen from '../src/screens/Login';
import SignupScreen from '../src/screens/Signup';
import OtpScreen from '../src/screens/Otp';
import ForgotPasswordScreen from '../src/screens/ForgotPassword';
import ResetPasswordScreen from '../src/screens/ResetPassword';
import constantReducer from '../src/redux/slices/constant-slice';
import authReducer from '../src/redux/slices/auth-slice';
import profileReducer from '../src/redux/slices/profile-slice';
import { resetMockAuth } from '../src/api_services/auth';
import { navigate, popTo, resetRoot } from '../src/navigation/service';

jest.mock('../src/navigation/service', () => ({ navigate: jest.fn(), popTo: jest.fn(), goBack: jest.fn(), resetRoot: jest.fn() }));

jest.mock('../src/config/api', () => ({ API_BASE_URL: '', USE_MOCK_API: true }));
jest.mock('react-native-safe-area-context', () => ({ SafeAreaView: require('react-native').View, useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }) }));
jest.mock('react-native-svg', () => {
  const NativeView = require('react-native').View;
  return { __esModule: true, default: NativeView, SvgXml: NativeView, Path: NativeView };
});
jest.mock('../src/redux/store', () => {
  const redux = require('react-redux');
  return { useAppDispatch: () => redux.useDispatch(), useAppSelector: redux.useSelector };
});

const makeStore = () => configureStore({ reducer: { constant: constantReducer, auth: authReducer, profile: profileReducer } });
type Tree = ReactTestRenderer.ReactTestRenderer;
const texts = (tree: Tree) => tree.root.findAll(node => typeof node.props.text === 'string').map(node => node.props.text);
const press = (tree: Tree, label: string) =>
  tree.root.find(node => typeof node.props.onPress === 'function' && (node.props.accessibilityLabel === label || node.findAll(child => child.props.text === label).length > 0)).props.onPress();
const type = (tree: Tree, label: string, value: string) =>
  tree.root.find(node => node.props.accessibilityLabel === label && typeof node.props.onChangeText === 'function').props.onChangeText(value);
// Screens navigate through the navigation service; each test reads its calls.
const navigationMock = () => {
  jest.clearAllMocks();
  return { root: { reset: resetRoot as jest.Mock }, navigation: { navigate: navigate as jest.Mock, popTo: popTo as jest.Mock } };
};
const render = async (Screen: React.ComponentType<any>, store: ReturnType<typeof makeStore>, _navigation: unknown, params?: object) => {
  let tree: Tree;
  await act(async () => {
    tree = ReactTestRenderer.create(<Provider store={store}><Screen route={{ key: 'k', name: 'S', params }} /></Provider>);
  });
  return tree!;
};

beforeEach(() => resetMockAuth());

test('login validates, keeps credential errors generic, and enters Home on success', async () => {
  const store = makeStore();
  const { root, navigation } = navigationMock();
  const tree = await render(LoginScreen, store, navigation);

  await act(async () => { press(tree, 'Log in'); });
  expect(texts(tree)).toEqual(expect.arrayContaining(['Enter your email address.', 'Enter your password.']));

  await act(async () => { type(tree, 'Email', 'alex@example.com'); type(tree, 'Password', 'wrong-pass'); });
  await act(async () => { press(tree, 'Log in'); });
  expect(texts(tree)).toContain('Wrong email or password. Please try again.');
  expect(store.getState().constant.token).toBeNull();

  await act(async () => { type(tree, 'Password', 'sample123'); });
  await act(async () => { press(tree, 'Log in'); });
  expect(store.getState().constant.token).toBe('mock-email-mock-user-1');
  expect(root.reset).toHaveBeenCalledWith([{ name: 'Tabs' }]);
  await act(async () => { tree.unmount(); });
});

test('sign up verifies the email code before the session, then continues to the Add form', async () => {
  const store = makeStore();
  const { root, navigation } = navigationMock();
  const signup = await render(SignupScreen, store, navigation, { intent: 'add_manual' });
  await act(async () => {
    type(signup, 'Name', 'Sam Lee');
    type(signup, 'Email', 'sam@example.com');
    type(signup, 'Password', 'secret12');
    type(signup, 'Confirm password', 'secret21');
  });
  await act(async () => { press(signup, 'Create account'); });
  expect(texts(signup)).toContain('Passwords do not match.');
  await act(async () => { type(signup, 'Confirm password', 'secret12'); });
  await act(async () => { press(signup, 'Create account'); });
  expect(store.getState().constant.token).toBeNull();
  expect(navigation.navigate).toHaveBeenCalledWith('Otp', { purpose: 'signup', email: 'sam@example.com', intent: 'add_manual' });
  await act(async () => { signup.unmount(); });

  const otp = await render(OtpScreen, store, navigation, { purpose: 'signup', email: 'sam@example.com', intent: 'add_manual' });
  await act(async () => { type(otp, 'Verification code', '111111'); });
  await act(async () => { press(otp, 'Verify email'); });
  expect(texts(otp)).toContain('That code is incorrect or has expired.');
  await act(async () => { type(otp, 'Verification code', '481926'); });
  await act(async () => { press(otp, 'Verify email'); });
  expect(store.getState().profile.user?.name).toBe('Sam Lee');
  expect(root.reset).toHaveBeenCalledWith([{ name: 'Tabs' }, { name: 'AddSubscription' }]);

  // Resend respects the cooldown.
  const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  await act(async () => { press(otp, 'Resend code'); });
  expect(alert).toHaveBeenCalledWith('You can request a new code after 2 minutes.');
  await act(async () => { otp.unmount(); });
});

test('password reset verifies a code, sets the new password and returns to Login', async () => {
  const store = makeStore();
  const { navigation } = navigationMock();
  const forgot = await render(ForgotPasswordScreen, store, navigation);
  // An unknown email stays on Forgot password with the field error.
  await act(async () => { type(forgot, 'Email', 'nobody@example.com'); });
  await act(async () => { press(forgot, 'Send code'); });
  expect(navigation.navigate).not.toHaveBeenCalled();
  expect(store.getState().auth.error.forgot).toBe('No account found with this email.');
  await act(async () => { type(forgot, 'Email', 'alex@example.com'); });
  await act(async () => { press(forgot, 'Send code'); });
  expect(navigation.navigate).toHaveBeenCalledWith('Otp', { purpose: 'reset', email: 'alex@example.com' });
  await act(async () => { forgot.unmount(); });

  const otp = await render(OtpScreen, store, navigation, { purpose: 'reset', email: 'alex@example.com' });
  await act(async () => { type(otp, 'Verification code', '481926'); });
  await act(async () => { press(otp, 'Verify code'); });
  // Reset verification never signs in.
  expect(store.getState().constant.token).toBeNull();
  const reset_token = navigation.navigate.mock.calls.at(-1)[1].reset_token;
  await act(async () => { otp.unmount(); });

  const reset = await render(ResetPasswordScreen, store, navigation, { reset_token });
  await act(async () => { type(reset, 'New password', 'newpass1'); type(reset, 'Confirm password', 'newpass1'); });
  await act(async () => { press(reset, 'Reset password'); });
  expect(navigation.popTo).toHaveBeenCalledWith('Login');
  await act(async () => { reset.unmount(); });

  const login = await render(LoginScreen, store, navigationMock().navigation);
  await act(async () => { type(login, 'Email', 'alex@example.com'); type(login, 'Password', 'newpass1'); });
  await act(async () => { press(login, 'Log in'); });
  expect(store.getState().constant.token).toBe('mock-email-mock-user-1');
  await act(async () => { login.unmount(); });
});
