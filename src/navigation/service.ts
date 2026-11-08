import { StackActions, createNavigationContainerRef } from '@react-navigation/native';
import type { AppStackParamList, AuthStackParamList, TabParamList } from '../types';

// Every route name in the app; screen names are unique across the root stack, tabs and auth stack.
export type RootParamList = AppStackParamList & TabParamList & AuthStackParamList;

// Attached to the NavigationContainer in MainNavigator. Calls before it mounts are ignored.
export const navigationRef = createNavigationContainerRef<RootParamList>();

// Params are required only for routes whose params cannot be undefined.
type NavigateArgs<Name extends keyof RootParamList> = undefined extends RootParamList[Name]
  ? [screen: Name, params?: RootParamList[Name]]
  : [screen: Name, params: RootParamList[Name]];

const TAB_NAMES: readonly string[] = ['Home', 'List', 'Calendar', 'Payments', 'Profile'] satisfies (keyof TabParamList)[];

// Handled by the focused navigator first and bubbles up, like navigation.navigate inside a screen.
// A tab is reached through the Tabs route, so stack screens (History, Gmail) can open it too;
// pop returns to the existing Tabs route instead of pushing a second copy on top of the stack.
export function navigate<Name extends keyof RootParamList>(...[name, params]: NavigateArgs<Name>) {
  if (!navigationRef.isReady()) return;
  const go = navigationRef.navigate as (screen: string, params?: object, options?: { pop: boolean }) => void;
  if (TAB_NAMES.includes(name)) go('Tabs', { screen: name, params }, { pop: true });
  else go(name, params as object | undefined);
}

// The tab under the stack screens, e.g. where AI chat was opened from the Add sheet.
export function focusedTab() {
  const tabs = navigationRef.isReady() ? navigationRef.getRootState()?.routes.find(route => route.name === 'Tabs')?.state : undefined;
  return tabs?.routes[tabs.index ?? 0]?.name as keyof TabParamList | undefined;
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) navigationRef.goBack();
}

export function replace<Name extends keyof RootParamList>(name: Name, params?: RootParamList[Name]) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.replace(name, params));
}

// Back to an earlier screen in the current stack (e.g. Login after a password reset).
export function popTo<Name extends keyof RootParamList>(name: Name, params?: RootParamList[Name]) {
  if (navigationRef.isReady()) navigationRef.dispatch(StackActions.popTo(name, params));
}

// Replaces the whole root stack, e.g. entering the app after sign-in.
export function resetRoot(routes: { name: keyof AppStackParamList; params?: object }[]) {
  if (navigationRef.isReady()) navigationRef.resetRoot({ index: routes.length - 1, routes });
}
