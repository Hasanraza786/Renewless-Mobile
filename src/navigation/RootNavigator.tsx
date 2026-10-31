import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS, SIZES, colors } from '../constants/theme';
import { useAppSelector } from '../redux/store';
import AddConnectorScreen from '../screens/AddConnector';
import AddSubscriptionScreen from '../screens/AddSubscription';
import ChangePasswordScreen from '../screens/ChangePassword';
import ConnectorsScreen from '../screens/Connectors';
import DashboardScreen from '../screens/Dashboard';
import EditProfileScreen from '../screens/EditProfile';
import EditSubscriptionScreen from '../screens/EditSubscription';
import ConnectInboxScreen from '../screens/ConnectInbox';
import DiscoveringScreen from '../screens/Discovering';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import InboxPermissionScreen from '../screens/InboxPermission';
import LoginScreen from '../screens/Login';
import NotificationsScreen from '../screens/Notifications';
import OtpScreen from '../screens/Otp';
import ProfileScreen from '../screens/Profile';
import ReadyToGoScreen from '../screens/ReadyToGo';
import ResetPasswordScreen from '../screens/ResetPassword';
import ReviewScreen from '../screens/Review';
import SaveYourFindsScreen from '../screens/SaveYourFinds';
import ScanInterruptedScreen from '../screens/ScanInterrupted';
import ScanNoResultsScreen from '../screens/ScanNoResults';
import SignupScreen from '../screens/Signup';
import SubscriptionDetailScreen from '../screens/SubscriptionDetail';
import SubscriptionsScreen from '../screens/Subscriptions';
import WelcomeScreen from '../screens/Welcome';
import YourSubscriptionsScreen from '../screens/YourSubscriptions';
import type { AppStackParamList, AuthStackParamList, TabParamList } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.accent,
    card: colors.card,
    text: colors.text,
    border: colors.hairline,
  },
};

const stack_options = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
} as const;

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text_secondary,
        tabBarLabelStyle: {
          fontFamily: FONTS.regular,
          fontSize: SIZES.tab_label,
          lineHeight: SIZES.tab_label_line,
        },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.hairline,
        },
      }}>
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="Subscriptions" component={SubscriptionsScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
      <Tabs.Screen name="Connectors" component={ConnectorsScreen} />
    </Tabs.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Welcome" screenOptions={stack_options}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="ConnectInbox" component={ConnectInboxScreen} />
      <AuthStack.Screen name="InboxPermission" component={InboxPermissionScreen} />
      <AuthStack.Screen name="Discovering" component={DiscoveringScreen} />
      <AuthStack.Screen name="YourSubscriptions" component={YourSubscriptionsScreen} />
      <AuthStack.Screen name="SaveYourFinds" component={SaveYourFindsScreen} />
      <AuthStack.Screen name="ReadyToGo" component={ReadyToGoScreen} />
      <AuthStack.Screen name="ScanNoResults" component={ScanNoResultsScreen} />
      <AuthStack.Screen name="ScanInterrupted" component={ScanInterruptedScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="Otp" component={OtpScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function SignedInNavigator() {
  return (
    <AppStack.Navigator screenOptions={stack_options}>
      <AppStack.Screen name="Main" component={MainTabs} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
      <AppStack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} />
      <AppStack.Screen name="EditSubscription" component={EditSubscriptionScreen} />
      <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
      <AppStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <AppStack.Screen name="AddConnector" component={AddConnectorScreen} />
      <AppStack.Screen name="Review" component={ReviewScreen} />
    </AppStack.Navigator>
  );
}

export default function RootNavigator() {
  const token = useAppSelector(state => state.session.token);

  return (
    <NavigationContainer theme={theme}>
      {token ? <SignedInNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
