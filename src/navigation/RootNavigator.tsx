import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/colors';
import { useAppSelector } from '../redux/store';
import AddConnectorScreen from '../screens/AddConnector';
import AddSubscriptionScreen from '../screens/AddSubscription';
import ChangePasswordScreen from '../screens/ChangePassword';
import ConnectorsScreen from '../screens/Connectors';
import DashboardScreen from '../screens/Dashboard';
import EditProfileScreen from '../screens/EditProfile';
import EditSubscriptionScreen from '../screens/EditSubscription';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import LoginScreen from '../screens/Login';
import NotificationsScreen from '../screens/Notifications';
import OtpScreen from '../screens/Otp';
import ProfileScreen from '../screens/Profile';
import ResetPasswordScreen from '../screens/ResetPassword';
import ReviewScreen from '../screens/Review';
import SignupScreen from '../screens/Signup';
import SubscriptionDetailScreen from '../screens/SubscriptionDetail';
import SubscriptionsScreen from '../screens/Subscriptions';
import type { AppStackParamList, AuthStackParamList, TabParamList } from '../types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.mint,
    card: colors.card,
    text: colors.navy,
    border: colors.border,
  },
};

const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
} as const;

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.mint,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
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
    <AuthStack.Navigator screenOptions={stackOptions}>
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
    <AppStack.Navigator screenOptions={stackOptions}>
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
