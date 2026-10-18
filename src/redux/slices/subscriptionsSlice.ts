import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Subscription, SubscriptionRequest, SubscriptionsState } from '../../types';

const requests: SubscriptionRequest[] = ['list', 'detail', 'edit', 'create', 'update', 'delete'];

function freshSubscriptions(): SubscriptionsState {
  return {
    items: [],
    current: null,
    loading: Object.fromEntries(
      requests.map(key => [key, key === 'list']),
    ) as SubscriptionsState['loading'],
    error: Object.fromEntries(requests.map(key => [key, ''])) as SubscriptionsState['error'],
  };
}

const initialState: SubscriptionsState = freshSubscriptions();

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {
    setSubscriptionItems(state, action: PayloadAction<Subscription[]>) {
      state.items = action.payload;
    },
    setCurrentSubscription(state, action: PayloadAction<Subscription | null>) {
      state.current = action.payload;
    },
    upsertSubscription(state, action: PayloadAction<Subscription>) {
      const next = action.payload;
      const index = state.items.findIndex(item => item.id === next.id);
      if (index >= 0) state.items[index] = next;
      else state.items.unshift(next);
      state.current = next;
    },
    removeSubscription(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      if (state.current?.id === action.payload) state.current = null;
    },
    setSubscriptionLoading(
      state,
      action: PayloadAction<{ key: SubscriptionRequest; value: boolean }>,
    ) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setSubscriptionError(
      state,
      action: PayloadAction<{ key: SubscriptionRequest; value: string }>,
    ) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetSubscriptions() {
      return freshSubscriptions();
    },
  },
});

export const {
  setSubscriptionItems,
  setCurrentSubscription,
  upsertSubscription,
  removeSubscription,
  setSubscriptionLoading,
  setSubscriptionError,
  resetSubscriptions,
} = subscriptionsSlice.actions;

export const subscriptionLoading = (key: SubscriptionRequest) => (value: boolean) =>
  setSubscriptionLoading({ key, value });

export const subscriptionError = (key: SubscriptionRequest) => (value: string) =>
  setSubscriptionError({ key, value });

export default subscriptionsSlice.reducer;
