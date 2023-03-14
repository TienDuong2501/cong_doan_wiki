import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';
import { fetchCount } from './counterAPI';

// export function* log(action: PayloadAction){
//     console.log('log',action)
// }

function* test(){
    yield fetchCount(2);
    yield call(fetchCount,2);
}

function* handleIncrementSaga(action: PayloadAction<number>){
    console.log('waiting 2s');

    // wait 2s
    yield delay(2000);

    console.log('waiting done, dispatch action');

    // dispatch action 

    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga(){
    console.log('counter saga');
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
    // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
}