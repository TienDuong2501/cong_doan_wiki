import authSaga from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import apiSaga from 'features/api/apiSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga(){
    yield all([
        counterSaga(),
        authSaga(),
        apiSaga(),
    ]);
}
