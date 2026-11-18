import { useEffect, useState } from 'react';
import { AppState, Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getAppConfig } from '../../redux/actions/app-action';
import { setUpdateDismissed } from '../../redux/slices/constant-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppConfig } from '../../types';
import { appUpdateFor } from '../../utils/app-update';

// App Store Connect → App Information → Apple ID.
const APP_STORE_URL = 'https://apps.apple.com/app/id6827023344';

// Checked at launch and every return to the foreground, so a required update keeps asking until it is installed.
export default function useAppUpdate() {
  const dispatch = useAppDispatch();
  const dismissed_version = useAppSelector(state => state.constant.update_dismissed_version);
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    const check = () => dispatch(getAppConfig(setConfig));
    check();
    const app_state = AppState.addEventListener('change', state => state === 'active' && check());
    return () => app_state.remove();
  }, [dispatch]);

  const installed_version = DeviceInfo.getVersion();
  const update = appUpdateFor(config, installed_version, dismissed_version);

  const dismiss = () => {
    if (update && !update.required) dispatch(setUpdateDismissed(update.latest_version));
  };
  // The admin's store link; without one, this app's own store page.
  const openStore = () => {
    const url = update?.store_url || (Platform.OS === 'android' ? `https://play.google.com/store/apps/details?id=${DeviceInfo.getBundleId()}` : APP_STORE_URL);
    Linking.openURL(url).catch(() => undefined);
  };

  return { update, installed_version, dismiss, openStore };
}
