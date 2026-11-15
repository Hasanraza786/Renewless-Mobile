import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { toSupportMessage } from '../../api_services/adapters';
import apiServices from '../../api_services/request-handler';
import type { SupportInput } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { successHaptic } from '../../utils/haptics';
import { requestHandler, type AppThunk } from '../request-handler';
import { setNotice } from '../slices/profile-slice';
import { markSupportMessageRead, setSupportLoading, setSupportMessages, setSupportSendError, setSupportSending } from '../slices/support-slice';

// The user's own messages, newest first. A failed load keeps what is already shown.
export function getSupportMessages(): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.getSupportMessages,
        setLoading: setSupportLoading,
        onDone: ({ items }) => dispatch(setSupportMessages(items.map(toSupportMessage))),
      }),
    );
  };
}

// Sent → back to Help & support with a notice and the list reloaded; a failure keeps the text with the request error.
export function sendSupportMessage(input: SupportInput, onSent: () => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: apiServices.sendSupportMessage,
        param_data: {
          topic: input.topic,
          message: input.message,
          appVersion: `${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`,
          platform: Platform.OS,
          osVersion: DeviceInfo.getSystemVersion(),
          deviceModel: DeviceInfo.getModel(),
        },
        setLoading: setSupportSending,
        onDone: () => {
          trackEvent('support_message_sent', { topic: input.topic });
          successHaptic();
          dispatch(setNotice('Message sent. We’ll reply here in the app.'));
          dispatch(getSupportMessages());
          onSent();
        },
        onError: () => dispatch(setSupportSendError('Couldn’t send your message. Check your connection and try again.')),
      }),
    );
  };
}

export function markSupportRead(id: string): AppThunk {
  return async dispatch => {
    dispatch(markSupportMessageRead(id));
    await dispatch(requestHandler({ apiService: apiServices.markSupportRead, param_data: { id } }));
  };
}
