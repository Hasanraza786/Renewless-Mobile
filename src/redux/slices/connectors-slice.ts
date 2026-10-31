import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Connector, ConnectorRequest, ConnectorsState, ReviewItem } from '../../types';

const requests: ConnectorRequest[] = ['list', 'create', 'review'];

function freshConnectors(): ConnectorsState {
  return {
    connectors: [],
    reviewItems: [],
    reviewConnectorId: null,
    reviewBusyId: '',
    reviewActionError: '',
    loading: Object.fromEntries(
      requests.map(key => [key, key === 'list']),
    ) as ConnectorsState['loading'],
    error: Object.fromEntries(requests.map(key => [key, ''])) as ConnectorsState['error'],
  };
}

const initial_state: ConnectorsState = freshConnectors();

const connectorsSlice = createSlice({
  name: 'connectors',
  initialState: initial_state,
  reducers: {
    setConnectors(state, action: PayloadAction<Connector[]>) {
      state.connectors = action.payload;
    },
    setReview(
      state,
      action: PayloadAction<{ connectorId: string; items: ReviewItem[] }>,
    ) {
      state.reviewConnectorId = action.payload.connectorId;
      state.reviewItems = action.payload.items;
    },
    removeReviewItem(state, action: PayloadAction<string>) {
      state.reviewItems = state.reviewItems.filter(item => item.id !== action.payload);
    },
    setReviewBusyId(state, action: PayloadAction<string>) {
      state.reviewBusyId = action.payload;
    },
    setReviewActionError(state, action: PayloadAction<string>) {
      state.reviewActionError = action.payload;
    },
    setConnectorLoading(
      state,
      action: PayloadAction<{ key: ConnectorRequest; value: boolean }>,
    ) {
      state.loading[action.payload.key] = action.payload.value;
    },
    setConnectorError(state, action: PayloadAction<{ key: ConnectorRequest; value: string }>) {
      state.error[action.payload.key] = action.payload.value;
    },
    resetConnectors() {
      return freshConnectors();
    },
  },
});

export const {
  setConnectors,
  setReview,
  removeReviewItem,
  setReviewBusyId,
  setReviewActionError,
  setConnectorLoading,
  setConnectorError,
  resetConnectors,
} = connectorsSlice.actions;

export const connectorLoading = (key: ConnectorRequest) => (value: boolean) =>
  setConnectorLoading({ key, value });

export const connectorError = (key: ConnectorRequest) => (value: string) =>
  setConnectorError({ key, value });

export default connectorsSlice.reducer;
