import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface GatewayState {
    loading: boolean;
}
const initialState: GatewayState = {
    loading: false,
  };

const gatewaySlice = createSlice({
  name: 'gateway',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const gatewayActions = gatewaySlice.actions;

// Selectors
export const selectApiLoading = (state: RootState) => state.dashboard.loading;
// Reducer
const gatewayReducer = gatewaySlice.reducer;
export default gatewayReducer;
