import { useEffect, useRef, useState } from 'react';
import { DarkTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/store';
import { AiChatScreen, AddSubscriptionScreen, AlertsScreen, ConnectedInboxScreen, GmailScanScreen, HistoryScreen, InboxSubscriptionsScreen, ReminderSettingsScreen, SettingsScreen, CalendarDayScreen, ChangePasswordScreen, PaymentsScreen, PlatformSubscriptionsScreen, PriceHistoryScreen, ReceiptsScreen, SpendingBreakdownScreen, ThisMonthScreen, UpcomingScreen, EditProfileScreen, SubscriptionDetailScreen } from '../screens';
import type { AppStackParamList } from '../types';
import AuthStack from './AuthStack';
import { stack_options } from '../config';
import Tabs from './Tabs';
import { COLORS } from '../constants/theme';
import { navigationRef } from './service';
import UndoToast from '../components/UndoToast';
import LoaderModal from '../components/LoaderModal';
import { listenForWidgetUrls } from '../utils/widget';
import { trackScreen } from '../utils/analytics';

const AppStack = createNativeStackNavigator<AppStackParamList>();

// Dark-only app: native tabs and system chrome take the dark scheme (dark Liquid Glass tab bar).
const theme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, primary: COLORS.primary, background: COLORS.background, card: COLORS.card, text: COLORS.text_primary, border: COLORS.hairline },
};

export default function MainNavigator() {
  const token = useAppSelector(state => state.constant.token);
  const token_ref = useRef(token);
  token_ref.current = token;
  const [ready, setReady] = useState(false);
  const screen_ref = useRef<string | undefined>(undefined);

  // One screen view per route change (the leaf route, so tabs count separately).
  const onRouteChange = () => {
    const name = navigationRef.getCurrentRoute()?.name;
    if (name && name !== screen_ref.current) trackScreen(name);
    screen_ref.current = name;
  };
  const onNavigationReady = () => {
    setReady(true);
    onRouteChange();
  };

  // Widget taps open their subscription once navigation is mounted.
  useEffect(() => (ready ? listenForWidgetUrls(() => !!token_ref.current) : undefined), [ready]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme} onReady={onNavigationReady} onStateChange={onRouteChange}>
      <AppStack.Navigator initialRouteName={token ? "Tabs" : "AuthStack"} screenOptions={stack_options}>
        <AppStack.Screen name="AuthStack" component={AuthStack} />
        <AppStack.Screen name="Tabs" component={Tabs} />
        <AppStack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
        <AppStack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} />
        <AppStack.Screen name="EditSubscription" component={AddSubscriptionScreen} />
        <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
        <AppStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <AppStack.Screen name="Upcoming" component={UpcomingScreen} />
        <AppStack.Screen name="ThisMonth" component={ThisMonthScreen} />
        <AppStack.Screen name="SpendingBreakdown" component={SpendingBreakdownScreen} />
        <AppStack.Screen name="PlatformSubscriptions" component={PlatformSubscriptionsScreen} />
        <AppStack.Screen name="PriceHistory" component={PriceHistoryScreen} />
        <AppStack.Screen name="Receipts" component={ReceiptsScreen} />
        <AppStack.Screen name="Alerts" component={AlertsScreen} />
        <AppStack.Screen name="History" component={HistoryScreen} />
        <AppStack.Screen name="ConnectedInbox" component={ConnectedInboxScreen} />
        <AppStack.Screen name="InboxSubscriptions" component={InboxSubscriptionsScreen} />
        <AppStack.Screen name="GmailScan" component={GmailScanScreen} />
        <AppStack.Screen name="AiChat" component={AiChatScreen} />
        <AppStack.Screen name="ReminderSettings" component={ReminderSettingsScreen} />
        <AppStack.Screen name="Settings" component={SettingsScreen} />
        <AppStack.Screen name="CalendarDay" component={CalendarDayScreen} />
        <AppStack.Screen name="SubscriptionPayments" component={PaymentsScreen} />
      </AppStack.Navigator>
      <UndoToast />
      <LoaderModal />
    </NavigationContainer>
  );
}
