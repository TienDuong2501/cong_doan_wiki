import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface ApplicationState {
    loading: boolean;
}
const initialState: ApplicationState = {
    loading: false,
  };

const applicationSlice = createSlice({
  name: 'application',
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
export const applicationActions = applicationSlice.actions;

// Selectors
export const selectApiLoading = (state: RootState) => state.dashboard.loading;
// Reducer
const applicationReducer = applicationSlice.reducer;
export default applicationReducer;
