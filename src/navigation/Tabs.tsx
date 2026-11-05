import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { COLORS } from '../constants/theme';
import { CalendarScreen, HomeScreen, ListScreen, PaymentsScreen, ProfileScreen } from '../screens';
import type { TabParamList } from '../types';

const TabsStack = createNativeBottomTabNavigator<TabParamList>();

const tab_icon = (source: number) => ({ type: 'image', source }) as const;

// Native tab bar (system Liquid Glass where supported): Home / List / Calendar / Payments / Profile, no center Add.
export default function Tabs() {
  return (
    <TabsStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text_secondary,
      }}>
      <TabsStack.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tab_icon(require('../assets/images/tabs/tab_home.png')) }} />
      <TabsStack.Screen name="List" component={ListScreen} options={{ tabBarIcon: tab_icon(require('../assets/images/tabs/tab_list.png')) }} />
      <TabsStack.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: tab_icon(require('../assets/images/tabs/tab_calendar.png')) }} />
      <TabsStack.Screen name="Payments" component={PaymentsScreen} options={{ tabBarIcon: tab_icon(require('../assets/images/tabs/tab_payments.png')) }} />
      <TabsStack.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: tab_icon(require('../assets/images/tabs/tab_profile.png')) }} />
    </TabsStack.Navigator>
  );
}
