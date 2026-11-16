import { Platform } from 'react-native';
import { toAppConfig } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import type { AppConfig } from '../../types';
import { requestHandler, type AppThunk } from '../request-handler';

// The update prompt's config for this platform. A failure shows no prompt: an update check never blocks the app.
export function getAppConfig(onConfig: (config: AppConfig | null) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getAppConfig,
        param_data: { platform: Platform.OS === 'ios' ? 'ios' : 'android' },
        endOnUnauthorized: false,
        onDone: ({ appConfig }) => onConfig(appConfig ? toAppConfig(appConfig) : null),
      }),
    );
  };
}
