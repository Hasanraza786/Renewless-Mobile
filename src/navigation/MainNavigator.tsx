import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/store';
import { AddConnectorScreen, AddSubscriptionScreen, ChangePasswordScreen, ConnectorsScreen, EditProfileScreen, EditSubscriptionScreen, ReviewScreen, SubscriptionDetailScreen } from '../screens';
import type { AppStackParamList } from '../types';
import AuthStack from './AuthStack';
import { stack_options } from '../config';
import Tabs from './Tabs';

const AppStack = createNativeStackNavigator<AppStackParamList>();


export default function MainNavigator() {
  const token = useAppSelector(state => state.constant.token);

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={token ? "Tabs" : "AuthStack"} screenOptions={stack_options}>
        <AppStack.Screen name="AuthStack" component={AuthStack} />
        <AppStack.Screen name="Tabs" component={Tabs} />
        <AppStack.Screen name="Connectors" component={ConnectorsScreen} />
        <AppStack.Screen name="AddSubscription" component={AddSubscriptionScreen} />
        <AppStack.Screen name="SubscriptionDetail" component={SubscriptionDetailScreen} />
        <AppStack.Screen name="EditSubscription" component={EditSubscriptionScreen} />
        <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
        <AppStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <AppStack.Screen name="AddConnector" component={AddConnectorScreen} />
        <AppStack.Screen name="Review" component={ReviewScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
