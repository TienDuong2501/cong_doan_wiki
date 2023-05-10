import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';
import CryptoJS from "crypto-js";
import authApi from '../../api/authApi';
import { User } from "models";

interface responseLogin {
    data: {
        accessToken: string,
        roles?: string[],
        user: User
    }
}

type AnyAction = {type: string, [key: string]: any}
function* handleSignin({ payload: { username, password, login_type } }: AnyAction) {
  let encryptPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_CRYPTO_KEY).toString()
  const dataPayload = {
    username,
    password: encryptPassword,
    login_type
  }
  try {
    const response: responseLogin = yield call(authApi.SignIn, dataPayload)
    localStorage.setItem('access_token', response.data.accessToken);
    yield put(
      authActions.loginSuccess(response.data.user)
    );
    yield put(push('/open-api/dashboard'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error?.response));
  }
}

function* handleSignup({ payload: {
  firstName,
  lastName,
  username,
  email,
  password,
  password_confirmation
} }: AnyAction) {
  let encryptPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_CRYPTO_KEY).toString()
  let encryptPassword_confirm = CryptoJS.AES.encrypt(password_confirmation, process.env.REACT_APP_SECRET_CRYPTO_KEY).toString()
  const dataPayload = {
    firstName,
    lastName,
    username,
    email,
    password: encryptPassword,
    password_confirmation: encryptPassword_confirm
  }
  try {
    yield call(authApi.SignUp, dataPayload)
    yield put(
      authActions.signupSuccess('Successfully')
    );
    yield put(push('/signin'));
  } catch (error: any) {
    yield put(authActions.signupFailed(error?.response));
  }
}

function* handleLogout() {
  try {
    localStorage.removeItem('access_token');
    yield put(authActions.logout)
    yield put(push('/signin'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error));
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleSignin);
  yield takeLatest(authActions.signup.type, handleSignup);
  yield takeLatest(authActions.logout.type, handleLogout);
}
