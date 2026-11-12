import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Onboarding, ForgotPasswordScreen, LoginScreen, OtpScreen, ResetPasswordScreen, SignupScreen } from '../screens';
import { useAppSelector } from '../redux/store';
import type { AuthStackParamList } from '../types';
import { stack_options } from '../config';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const splash_seen = useAppSelector(state => state.constant.splash_seen);
  // Onboarding shows until the first sign-in on this install; after that signed-out starts open Login.
  const onboarding_done = useAppSelector(state => state.constant.onboarding_done);

  return (
    <Stack.Navigator initialRouteName={!splash_seen ? 'Splash' : onboarding_done ? 'Login' : 'Onboarding'} screenOptions={stack_options}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
