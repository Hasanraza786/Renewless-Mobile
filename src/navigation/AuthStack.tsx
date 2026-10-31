import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, ConnectInboxScreen, DiscoveringScreen, ForgotPasswordScreen, InboxPermissionScreen, LoginScreen, OtpScreen, ReadyToGoScreen, ResetPasswordScreen, SaveYourFindsScreen, ScanInterruptedScreen, ScanNoResultsScreen, SignupScreen, WelcomeScreen, YourSubscriptionsScreen } from '../screens';
import { useAppSelector } from '../redux/store';
import type { AuthStackParamList } from '../types';
import { stack_options } from '../config';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  const splash_seen = useAppSelector(state => state.constant.splash_seen);

  return (
    <Stack.Navigator initialRouteName={splash_seen ? 'Welcome' : 'Splash'} screenOptions={stack_options}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ConnectInbox" component={ConnectInboxScreen} />
      <Stack.Screen name="InboxPermission" component={InboxPermissionScreen} />
      <Stack.Screen name="Discovering" component={DiscoveringScreen} />
      <Stack.Screen name="YourSubscriptions" component={YourSubscriptionsScreen} />
      <Stack.Screen name="SaveYourFinds" component={SaveYourFindsScreen} />
      <Stack.Screen name="ReadyToGo" component={ReadyToGoScreen} />
      <Stack.Screen name="ScanNoResults" component={ScanNoResultsScreen} />
      <Stack.Screen name="ScanInterrupted" component={ScanInterruptedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
