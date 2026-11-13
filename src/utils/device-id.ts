import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// The device's own ID (iOS identifierForVendor, Android ANDROID_ID). Session-issuing requests send it, so a re-login
// replaces this device's session and the login rate limit recognises the owner's device.
export async function deviceInfo() {
  const [deviceId, deviceName] = await Promise.all([DeviceInfo.getUniqueId(), DeviceInfo.getDeviceName()]);
  return { deviceId, deviceName, platform: Platform.OS, appVersion: DeviceInfo.getVersion() };
}
