import { Image, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { COLORS, SIZES } from '../constants/theme';
import { CalendarScreen, HomeScreen, ListScreen, PaymentsScreen, ProfileScreen } from '../screens';
import type { TabParamList } from '../types';
import { useIsTablet } from '../utils/tablet';

const TabsStack = createNativeBottomTabNavigator<TabParamList>();
const RailStack = createBottomTabNavigator<TabParamList>();

const ICONS = {
  Home: require('../assets/images/tabs/tab_home.png'),
  List: require('../assets/images/tabs/tab_list.png'),
  Calendar: require('../assets/images/tabs/tab_calendar.png'),
  Payments: require('../assets/images/tabs/tab_payments.png'),
  Profile: require('../assets/images/tabs/tab_profile.png'),
};

const tab_icon = (source: number) => ({ type: 'image', source }) as const;

const styles = StyleSheet.create({ rail_icon: { height: SIZES.padding * 1.2, width: SIZES.padding * 1.2 } });
const railIcon = (source: number) =>
  function RailIcon({ color }: { color: string }) {
    return <Image source={source} tintColor={color} style={styles.rail_icon} />;
  };
const RAIL_ICONS = {
  Home: railIcon(ICONS.Home),
  List: railIcon(ICONS.List),
  Calendar: railIcon(ICONS.Calendar),
  Payments: railIcon(ICONS.Payments),
  Profile: railIcon(ICONS.Profile),
};

// Android draws the tab labels itself at Material's 12 sp, which grows with the system text size; past this scale
// five labels no longer fit and truncate (Cale…), so the size stops growing there, like CustomText's cap.
const MATERIAL_LABEL_SP = 12;
const MAX_TAB_LABEL_SCALE = 1.3;

// Native tab bar (system Liquid Glass where supported): Home / List / Calendar / Payments / Profile, no center Add.
// iPadOS draws the same native tab bar as a floating pill at the top.
export default function Tabs() {
  const { fontScale } = useWindowDimensions();
  // Android tablets follow Material 3: a navigation rail on the left instead of the bottom bar. It follows the window,
  // so a foldable swaps rail and bar when opened or closed (the other navigator mounts; the open tab resets to Home).
  const is_tablet = useIsTablet();
  const android_rail = Platform.OS === 'android' && is_tablet;
  const label_style = Platform.OS === 'android' && fontScale > MAX_TAB_LABEL_SCALE ? { fontSize: (MATERIAL_LABEL_SP * MAX_TAB_LABEL_SCALE) / fontScale } : undefined;
  if (android_rail) {
    return (
      <RailStack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarPosition: 'left',
          tabBarVariant: 'material',
          // The compact rail: icon over label, as Material 3 draws a navigation rail.
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.text_secondary,
          tabBarStyle: { backgroundColor: COLORS.background, borderRightColor: COLORS.line_quiet },
        }}>
        <RailStack.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: RAIL_ICONS.Home }} />
        <RailStack.Screen name="List" component={ListScreen} options={{ tabBarIcon: RAIL_ICONS.List }} />
        <RailStack.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: RAIL_ICONS.Calendar }} />
        <RailStack.Screen name="Payments" component={PaymentsScreen} options={{ tabBarIcon: RAIL_ICONS.Payments }} />
        <RailStack.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: RAIL_ICONS.Profile }} />
      </RailStack.Navigator>
    );
  }
  return (
    <TabsStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.text_secondary,
        // Android: every tab keeps its label, as in the prototype (Material hides inactive labels by default).
        tabBarLabelVisibilityMode: 'labeled',
        tabBarLabelStyle: label_style,
      }}>
      <TabsStack.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: tab_icon(ICONS.Home) }} />
      <TabsStack.Screen name="List" component={ListScreen} options={{ tabBarIcon: tab_icon(ICONS.List) }} />
      <TabsStack.Screen name="Calendar" component={CalendarScreen} options={{ tabBarIcon: tab_icon(ICONS.Calendar) }} />
      <TabsStack.Screen name="Payments" component={PaymentsScreen} options={{ tabBarIcon: tab_icon(ICONS.Payments) }} />
      <TabsStack.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: tab_icon(ICONS.Profile) }} />
    </TabsStack.Navigator>
  );
}
