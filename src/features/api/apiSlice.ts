import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Api } from 'models';
import { string } from 'yup';

export interface ApiState {
  loading: boolean;
  list: Api[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: ApiState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 20,
  },
  pagination: {
    _page: 1,
    _limit: 20,
    _totalRows: 20,
  },
};

  const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
      fetchApiList(state, action: PayloadAction<ListParams>) {
        state.loading = true;
      },
      fetchApiListSuccess(state, action: PayloadAction<ListResponse<Api>>) {
        state.list = action.payload.data.data;
        state.pagination = action.payload.data.pagination;
        state.loading = false;
      },
      fetchApiListFailed(state) {
        state.loading = false;
      },
      setFilter(state, action: PayloadAction<ListParams>) {
        state.filter = action.payload;
      },
      setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    },
  });

// Actions
export const apiActions = apiSlice.actions;

// Selectors
export const selectApiLoading = (state: RootState) => state.api.loading;
export const selectApiList = (state: RootState) => state.api.list;
export const selectApiFilter = (state: RootState) => state.api.filter;
export const selectApiPagination = (state: RootState) => state.api.pagination;
// Reducer
const apiReducer = apiSlice.reducer;
export default apiReducer;
