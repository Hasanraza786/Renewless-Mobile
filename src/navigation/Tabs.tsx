import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import StateView from '../components/StateView';
import { COLORS } from '../constants/theme';
import { DashboardScreen, NotificationsScreen, ProfileScreen, SubscriptionsScreen } from '../screens';
import type { TabParamList } from '../types';

const TabsStack = createNativeBottomTabNavigator<TabParamList>();

// shortcut: dev-only placeholder until the F6 Calendar section is implemented; never ship it.
function CalendarPlaceholder() {
  return <StateView status="empty" message="Calendar is implemented in section F6." />;
}

const tab_icon = (source: number) => ({ type: 'image', source }) as const;

export default function Tabs() {
  return (
    <TabsStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text_secondary,
      }}>
      <TabsStack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home', tabBarIcon: tab_icon(require('../assets/images/tabs/tab_home.png')) }} />
      <TabsStack.Screen name="Subscriptions" component={SubscriptionsScreen} options={{ title: 'List', tabBarIcon: tab_icon(require('../assets/images/tabs/tab_list.png')) }} />
      <TabsStack.Screen name="Calendar" component={CalendarPlaceholder} options={{ title: 'Calendar', tabBarIcon: tab_icon(require('../assets/images/tabs/tab_calendar.png')) }} />
      <TabsStack.Screen name="Alerts" component={NotificationsScreen} options={{ title: 'Alerts', tabBarIcon: tab_icon(require('../assets/images/tabs/tab_alerts.png')) }} />
      <TabsStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: tab_icon(require('../assets/images/tabs/tab_profile.png')) }} />
    </TabsStack.Navigator>
  );
}
