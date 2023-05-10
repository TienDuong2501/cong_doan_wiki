
import { apiActions } from './apiSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import apiManagement from 'api/apiManagement';
import { ListParams, ListResponse, Api } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';

function* fetchApiList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Api> = yield call(apiManagement.getAll, action.payload);
    yield put(apiActions.fetchApiListSuccess(response));
  } catch (error) {
    yield put(apiActions.fetchApiListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(apiActions.setFilter(action.payload));
}

export default function* apiSaga() {
  yield takeLatest(apiActions.fetchApiList.type, fetchApiList);

  yield debounce(500, apiActions.setFilterWithDebounce.type, handleSearchDebounce);
}
